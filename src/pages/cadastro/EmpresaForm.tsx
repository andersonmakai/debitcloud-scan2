import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";

type EmpresaFormData = {
  nome: string;
  sigla?: string;
  nif: string;
  tipoContribuinte?: string;
  setor: string;
  pais: string;
  provincia: string;
  municipio: string;
  bairro?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  website?: string;
  moeda: string;
  formaJuridica: string;
  regimeFiscal: string;
  numeroCRC?: string;
  dataConstituicao: string;
  licencaAtividade?: string;
  capitalSocial?: string;
  documentos: {
    empresa: File[] | null;
    funcionarios: File[] | null;
    clientes: File[] | null;
  };
};

export default function EmpresaForm() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<EmpresaFormData>({
    nome: "",
    sigla: "",
    nif: "",
    tipoContribuinte: "",
    setor: "",
    pais: "",
    provincia: "",
    municipio: "",
    bairro: "",
    endereco: "",
    telefone: "",
    email: "",
    website: "",
    moeda: "",
    formaJuridica: "",
    regimeFiscal: "",
    numeroCRC: "",
    dataConstituicao: "",
    licencaAtividade: "",
    capitalSocial: "",
    documentos: {
      empresa: null,
      funcionarios: null,
      clientes: null
    }
  });

  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const camposObrigatorios = [
    "nome",
    "nif",
    "setor",
    "pais",
    "provincia",
    "municipio",
    "moeda",
    "formaJuridica",
    "regimeFiscal",
    "dataConstituicao"
  ];

  const validar = () => {
    for (const campo of camposObrigatorios) {
      if (!dados[campo as keyof EmpresaFormData]) {
        setErro(`O campo "${campo}" é obrigatório.`);
        return false;
      }
    }
    setErro(null);
    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any, tipo: "empresa" | "funcionarios" | "clientes") => {
    const files = e.target.files;
    setDados((prev) => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [tipo]: files ? Array.from(files) : null
      }
    }));
  };

  const handleSalvar = () => {
    if (!validar()) return;

    localStorage.setItem("dadosEmpresa", JSON.stringify(dados));
    setSucesso(true);

    setTimeout(() => {
      setSucesso(false);
      navigate("/cadastro"); // volta ao cadastro principal
    }, 2000);
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Cadastro de Empresa</h3>

      {erro && <Alert variant="danger">{erro}</Alert>}
      {sucesso && (
        <Alert variant="success" className="text-white bg-success">
          ✅ Cadastro feito com sucesso!
        </Alert>
      )}

      {/* Card 1 - Identificação */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>🏢 Identificação da Empresa</Card.Title>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome da empresa *</Form.Label>
                  <Form.Control
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Sigla</Form.Label>
                  <Form.Control name="sigla" value={dados.sigla} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>NIF *</Form.Label>
                  <Form.Control name="nif" value={dados.nif} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Contribuinte</Form.Label>
                  <Form.Control name="tipoContribuinte" value={dados.tipoContribuinte} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Setor de Atividade *</Form.Label>
                  <Form.Control name="setor" value={dados.setor} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Card 2 - Localização */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>📍 Localização e Contato</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>País *</Form.Label>
                <Form.Control name="pais" value={dados.pais} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Província *</Form.Label>
                <Form.Control name="provincia" value={dados.provincia} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Município *</Form.Label>
                <Form.Control name="municipio" value={dados.municipio} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Bairro</Form.Label>
                <Form.Control name="bairro" value={dados.bairro} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Endereço físico</Form.Label>
                <Form.Control name="endereco" value={dados.endereco} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control name="telefone" value={dados.telefone} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={dados.email} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control name="website" value={dados.website} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Card 3 - Dados legais e contábeis */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>📚 Dados Contábeis e Legais</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Moeda principal *</Form.Label>
                <Form.Control name="moeda" value={dados.moeda} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Forma jurídica *</Form.Label>
                <Form.Control name="formaJuridica" value={dados.formaJuridica} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Regime fiscal *</Form.Label>
                <Form.Control name="regimeFiscal" value={dados.regimeFiscal} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número CRC</Form.Label>
                <Form.Control name="numeroCRC" value={dados.numeroCRC} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data de Constituição *</Form.Label>
                <Form.Control type="date" name="dataConstituicao" value={dados.dataConstituicao} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Licença de atividade</Form.Label>
                <Form.Control name="licencaAtividade" value={dados.licencaAtividade} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Capital social</Form.Label>
                <Form.Control name="capitalSocial" value={dados.capitalSocial} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Card 4 - Documentos */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>📎 Upload de Documentos</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Documentos da empresa</Form.Label>
                <Form.Control type="file" multiple onChange={(e) => handleFileChange(e, "empresa")} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Documentos de funcionários</Form.Label>
                <Form.Control type="file" multiple onChange={(e) => handleFileChange(e, "funcionarios")} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Documentos dos clientes</Form.Label>
                <Form.Control type="file" multiple onChange={(e) => handleFileChange(e, "clientes")} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Botão Final */}
      <div className="text-end">
        <Button variant="success" size="lg" onClick={handleSalvar}>
          💾 Salvar
        </Button>
      </div>
    </div>
  );
}
