import DashboardLayout from "../../layout/DashboardLayout";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const itens = [
  {
    title: "Emitir Fatura",
    desc: "Emitir faturas para clientes",
    rota: "/faturacao/faturas",
    emoji: "🧾"
  },
  {
    title: "Recibos",
    desc: "Emitir e registrar recibos",
    rota: "/faturacao/recibos",
    emoji: "💰"
  },
  {
    title: "Notas de crédito",
    desc: "Criar notas de devolução",
    rota: "/faturacao/notas-credito",
    emoji: "🔁"
  }
];

export default function FaturacaoIndex() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <h3 className="mb-4 fw-bold">📄 Faturação</h3>
      <div className="row g-4">
        {itens.map((item, i) => (
          <div className="col-sm-6 col-md-4" key={i}>
            <Card className="shadow-sm card-hover" onClick={() => navigate(item.rota)} style={{ cursor: "pointer" }}>
              <Card.Body className="text-center">
                <div style={{ fontSize: "2rem" }}>{item.emoji}</div>
                <h5 className="fw-bold mt-2">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
