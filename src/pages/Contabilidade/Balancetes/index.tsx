// src/pages/Contabilidade/Balancetes/index.tsx
import React from "react";
import { Card } from "../../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dadosExemplo = [
  { mes: "Jan", total: 12000 },
  { mes: "Fev", total: 9800 },
  { mes: "Mar", total: 13400 },
];

export default function Balancetes() {
  return (
    <Card data-chat-command="balancetes">
      <h2 className="text-xl font-bold mb-4">Balancetes</h2>
      <p className="text-sm text-muted mb-2">
        Resumo dos saldos mensais por centro de custo
      </p>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dadosExemplo}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
