import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { buscarClientes } from '../services/api'

function Dashboard({ setPagina }) {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    async function carregarClientes() {
      try {
        const dados = await buscarClientes()
        setClientes(dados)
      } catch (erro) {
        console.error('Erro ao carregar clientes:', erro)
      }
    }

    carregarClientes()
  }, [])

  return (
    <Layout setPagina={setPagina}>

      <section className="cards">

        <div className="card">
          <span>Clientes</span>
          <strong>{clientes.length}</strong>
          <small>cadastrados</small>
        </div>

        <div className="card">
          <span>Agendamentos</span>
          <strong>6</strong>
          <small>hoje</small>
        </div>

        <div className="card">
          <span>Serviços</span>
          <strong>8</strong>
          <small>cadastrados</small>
        </div>

      </section>

      <section className="proximos">

        <div className="secao-titulo">
          <h2>Próximos atendimentos</h2>
          <button>Ver agenda</button>
        </div>

        <div className="atendimento">
          <div>
            <strong>Maria Silva</strong>
            <span>Manicure + esmaltação</span>
          </div>

          <time>14:00</time>
        </div>

        <div className="atendimento">
          <div>
            <strong>Ana Paula</strong>
            <span>Alongamento de unhas</span>
          </div>

          <time>15:30</time>
        </div>

        <div className="atendimento">
          <div>
            <strong>Juliana</strong>
            <span>Banho de gel</span>
          </div>

          <time>17:00</time>
        </div>

      </section>

    </Layout>
  )
}

export default Dashboard