import DashboardLayout from "../layout/DashboardLayout";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Container className="py-4">
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Documentos</Card.Title>
                <h3>12</h3>
                <p className="text-muted mb-0">Este mês</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Receita</Card.Title>
                <h3>40.000 Kz</h3>
                <p className="text-muted mb-0">Este mês</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Despesas</Card.Title>
                <h3>18.000 Kz</h3>
                <p className="text-muted mb-0">Este mês</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Valor em stock</Card.Title>
                <h3>95.000 Kz</h3>
                <p className="text-muted mb-0">Total disponível</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}
