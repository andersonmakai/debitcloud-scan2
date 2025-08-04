import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Form, Button, Table, Alert } from "react-bootstrap";

type LinhaProduto = {
  descricao: string;
  quantidade: number;
  preco: number;
  iva: number;
};

type Fatura = {
  numero: string;
  cliente: string;
  data: string;
  linhas: LinhaProduto[];
  subtotal: number;
  totalIVA: number;
  total: number;
};

const Faturas = () => {
  const [cliente, setCliente] = useState("");
  const [linhas, setLinhas] = useState<LinhaProduto[]>([
    { descricao: "", quantidade: 1, preco: 0, iva: 14 },
  ]);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const salvas = localStorage.getItem("faturasEmitidas");
    if (salvas) setFaturas(JSON.parse(salvas));
  }, []);

  const calcularTotais = () => {
    const subtotal = linhas.reduce(
      (acc, linha) => acc + linha.quantidade * linha.preco,
      0
    );
    const totalIVA = linhas.reduce(
      (acc, linha) =>
        acc + (linha.quantidade * linha.preco * linha.iva) / 100,
      0
    );
    return { subtotal, totalIVA, total: subtotal + totalIVA };
  };

  const handleEmitir = () => {
    if (!cliente.trim()) return alert("Preencha o nome do cliente.");

    const temProduto = linhas.some((l) => l.descricao && l.preco > 0);
    if (!temProduto) return alert("Adicione pelo menos 1 produto.");

    const { subtotal, totalIVA, total } = calcularTotais();

    const novaFatura: Fatura = {
      numero: `FT-${String(faturas.length + 1).padStart(4, "0")}`,
      cliente,
      data: new Date().toLocaleDateString(),
      linhas,
      subtotal,
      totalIVA,
      total,
    };

    const atualizadas = [...faturas, novaFatura];
    setFaturas(atualizadas);
    localStorage.setItem("faturasEmitidas", JSON.stringify(atualizadas));
    setCliente("");
    setLinhas([{ descricao: "", quantidade: 1, preco: 0, iva: 14 }]);
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  };

  const handleLinhaChange = (
    index: number,
    campo: keyof LinhaProduto,
    valor: any
  ) => {
    const novas = [...linhas];
    novas[index] = {
      ...novas[index],
      [campo]: campo === "descricao" ? valor : Number(valor),
    };
    setLinhas(novas);
  };

  const adicionarLinha = () => {
    setLinhas([...linhas, { descricao: "", quantidade: 1, preco: 0, iva: 14 }]);
  };

  const { subtotal, totalIVA, total } = calcularTotais();

  return (
    <DashboardLayout>
      <h3>🧾 Emitir Fatura</h3>

      {sucesso && <Alert variant="success">✅ Fatura emitida com sucesso!</Alert>}

      <Form className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome ou empresa"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </Form.Group>

        <h5 className="mt-4">Produtos/Serviços</h5>
        {linhas.map((linha, index) => (
          <div key={index} className="row mb-2">
          <div className="col-md-4">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descrição"
              value={linha.descricao}
              onChange={(e) => handleLinhaChange(index, "descricao", e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={linha.quantidade}
              onChange={(e) => handleLinhaChange(index, "quantidade", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>Preço Unitário</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={linha.preco}
              onChange={(e) => handleLinhaChange(index, "preco", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <Form.Label>IVA (%)</Form.Label>
            <Form.Control
              type="number"
              value={linha.iva}
              onChange={(e) => handleLinhaChange(index, "iva", e.target.value)}
            />
          </div>
        </div>
        
        ))}
        <Button variant="secondary" size="sm" onClick={adicionarLinha}>
          + Adicionar Linha
        </Button>

        <div className="mt-4">
          <p>Subtotal: {subtotal.toFixed(2)} Kz</p>
          <p>IVA: {totalIVA.toFixed(2)} Kz</p>
          <h5>Total: {total.toFixed(2)} Kz</h5>
        </div>

        <Button variant="primary" onClick={handleEmitir}>
          ✅ Emitir Fatura
        </Button>
      </Form>

      <hr />
      <h4 className="mt-4">📋 Faturas Emitidas</h4>
      {faturas.length === 0 ? (
        <p className="text-muted">Nenhuma fatura emitida ainda.</p>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {faturas.map((f, i) => (
              <tr key={i}>
                <td>{f.numero}</td>
                <td>{f.cliente}</td>
                <td>{f.data}</td>
                <td>{f.total.toFixed(2)} Kz</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </DashboardLayout>
  );
};

export default Faturas;
