function Sidebar({ setPagina }) {
  return (
    <aside className="menu">

      <div className="logo">
        ✿ Manicure
      </div>

      <nav>
        <button onClick={() => setPagina('dashboard')}>
          Início
        </button>

        <button onClick={() => setPagina('clientes')}>
          Clientes
        </button>

        <button onClick={() => setPagina('agenda')}>
          Agenda
        </button>

        <button onClick={() => setPagina('servicos')}>
          Serviços
        </button>

        <button onClick={() => setPagina('financeiro')}>
          Financeiro
        </button>
      </nav>

      <button
        className="sair"
        onClick={() => {
          localStorage.removeItem('token')
          window.location.href = '/'
        }}
      >
        Sair
      </button>

    </aside>
  )
}

export default Sidebar