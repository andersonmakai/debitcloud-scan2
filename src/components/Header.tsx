export default function Header() {
  return (
    <header className="bg-light border-bottom p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div className="d-flex gap-3 flex-wrap">
          <button className="btn btn-link p-0">← Voltar</button>
          <span>Users</span>
          <span>Suporte</span>
        </div>
        <div className="fw-bold text-end">MakInvest</div>
      </div>
    </header>
  );
}
