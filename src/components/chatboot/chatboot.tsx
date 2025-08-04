import { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFatura } from '../../contexts/FaturaContext';


const comandos: { [key: string]: string | (() => void) } = {
  "criar fatura": () => navigateTo("/faturacao/faturas"),
  "adicionar despesa": () => navigateTo("/cadastro/despesas"),
  "ver relatórios": () => alert("📊 Mostrando relatórios..."),
  "abrir clientes": () => navigateTo("/faturacao/clientes"),
  "olá": "Olá! Como posso te ajudar hoje?",
  "bom dia": "Bom dia! Pronto para começar?",
  "boa tarde": "Boa tarde! No que posso ajudar?",
  "boa noite": "Boa noite! Deseja fechar o dia com algum relatório?",
  "tudo bem": "Tudo ótimo! E contigo?",
  "quem és tu": "Sou seu assistente virtual aqui no DebitCloud.",
  "ajuda": "Você pode dizer: criar fatura, adicionar despesa, abrir clientes..."
};

// Navegação global
let navigateTo = (url: string) => {};

export default function Chatbot() {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [respostas, setRespostas] = useState<string[]>(() => {
    const salvo = localStorage.getItem("chatHistorico");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [gravando, setGravando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [vozAtiva, setVozAtiva] = useState(() => {
    const salvo = localStorage.getItem("vozAtiva");
    return salvo ? JSON.parse(salvo) : true;
  });

  const [idiomaVoz, setIdiomaVoz] = useState<'pt-PT' | 'pt-BR'>(() => {
    return (localStorage.getItem("idiomaVoz") as 'pt-PT' | 'pt-BR') || 'pt-PT';
  });

  const recognitionRef = useRef<any>(null);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const chatRef = useRef<HTMLDivElement>(null);
  const fatura = useFatura();

  useEffect(() => {
    navigateTo = (rota: string) => navigate(rota);
  }, [navigate]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [respostas]);

  useEffect(() => {
    localStorage.setItem("vozAtiva", JSON.stringify(vozAtiva));
  }, [vozAtiva]);

  const toggleChat = () => setAberto(prev => !prev);

  const falar = (texto: string) => {
    if (!vozAtiva) return;

    const synth = window.speechSynthesis;

    const setAndSpeak = () => {
      const utter = new SpeechSynthesisUtterance(texto);
      utter.lang = idiomaVoz;

      const vozes = synth.getVoices();
      const vozEscolhida = vozes.find(v =>
        idiomaVoz === 'pt-BR' ? v.lang === 'pt-BR' : v.lang === 'pt-PT'
      );

      if (vozEscolhida) utter.voice = vozEscolhida;
      synth.speak(utter);
    };

    if (synth.getVoices().length === 0) {
      synth.addEventListener("voiceschanged", setAndSpeak, { once: true });
    } else {
      setAndSpeak();
    }
  };

  const adicionarResposta = (msg: string) => {
    const novaLista = [...respostas, msg];
    setRespostas(novaLista);
    localStorage.setItem("chatHistorico", JSON.stringify(novaLista));
  };

  const tratarMensagem = (msg: string) => {
    const mensagemLower = msg.toLowerCase();
    const chaveEncontrada = Object.keys(comandos).find(key =>
      mensagemLower.includes(key)
    );
    if (mensagemLower.startsWith("cliente é")) {
      const nome = mensagemLower.replace("cliente é", "").trim();
      fatura.setCliente(nome);
      adicionarResposta(`✅ Cliente definido: ${nome}`);
      falar(`Cliente definido: ${nome}`);
      return;
    }
    
    if (mensagemLower.startsWith("produto é")) {
      // Exemplo: "produto é arroz 2 unidades 1000 kz com iva 14"
      const regex = /produto é (.+?) (\d+) .*? (\d+(?:[,.]\d+)?) .*? (\d{1,2})/;
      const match = mensagemLower.match(regex);
      if (match) {
        const descricao = match[1];
        const quantidade = parseInt(match[2]);
        const preco = parseFloat(match[3].replace(",", "."));
        const iva = parseInt(match[4]);
    
        fatura.adicionarLinha({ descricao, quantidade, preco, iva });
        const msg = `✅ Produto adicionado: ${descricao}, ${quantidade}un, ${preco}Kz, IVA ${iva}%`;
        adicionarResposta(msg);
        falar(msg);
      } else {
        adicionarResposta("⚠️ Não entendi o formato do produto.");
        falar("Formato inválido.");
      }
      return;
    }
    
    if (mensagemLower.includes("emitir fatura")) {
      fatura.emitirFatura();
      adicionarResposta("✅ Fatura emitida.");
      falar("Fatura emitida com sucesso.");
      return;
    }
    

    if (chaveEncontrada) {
      const acao = comandos[chaveEncontrada];
      if (typeof acao === "function") {
        acao();
        const resposta = `🤖 Executando: ${chaveEncontrada}`;
        adicionarResposta(resposta);
        falar(resposta);
      } else {
        adicionarResposta(`🤖 ${acao}`);
        falar(acao);
      }
    } else {
      const texto = "Desculpa, não entendi. Tente algo como 'criar fatura'.";
      adicionarResposta(`🤖 ${texto}`);
      falar(texto);
    }
  };

  const handleEnviar = () => {
    if (!mensagem.trim()) return;
    adicionarResposta(`🧑‍💻 ${mensagem}`);
    tratarMensagem(mensagem);
    setMensagem("");
  };

  const iniciarGravacao = () => {
    const recognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!recognitionConstructor) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const rec = new recognitionConstructor();
    recognitionRef.current = rec;

    rec.lang = idiomaVoz;
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      setMensagem(texto);
      adicionarResposta(`🎙️ ${texto}`);
      tratarMensagem(texto);
      pararGravacao();
    };

    rec.onerror = (e: any) => {
      console.error("Erro no microfone:", e);
      pararGravacao();
    };

    rec.start();
    setGravando(true);
    setTempo(0);
    intervaloRef.current = setInterval(() => setTempo(prev => prev + 1), 1000);
  };

  const pararGravacao = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setGravando(false);
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  const trocarIdioma = (idioma: 'pt-PT' | 'pt-BR') => {
    setIdiomaVoz(idioma);
    localStorage.setItem("idiomaVoz", idioma);
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        variant="primary"
        className="rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          zIndex: 1000
        }}
      >
        💬
      </Button>

      {aberto && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "340px",
            zIndex: 999
          }}
        >
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <span>Assistente IA</span>
            <div className="d-flex gap-2 align-items-center">
              <select
                className="form-select form-select-sm"
                value={idiomaVoz}
                onChange={e => trocarIdioma(e.target.value as 'pt-PT' | 'pt-BR')}
              >
                <option value="pt-PT">🇵🇹 pt-PT</option>
                <option value="pt-BR">🇧🇷 pt-BR</option>
              </select>
              <Button
                variant={vozAtiva ? "light" : "secondary"}
                size="sm"
                onClick={() => setVozAtiva(!vozAtiva)}
              >
                {vozAtiva ? "🔊" : "🔇"}
              </Button>
            </div>
          </div>

          <div
            ref={chatRef}
            className="card-body"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {respostas.map((msg, i) => (
              <div key={i} className="mb-2">{msg}</div>
            ))}
            {gravando && <div className="text-danger">🎤 Gravando... {tempo}s</div>}
          </div>

          <div className="card-footer d-flex gap-2">
            <Form.Control
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite um comando..."
              onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
            />
            <Button variant="success" onClick={handleEnviar}>Enviar</Button>
            <Button
              variant={gravando ? "danger" : "secondary"}
              onClick={gravando ? pararGravacao : iniciarGravacao}
            >
              {gravando ? "⏹️" : "🎤"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
