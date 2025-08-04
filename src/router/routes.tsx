import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard";
import Faturas from "../pages/Faturacao/Faturas";
import Clientes from "../pages/Faturacao/Clientes";
import Declaracoes from "../pages/Fiscal/Declaracoes";
import SAFT from "../pages/Fiscal/SAFT";
import Impostos from "../pages/Fiscal/Impostos";
import Retencoes from "../pages/Fiscal/Retencoes";
import Produtos from "../pages/Inventario/Produtos";
import Diario from "../pages/Contabilidade/Diario";
import Balancete from "../pages/Contabilidade/Balancete";
import Razao from "../pages/Contabilidade/Razao";
import Balancetes from "../pages/Contabilidade/Balancetes";
import CadastroPrincipal from "../pages/CadastroPrincipal";
import EmpresaForm from "../pages/cadastro/EmpresaForm";
import FaturacaoIndex from "../pages/Faturacao/FaturacaoIndex";
import IAHome from "../pages/IA/IAHome";
import Scan from "../pages/IA/Scan";





const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/faturacao/faturas" element={<Faturas />} />
      <Route path="/faturacao/clientes" element={<Clientes />} />
      <Route path="/fiscal/declaracoes" element={<Declaracoes />} />
      <Route path="/fiscal/saft" element={<SAFT />} />
      <Route path="/fiscal/impostos" element={<Impostos />} />
      <Route path="/fiscal/retencoes" element={<Retencoes />} />
      <Route path="/inventario/produtos" element={<Produtos />} />
      <Route path="/contabilidade/diario" element={<Diario />} />
      <Route path="/contabilidade/balancete" element={<Balancete />} />
      <Route path="/contabilidade/razao" element={<Razao />} />
      <Route path="/contabilidade/balancetes" element={<Balancetes />} />
      <Route path="/cadastro" element={<CadastroPrincipal />} />
      <Route path="/cadastro/empresa" element={<EmpresaForm />} />
      <Route path="/faturacao" element={<FaturacaoIndex />} />
      <Route path="/ia" element={<IAHome />} />
      <Route path="/ia/scan" element={<Scan />} />


      


    </Routes>
  );
};

export default AppRoutes;
