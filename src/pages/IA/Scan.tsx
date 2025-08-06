import React, { useRef, useState } from "react";

// 🔐 API Key da Mindee
const MINDEE_API_KEY = "md_k194wkbtmcx1ihmhmodzzdwutht4fney";

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🟢 Ativar câmera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Erro ao acessar a câmera");
    }
  };

  // 📸 Capturar imagem da câmera
  const captureAndSend = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      if (blob) {
        await sendToMindee(blob);
      }
    }, "image/jpeg");
  };

  // 📂 Upload manual de arquivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sendToMindee(file);
    }
  };

  // 🚀 Enviar para a Mindee
  const sendToMindee = async (file: Blob) => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(
        "https://api.mindee.net/v1/products/mindee/invoice/v1/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${MINDEE_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Erro ao enviar para o Mindee: ${response.status}\n${errorText}`);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      alert("Erro ao enviar para o Mindee: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Extrair dados formatados do JSON da Mindee
  const extractField = (fieldName: string) => {
    return (
      result?.document?.inference?.prediction?.[fieldName]?.value ||
      "Não encontrado"
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📸 Scanner Inteligente com Mindee</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={startCamera}>Ativar Câmera</button>
        <button onClick={captureAndSend}>📷 Capturar</button>
        <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      </div>

      {/* Visual da câmera */}
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxHeight: "300px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Estado de carregamento */}
      {loading && <p>🔄 Processando documento...</p>}

      {/* Resultado formatado */}
      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h4>📄 Informações extraídas:</h4>
          <ul>
            <li><strong>Fornecedor:</strong> {extractField("supplier_name")}</li>
            <li><strong>Número da Fatura:</strong> {extractField("invoice_number")}</li>
            <li><strong>Data:</strong> {extractField("date")}</li>
            <li><strong>Total (com impostos):</strong> {extractField("total_incl")}</li>
          </ul>

          <details style={{ marginTop: "1rem" }}>
            <summary>📦 Ver JSON completo</summary>
            <pre style={{ background: "#eee", padding: "1rem", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Scan;
