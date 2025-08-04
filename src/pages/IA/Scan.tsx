import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Button, Spinner, Card, Alert, Form } from "react-bootstrap";

const MINDEE_API_KEY = "md_r3clwsbynacppnqxhix0aqn0lb5jh3jq";

const Scan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [resultadoJson, setResultadoJson] = useState<any | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    iniciarCamera();
    return () => pararCamera();
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Erro ao acessar a câmera.");
    }
  };

  const pararCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const capturarImagem = async () => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob) await enviarParaMindee(blob);
    }, "image/jpeg");
  };

  const enviarArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await enviarParaMindee(file);
  };

  const enviarParaMindee = async (arquivo: Blob) => {
    setCarregando(true);
    setResultadoJson(null);

    const formData = new FormData();
    formData.append("document", arquivo);

    try {
      const resposta = await fetch("https://api.mindee.net/v1/products/mindee/invoice/v1/predict", {
        method: "POST",
        headers: {
          Authorization: `Token ${MINDEE_API_KEY}`,
        },
        body: formData,
      });

      const dados = await resposta.json();
      setResultadoJson(dados);
    } catch (err) {
      alert("Erro ao enviar para a API Mindee.");
    } finally {
      setCarregando(false);
    }
  };

  const extrairCampo = (nome: string) => {
    return (
      resultadoJson?.document?.inference?.prediction?.[nome]?.value ||
      resultadoJson?.document?.inference?.prediction?.[nome]?.content ||
      "—"
    );
  };

  return (
    <DashboardLayout>
      <h3 className="mb-3">📸 Digitalização Inteligente de Documentos</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row gap-3 mb-3">
          <Button onClick={capturarImagem} disabled={carregando}>
            📷 Escanear com Câmera
          </Button>
          <Form.Control type="file" accept=".pdf,image/*" onChange={enviarArquivo} disabled={carregando} />
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxHeight: "50vh", borderRadius: "8px" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </Card>

      {carregando && (
        <Alert variant="info">
          <Spinner size="sm" animation="border" /> Processando documento...
        </Alert>
      )}

      {resultadoJson && (
        <>
          <h5>📄 Detecção Automática</h5>
          <Card className="p-3 mb-3">
            <p><strong>Cliente:</strong> {extrairCampo("customer_name")}</p>
            <p><strong>Data:</strong> {extrairCampo("date")}</p>
            <p><strong>Fatura Nº:</strong> {extrairCampo("invoice_number")}</p>
            <p><strong>Total:</strong> {extrairCampo("total_incl")}</p>
            <p><strong>Moeda:</strong> {extrairCampo("locale")}</p>
          </Card>

          <h6 className="text-muted">JSON completo:</h6>
          <pre style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(resultadoJson, null, 2)}
          </pre>
        </>
      )}
    </DashboardLayout>
  );
};

export default Scan;

