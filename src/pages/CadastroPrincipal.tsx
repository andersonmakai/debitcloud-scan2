import { useNavigate } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import { useState } from "react";
import './CadastroPrincipal.css';

const cards = [
  {
    icon: "🏢",
    title: "Empresas",
    desc: "Dados da empresa, setor, moeda, NIF",
    rota: "/cadastro/empresa"
  },
  {
    icon: "👤",
    title: "Clientes",
    desc: "Nome, NIF, contato, conta contábil",
    rota: "/cadastro/clientes"
  },
  {
    icon: "📦",
    title: "Fornecedores",
    desc: "Nome, NIF, contato, condições de pagamento",
    rota: "/cadastro/fornecedores"
  },
  {
    icon: "✅",
    title: "Produtos/Serviços",
    desc: "Código, descrição, preço, stock",
    rota: "/cadastro/produtos"
  },
  {
    icon: "📄",
    title: "Faturas",
    desc: "Itens, valores, IVA, data, estado",
    rota: "/cadastro/faturas"
  },
  {
    icon: "💸",
    title: "Despesas",
    desc: "Fornecedor, categoria, valor, data",
    rota: "/cadastro/despesas"
  },
  {
    icon: "🧾",
    title: "Lançamentos Contábeis",
    desc: "Débito, crédito, conta, data, descrição",
    rota: "/cadastro/lancamentos"
  },
  {
    icon: "🧮",
    title: "Impostos/IVA",
    desc: "Tipo, base tributável, valor, data",
    rota: "/cadastro/iva"
  },
  {
    icon: "👔",
    title: "Salários (opcional)",
    desc: "Funcionário, valor bruto, descontos, líquido",
    rota: "/cadastro/salarios"
  }
];

export default function CadastroPrincipal() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleSalvar = () => {
    const dados = localStorage.getItem("dadosEmpresa");

    if (dados) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/"); // ← volta para a tela principal (parecida com Manager.io)
      }, 2000);
    } else {
      alert("⚠️ Preencha e salve os dados da empresa antes de continuar.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Cadastro Principal</h2>
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="🔍 Pesquisar..."
            className="form-control"
            style={{ maxWidth: 200 }}
          />
          <button className="btn btn-success" onClick={handleSalvar}>
            💾 Salvar
          </button>
        </div>
      </div>

      {showAlert && (
        <Alert variant="success" className="text-white bg-success">
          ✅ Cadastramento feito!
        </Alert>
      )}

      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-sm-6 col-md-4">
            <Card
              className="shadow-sm card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(card.rota)}
            >
              <Card.Body className="text-center">
                <div style={{ fontSize: "2rem" }}>{card.icon}</div>
                <h5 className="fw-bold mt-2">{card.title}</h5>
                <p className="text-muted small">{card.desc}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

