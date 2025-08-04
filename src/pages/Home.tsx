import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import EmpresaCard from '../components/EmpresaCard';

export type Documento = {
  empresa: File[];
  funcionarios: File[];
  clientes: File[];
};

export type Empresa = {
  nome: string;
  nif: string;
  sector: string;
  pais: string;
  moeda: string;
  data: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  documento?: Documento;
  _id?: string;
};

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega do localStorage
    const dadosEmpresa = localStorage.getItem("dadosEmpresa");
    if (dadosEmpresa) {
      setEmpresas([JSON.parse(dadosEmpresa)]);
    }
  }, []);

  const handleAbrir = (empresa: Empresa) => {
    localStorage.setItem("empresaSelecionada", JSON.stringify(empresa));
    navigate("/dashboard");
  };

  return (
    <div>
      <Header />

      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Empresas</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-danger btn-sm">Remover empresa</button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/cadastro")}
            >
              Adicionar empresa
            </button>
          </div>
        </div>

        <div className="input-group mb-4">
          <input type="text" className="form-control" placeholder="Pesquisar empresa..." disabled />
          <span className="input-group-text bg-light">🔍</span>
        </div>

        {empresas.length === 0 ? (
          <p className="text-muted">Nenhuma empresa cadastrada ainda.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {empresas.map((empresa, index) => (
              <EmpresaCard
                key={index}
                nome={empresa.nome}
                atividade={empresa.sector}
                nif={empresa.nif}
                index={index}
                onAbrir={() => handleAbrir(empresa)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
