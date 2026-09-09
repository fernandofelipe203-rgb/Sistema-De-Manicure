
function Sidebar({ pagina, setPagina }) {
  return (
    <aside className="menu">

      <div className="logo">
        ✿ Manicure
      </div>

      <nav>

        <button
          className={pagina === 'dashboard' ? 'ativo' : ''}
          onClick={() => setPagina('dashboard')}
        >
          Início
        </button>

        <button
          className={pagina === 'clientes' ? 'ativo' : ''}
          onClick={() => setPagina('clientes')}
        >
          Clientes
        </button>

        <button
          className={pagina === 'agenda' ? 'ativo' : ''}
          onClick={() => setPagina('agenda')}
        >
          Agenda
        </button>

        <button
          className={pagina === 'servicos' ? 'ativo' : ''}
          onClick={() => setPagina('servicos')}
        >
          Serviços
        </button>

        <button
          className={pagina === 'financeiro' ? 'ativo' : ''}
          onClick={() => setPagina('financeiro')}
        >
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

