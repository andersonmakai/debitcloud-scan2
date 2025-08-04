//import React from 'react';
//import { useParams } from 'react-router-dom';
import './TelaEmpresa.css';

export default function TelaEmpresa() {
  //const { id } = useParams();

  return (
    <div className="tela-empresa">
      <aside className="menu-lateral">
        <h2>Anderson</h2>
        <ul>
          <li className="active">Resumo</li>
          <li>Lançamentos contábeis</li>
          <li>Contas bancárias</li>
          <li>Contas em dinheiro</li>
          <li>Recibos</li>
          <li>Pagamentos</li>
        </ul>
        <div className="mais-opcoes">Mais opções...</div>
      </aside>

      <main className="area-principal">
        <input className="pesquisa" placeholder="🔍 Pesquisar..." disabled />

        <div className="cards-resumo">
          <div className="card-resumo receitas">
            <h5>Receita</h5>
            <div className="valor">Kz 12.000.000,00</div>
          </div>
          <div className="card-resumo despesas">
            <h5>Despesas</h5>
            <div className="valor">Kz 5.000.000,00</div>
          </div>
          <div className="card-resumo lucro">
            <h5>Lucro líquido</h5>
            <div className="valor">Kz 7.000.000,00</div>
          </div>
          <div className="card-resumo ativos">
            <h5>Ativos</h5>
            <div className="valor">Kz 20.000.000,00</div>
          </div>
          <div className="card-resumo passivos">
            <h5>Passivos</h5>
            <div className="valor">Kz 8.000.000,00</div>
          </div>
          <div className="card-resumo equity">
            <h5>Equity</h5>
            <div className="valor">Kz 12.000.000,00</div>
          </div>
        </div>
      </main>
    </div>
  );
}
