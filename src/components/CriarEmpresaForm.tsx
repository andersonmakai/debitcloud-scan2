import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type Props = {
  show: boolean;
  onHide: () => void;
  onSalvar: (nova: {
    nome: string;
    nif: string;
    sector: string;
    pais: string;
    moeda: string;
    data: string;
  }) => void;
};

export default function CriarEmpresaForm({ show, onHide, onSalvar }: Props) {
  const [formData, setFormData] = useState({
    nome: '',
    nif: '',
    sector: '',
    pais: 'Angola',
    moeda: 'Kz',
    data: '',
  });

  function handleChange(e: React.ChangeEvent<any>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSalvar(formData);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Empresa Manualmente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-grid gap-3">

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="nome"
              placeholder="Nome da empresa"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="nif"
              placeholder="NIF"
              value={formData.nif}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="sector"
              placeholder="Sector"
              value={formData.sector}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="pais"
              placeholder="País"
              value={formData.pais}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="moeda"
              placeholder="Moeda"
              value={formData.moeda}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Salvar
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
}
