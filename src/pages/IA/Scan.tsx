import React, { useRef, useState } from "react";

// 🔐 Nova API Key correta da Mindee
const MINDEE_API_KEY = "md_jchirghjomj0vgeud2qbv3v16lzgsngd";

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
      const formatted = JSON.stringify(data, null, 2);
      setResult(formatted);
    } catch (err: any) {
      alert("Erro ao enviar para o Mindee: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📸 Scanner Inteligente com Mindee</h2>

      <div style={{ marginBott

