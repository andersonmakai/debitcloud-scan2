import React, { createContext, useContext, useState } from "react";

type LinhaProduto = {
  descricao: string;
  quantidade: number;
  preco: number;
  iva: number;
};

type FaturaContextType = {
  cliente: string;
  linhas: LinhaProduto[];
  setCliente: (nome: string) => void;
  adicionarLinha: (linha: LinhaProduto) => void;
  emitirFatura: () => void;
};

const FaturaContext = createContext<FaturaContextType | null>(null);

export const useFatura = () => useContext(FaturaContext)!;

export const FaturaProvider = ({ children }: { children: React.ReactNode }) => {
  const [cliente, setCliente] = useState("");
  const [linhas, setLinhas] = useState<LinhaProduto[]>([]);

  const adicionarLinha = (linha: LinhaProduto) => {
    setLinhas(prev => [...prev, linha]);
  };

  const emitirFatura = () => {
    const temProduto = linhas.some(l => l.descricao && l.preco > 0);
    if (!cliente.trim() || !temProduto) return;

    const subtotal = linhas.reduce((acc, l) => acc + l.preco * l.quantidade, 0);
    const totalIVA = linhas.reduce((acc, l) => acc + (l.preco * l.quantidade * l.iva) / 100, 0);
    const total = subtotal + totalIVA;

    const fatura = {
      numero: `FT-${Date.now()}`,
      cliente,
      data: new Date().toLocaleDateString(),
      linhas,
      subtotal,
      totalIVA,
      total
    };

    const anteriores = JSON.parse(localStorage.getItem("faturasEmitidas") || "[]");
    const atualizadas = [...anteriores, fatura];
    localStorage.setItem("faturasEmitidas", JSON.stringify(atualizadas));

    setCliente("");
    setLinhas([]);
    alert("✅ Fatura emitida com sucesso!");
  };

  return (
    <FaturaContext.Provider value={{ cliente, linhas, setCliente, adicionarLinha, emitirFatura }}>
      {children}
    </FaturaContext.Provider>
  );
};
