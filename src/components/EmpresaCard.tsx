import { Button } from 'react-bootstrap';

type Props = {
  nome: string;
  atividade: string;
  nif: string;
  index: number;
  onAbrir: () => void;
};

export default function EmpresaCard({ nome, atividade, nif, /*index,*/ onAbrir }: Props) {
  return (
    <div className="card p-3 shadow-sm">
      <h5>{nome}</h5>
      <p className="mb-1"><strong>Atividade:</strong> {atividade}</p>
      <p className="mb-3"><strong>NIF:</strong> {nif}</p>
      <Button variant="outline-primary" onClick={onAbrir}>
        Abrir
      </Button>
    </div>
  );
}
