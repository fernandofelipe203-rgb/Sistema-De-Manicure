import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children, setPagina }) {
  return (
    <main className="dashboard">

      <Sidebar setPagina={setPagina} />

      <section className="conteudo">

        <Header />

        {children}

      </section>

    </main>
  )
}

export default Layout