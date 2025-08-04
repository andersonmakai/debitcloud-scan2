import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Container, /*Row, Col*/ } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar fixa à esquerda */}
      <div className="bg-dark text-white vh-100" style={{ width: "250px", position: "fixed" }}>
        <Sidebar />
      </div>

      {/* Conteúdo principal com Topbar */}
      <div className="flex-grow-1" style={{ marginLeft: "250px", width: "100%" }}>
        <Topbar />

        <Container fluid className="p-4">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;
