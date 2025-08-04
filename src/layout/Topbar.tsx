import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Robot, PersonCircle } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">
      <Container fluid>
        <Navbar.Brand className="fw-bold">MakInvest ERP</Navbar.Brand>

        <Nav className="me-auto d-flex align-items-center gap-3">
          <Nav.Link as={NavLink} to="/ia">
            <Robot size={20} className="me-1" /> IA
          </Nav.Link>
          <Nav.Link as={NavLink} to="/faturacao">
            Faturação
          </Nav.Link>
          <Nav.Link as={NavLink} to="/fiscal">
            Fiscal
          </Nav.Link>
          <Nav.Link as={NavLink} to="/inventario">
            Inventário
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contabilidade">
            Contabilidade
          </Nav.Link>
        </Nav>

        <Dropdown align="end">
          <Dropdown.Toggle variant="light" id="dropdown-user">
            <PersonCircle size={22} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/perfil">Perfil</Dropdown.Item>
            <Dropdown.Item href="#/sair">Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Topbar;
