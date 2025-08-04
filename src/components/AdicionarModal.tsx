import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Empresa, Documento } from '../pages/Home';

type Props = {
  show: boolean;
  onHide: () => void;
  onAdicionar: (empresa: Empresa) => void;
};

export default function AdicionarModal({ show, onHide, onAdicionar }: Props) {
  const [novaEmpresa, setNovaEmpresa] = useState<Omit<Empresa, '_id'>>({
    nome: '',
    nif: '',
    sector: '',
    pais: '',
    moeda: '',
    data: new Date().toISOString().slice(0, 10),
    email: '',
    telefone: '',
    endereco: '',
    documento: {
      empresa: [],
      funcionarios: [],
      clientes: []
    }
  });

  const handleFileChange = (tipo: keyof Documento, files: FileList | null) => {
    if (!files) return;
  
    setNovaEmpresa(prev => {
      const documentoAtual = prev.documento ?? {
        empresa: [],
        funcionarios: [],
        clientes: []
      };
  
      return {
        ...prev,
        documento: {
          empresa: tipo === 'empresa' ? Array.from(files) : documentoAtual.empresa,
          funcionarios: tipo === 'funcionarios' ? Array.from(files) : documentoAtual.funcionarios,
          clientes: tipo === 'clientes' ? Array.from(files) : documentoAtual.clientes
        }
      };
    });
  };
  
  

  const handleSubmit = () => {
    onAdicionar(novaEmpresa);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={novaEmpresa.nome} onChange={e => setNovaEmpresa({ ...novaEmpresa, nome: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>NIF</Form.Label>
            <Form.Control type="text" value={novaEmpresa.nif} onChange={e => setNovaEmpresa({ ...novaEmpresa, nif: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Sector</Form.Label>
            <Form.Control type="text" value={novaEmpresa.sector} onChange={e => setNovaEmpresa({ ...novaEmpresa, sector: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>País</Form.Label>
            <Form.Control type="text" value={novaEmpresa.pais} onChange={e => setNovaEmpresa({ ...novaEmpresa, pais: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Moeda</Form.Label>
            <Form.Control type="text" value={novaEmpresa.moeda} onChange={e => setNovaEmpresa({ ...novaEmpresa, moeda: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={novaEmpresa.email} onChange={e => setNovaEmpresa({ ...novaEmpresa, email: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" value={novaEmpresa.telefone} onChange={e => setNovaEmpresa({ ...novaEmpresa, telefone: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" value={novaEmpresa.endereco} onChange={e => setNovaEmpresa({ ...novaEmpresa, endereco: e.target.value })} />
          </Form.Group>

          <hr />
          <h6 className="mt-3">Documentos</h6>
          <Form.Group className="mb-2">
            <Form.Label>Empresa</Form.Label>
            <Form.Control type="file" multiple onChange={e => handleFileChange('empresa', (e.target as HTMLInputElement).files)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Funcionários</Form.Label>
            <Form.Control type="file" multiple onChange={e => handleFileChange('funcionarios', (e.target as HTMLInputElement).files)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Clientes</Form.Label>
            <Form.Control type="file" multiple onChange={e => handleFileChange('clientes', (e.target as HTMLInputElement).files)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
