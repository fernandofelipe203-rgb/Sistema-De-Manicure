
import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children, pagina, setPagina }) {
  return (
    <main className="dashboard">

      <Sidebar
        pagina={pagina}
        setPagina={setPagina}
      />

      <section className="conteudo">

        <Header />

        {children}

      </section>

    </main>
  )
}

export default Layout

