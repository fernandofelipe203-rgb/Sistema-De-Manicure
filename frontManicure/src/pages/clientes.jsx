import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { buscarClientes } from '../services/api'

function Clientes({ setPagina }) {

  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarClientes() {
      try {
        const dados = await buscarClientes()
        setClientes(dados)
      } catch (erro) {
        console.error(erro)
        setErro('Não foi possível carregar os clientes.')
      } finally {
        setCarregando(false)
      }
    }

    carregarClientes()
  }, [])

  return (
    <Layout setPagina={setPagina}>

      <section className="clientes">

        <div className="clientes-cabecalho">
          <div>
            <h1>Clientes</h1>
            <p>Gerencie suas clientes de forma simples e organizada.</p>
          </div>

          <button className="botao-novo-cliente">
            + Novo cliente
          </button>
        </div>

        <section className="clientes-resumo">

          <div className="card">
            <span>Total de clientes</span>
            <strong>{clientes.length}</strong>
            <small>cadastradas</small>
          </div>

        </section>

        <section className="lista-clientes">

          <div className="secao-titulo">
            <h2>Clientes cadastradas</h2>
          </div>

          {carregando && (
            <p>Carregando clientes...</p>
          )}

          {erro && (
            <p>{erro}</p>
          )}

          {!carregando && !erro && clientes.length === 0 && (
            <p>Nenhuma cliente cadastrada.</p>
          )}

          {!carregando && !erro && clientes.map((cliente) => (

            <div className="cliente" key={cliente.id}>

              <div className="cliente-info">
                <strong>{cliente.nome}</strong>
                <span>{cliente.telefone}</span>
              </div>

              <div className="cliente-acoes">
                <button>Ver</button>
                <button>Editar</button>
              </div>

            </div>

          ))}

        </section>

      </section>

    </Layout>
  )
}

export default Clientes