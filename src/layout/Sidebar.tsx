import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FileSearch,
  Boxes,
  BarChart2,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  // Detecta qual é a área atual a partir da URL (ex: "/faturacao/faturas")
  const area = pathname.split("/")[1] || "dashboard";

  // Menus por área
  const menusPorArea: Record<string, { path: string; label: string; icon: React.ReactNode }[]> = {
    dashboard: [
      { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { path: "/configuracoes", label: "Configurações", icon: <Settings size={18} /> },
    ],
    faturacao: [
      { path: "/faturacao/clientes", label: "Clientes", icon: <Users size={18} /> },
      { path: "/faturacao/faturas", label: "Faturas", icon: <FileText size={18} /> },
    ],
    fiscal: [
      { path: "/fiscal/declaracoes", label: "Declarações", icon: <FileSearch size={18} /> },
      { path: "/fiscal/iva", label: "IVA", icon: <FileText size={18} /> },
    ],
    inventario: [
      { path: "/inventario/produtos", label: "Produtos", icon: <Boxes size={18} /> },
      { path: "/inventario/stock", label: "Stock", icon: <FileText size={18} /> },
    ],
    contabilidade: [
      { path: "/contabilidade/diario", label: "Lançamentos", icon: <BarChart2 size={18} /> },
      { path: "/contabilidade/balancete", label: "Balancete", icon: <FileText size={18} /> },
    ],
  };

  const menus = menusPorArea[area] || menusPorArea["dashboard"];

  return (
    <aside className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h5 className="mb-4 fw-bold">Debit Cloud</h5>
      <ul className="nav flex-column">
        {menus.map(({ path, label, icon }) => (
          <li key={path} className="nav-item mb-2">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `nav-link text-white d-flex align-items-center gap-2 ${
                  isActive ? "fw-bold" : ""
                }`
              }
            >
              {icon} {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
