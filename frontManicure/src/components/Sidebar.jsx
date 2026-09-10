
import { useEffect, useState } from 'react'

function Sidebar({ pagina, setPagina }) {

  const [mostrarMenu, setMostrarMenu] = useState(false)

  useEffect(() => {

    const controlarScroll = () => {
      if (window.scrollY > 50) {
        setMostrarMenu(true)
      } else {
        setMostrarMenu(false)
      }
    }

    window.addEventListener('scroll', controlarScroll)

    return () => {
      window.removeEventListener('scroll', controlarScroll)
    }

  }, [])
  return (
    <aside className={`menu ${mostrarMenu ? 'mostrar-menu' : ''}`}>

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

        <button
          className={pagina === 'perfil' ? 'ativo' : ''}
          onClick={() => setPagina('perfil')}
        >
          Meu perfil
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

