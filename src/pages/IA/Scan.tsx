import React, { useRef, useState } from "react";

// 🔐 API Key e username da plataforma Mindee (https://app.mindee.com)
const MINDEE_API_KEY = "md_ftkje0qmypgxpb5l91rpg7sz6pfluilu";
const MINDEE_USERNAME = "andy9gg"; // aparece no canto superior direito do site da Mindee

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🟢 Ativar a câmera do usuário
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

  // 📷 Captura a imagem da câmera e envia
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

  // 📂 Envia um arquivo PDF ou imagem
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sendToMindee(file);
    }
  };

  // 🚀 Envia para a API da Mindee
  const sendToMindee = async (file: Blob) => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(
        `https://api.mindee.com/v1/products/${MINDEE_USERNAME}/invoice/v1/predict`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${MINDEE_API_KEY}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      const formatted = JSON.stringify(data, null, 2);
      setResult(formatted);
    } catch (err) {
      alert("Erro ao enviar para o Mindee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📸 Scanner Inteligente com Mindee</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={startCamera}>Ativar Câmera</button>
        <button onClick={captureAndSend}>📷 Capturar</button>
        <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      </div>

      {/* Câmera ao vivo */}
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxHeight: "300px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Estado de carregamento e resultado */}
      {loading && <p>🔄 Processando documento...</p>}
      {result && (
        <div>
          <h4>📄 Resultado (JSON):</h4>
          <pre style={{ background: "#eee", padding: "1rem", whiteSpace: "pre-wrap" }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Scan;
