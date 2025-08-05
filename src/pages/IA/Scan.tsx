import React, { useState, useRef } from "react";

const MINDEE_API_KEY = "md_ftkje0qmypgxpb5l91rpg7sz6pfluilu";

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sendToMindee(file);
    }
  };

  const sendToMindee = async (file: Blob) => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch("https://api.mindee.net/v1/products/mindee/invoice/v1/predict", {
        method: "POST",
        headers: {
          Authorization: `Token ${MINDEE_API_KEY}`,
        },
        body: formData,
      });

      const data = await res.json();
      const rawText = JSON.stringify(data, null, 2);
      setResult(rawText);
    } catch (err) {
      alert("Erro ao enviar para o Mindee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📸 Scanner Inteligente</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={startCamera}>Ativar Câmera</button>
        <button onClick={captureAndSend}>📷 Capturar</button>
        <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      </div>

      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxHeight: "300px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {loading && <p>🔄 Processando...</p>}
      {result && (
        <div>
          <h4>📄 Resultado:</h4>
          <pre style={{ background: "#eee", padding: "1rem", whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default Scan;

