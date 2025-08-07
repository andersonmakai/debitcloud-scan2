import React, { useRef, useState } from "react";

// ✅ API Key (pode continuar usando a gratuita enquanto for modelo oficial)
const MINDEE_API_KEY = "md_0griu5818783nxj4cxzfreweemttekus"; // substitua se tiver outra

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Erro ao acessar a câmera.");
    }
  };

  const captureAndSend = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      if (blob) await sendToMindee(blob);
    }, "image/jpeg");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await sendToMindee(file);
  };

  // ✅ USANDO MODELO PADRÃO OFICIAL DA MINDEE (invoice v1)
  const sendToMindee = async (file: Blob) => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("https://api.mindee.net/v1/products/mindee/invoice/v1/predict", {
        method: "POST",
        headers: {
          Authorization: `Token ${MINDEE_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.text();
        alert(`Erro: ${response.status}\n${error}`);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      alert("Erro ao enviar para a Mindee: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const extractField = (field: string) => {
    return result?.document?.inference?.prediction?.[field]?.value || "Não encontrado";
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📄 Scanner de Faturas (Modelo Gratuito Mindee)</h2>

      <div>
        <button onClick={startCamera}>🎥 Ativar Câmera</button>
        <button onClick={captureAndSend}>📷 Capturar Imagem</button>
        <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} />
      </div>

      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxHeight: "300px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {loading && <p>⏳ Processando documento...</p>}

      {result && (
        <div>
          <h3>🔎 Resultado:</h3>
          <ul>
            <li><b>Fornecedor:</b> {extractField("supplier_name")}</li>
            <li><b>Cliente:</b> {extractField("customer_name")}</li>
            <li><b>Data:</b> {extractField("date")}</li>
            <li><b>Total:</b> {extractField("total_amount")}</li>
            <li><b>Número da Fatura:</b> {extractField("invoice_number")}</li>
          </ul>

          <details>
            <summary>📦 Ver JSON completo</summary>
            <pre style={{ whiteSpace: "pre-wrap", background: "#eee", padding: "1rem" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default Scan;

