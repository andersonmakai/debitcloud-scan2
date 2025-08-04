// ✅ Novo arquivo: src/pages/IA/IAHome.tsx

import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function IAHome() {
  const navigate = useNavigate();

  const cards = [
    { titulo: "📸 Escanear Documento", rota: "/ia/scan" },
    { titulo: "📂 Enviar PDF", rota: "/ia/upload" },
    { titulo: "📊 Análises Automatizadas", rota: "/ia/analises" },
    { titulo: "📁 Histórico de Documentos", rota: "/ia/historico" },
  ];

  return (
    <Container className="mt-4">
      <h3>🤖 Área de Inteligência Artificial</h3>
      <Row className="mt-4 g-4">
        {cards.map((card, i) => (
          <Col key={i} md={6} lg={4}>
            <Card
              className="shadow-sm cursor-pointer hover:bg-light"
              onClick={() => navigate(card.rota)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{card.titulo}</Card.Title>
                <p className="text-muted mb-0">Clique para abrir</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
