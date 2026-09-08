
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { buscarClientes, cadastrarCliente,  atualizarCliente, excluirCliente } from '../services/api'

function Clientes({ setPagina }) {

    const [clientes, setClientes] = useState([])
    const [busca, setBusca] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [mostrarModal, setMostrarModal] = useState(false)
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [salvando, setSalvando] = useState(false)
    const [clienteEditando, setClienteEditando] = useState(null)
    const [sucesso, setSucesso] = useState('')
    const [clienteVisualizando, setClienteVisualizando] = useState(null)
    const [clienteExcluindo, setClienteExcluindo] = useState(null)


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
async function salvarCliente(event) {
  event.preventDefault()

  try {
    setSalvando(true)

    const novoCliente = {
      nome,
      telefone: telefone.replace(/\D/g, ''),
      email
    }

    const clienteCriado = await cadastrarCliente(novoCliente)

    setClientes((clientesAtuais) => [
      ...clientesAtuais,
      clienteCriado
    ])

    setNome('')
    setTelefone('')
    setEmail('')

    setMostrarModal(false)
    setSucesso('Cliente cadastrada com sucesso!')

    setTimeout(() => {
      setSucesso('')
    }, 3000)

  } catch (erro) {
    console.error(erro)
    setErro(erro.message)
  } finally {
    setSalvando(false)
  }
}
async function editarCliente(event) {
  event.preventDefault()

  try {
    setSalvando(true)

    const clienteAtualizado = {
      nome,
      telefone: telefone.replace(/\D/g, ''),
      email
    }

    const cliente = await atualizarCliente(
      clienteEditando.id,
      clienteAtualizado
    )

    setClientes((clientesAtuais) =>
      clientesAtuais.map((item) =>
        item.id === cliente.id ? cliente : item
      )
    )

    setNome('')
    setTelefone('')
    setEmail('')
    setClienteEditando(null)
    setMostrarModal(false)

    setSucesso('Cliente atualizada com sucesso!')

    setTimeout(() => {
      setSucesso('')
    }, 3000)

 } catch (erro) {
   console.error(erro)
   setErro(erro.message)
 } finally {
    setSalvando(false)
  }
}
function abrirEdicao(cliente) {
  setClienteEditando(cliente)
  setNome(cliente.nome)
  setTelefone(cliente.telefone)
  setEmail(cliente.email)
  setMostrarModal(true)
}

function abrirVisualizacao(cliente) {
  setClienteVisualizando(cliente)
}
async function confirmarExclusao() {
  if (!clienteExcluindo) return

  try {
    setSalvando(true)

    await excluirCliente(clienteExcluindo.id)

    setClientes((clientesAtuais) =>
      clientesAtuais.filter(
        (cliente) => cliente.id !== clienteExcluindo.id
      )
    )

    setClienteExcluindo(null)

    setSucesso('Cliente excluída com sucesso!')

    setTimeout(() => {
      setSucesso('')
    }, 3000)

  } catch (erro) {
    console.error(erro)
    setErro('Não foi possível excluir a cliente.')
  } finally {
    setSalvando(false)
  }
}
const clientesFiltrados = clientes.filter((cliente) => {
  const termo = busca.toLowerCase().trim()

  return (
    cliente.nome.toLowerCase().includes(termo) ||
    cliente.telefone.includes(termo)
  )
})
function formatarTelefone(telefone) {
  const numeros = telefone?.replace(/\D/g, '')

  if (!numeros) {
    return ''
  }

  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }

  return telefone
}

  return (
    <Layout setPagina={setPagina}>

      <section className="clientes">

          {clienteVisualizando && (
            <div className="modal-overlay">

              <div className="modal">

                <div className="modal-cabecalho">

                  <div>
                    <h2>Dados da cliente</h2>
                    <p>Confira as informações cadastradas.</p>
                  </div>

                  <button
                    className="modal-fechar"
                    onClick={() => setClienteVisualizando(null)}
                  >
                    ×
                  </button>

                </div>

                <div className="cliente-detalhes">

                  <div className="detalhe">
                    <span>Nome</span>
                    <strong>{clienteVisualizando.nome}</strong>
                  </div>

                  <div className="detalhe">
                    <span>Telefone</span>
                    <strong>{formatarTelefone(clienteVisualizando.telefone)}</strong>
                  </div>

                  <div className="detalhe">
                    <span>E-mail</span>
                    <strong>
                      {clienteVisualizando.email || 'Não informado'}
                    </strong>
                  </div>

                </div>

                <div className="modal-acoes">

                  <button
                    type="button"
                    className="botao-cancelar"
                    onClick={() => setClienteVisualizando(null)}
                  >
                    Fechar
                  </button>

                  <button
                    type="button"
                    className="botao-salvar"
                    onClick={() => {
                      abrirEdicao(clienteVisualizando)
                      setClienteVisualizando(null)
                    }}
                  >
                    Editar cliente
                  </button>

                </div>

              </div>

            </div>
          )}

          {sucesso && (
            <div className="alerta-sucesso">
              ✓ {sucesso}
            </div>
          )}

        <div className="clientes-cabecalho">
          <div>
            <h1>Clientes</h1>
            <p>Gerencie suas clientes de forma simples e organizada.</p>
          </div>

          <button
            className="botao-novo-cliente"
            onClick={() => setMostrarModal(true)}
          >
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
        {clienteExcluindo && (
          <div className="modal-overlay">
            <div className="modal modal-confirmacao">
              <div className="modal-cabecalho">
                <div>
                  <h2>Excluir cliente?</h2>
                  <p>Essa ação não poderá ser desfeita.</p>
                </div>

                <button
                  className="modal-fechar"
                  onClick={() => setClienteExcluindo(null)}
                >
                  ×
                </button>
              </div>

              <div className="confirmacao-conteudo">
                <p>
                  Tem certeza que deseja excluir a cliente
                  <strong> {clienteExcluindo.nome}</strong>?
                </p>
              </div>

              <div className="modal-acoes">
                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={() => setClienteExcluindo(null)}
                  disabled={salvando}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="botao-excluir"
                  onClick={confirmarExclusao}
                  disabled={salvando}
                >
                  {salvando ? 'Excluindo...' : 'Sim, excluir'}
                </button>
              </div>
            </div>
          </div>
        )}


        <section className="lista-clientes">

          <div className="secao-titulo">
            <h2>Clientes cadastradas</h2>
          </div>
          <div className="busca-clientes">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {carregando && (
            <p>Carregando clientes...</p>
          )}

          {erro && (
            <div className="alerta-erro">
              <span>⚠️ {erro}</span>

              <button
                type="button"
                onClick={() => setErro('')}
              >
                ×
              </button>
            </div>
          )}

          {!carregando && !erro && clientes.length === 0 && (
            <p>Nenhuma cliente cadastrada.</p>
          )}

          {!carregando && !erro && clientes.length > 0 && clientesFiltrados.length === 0 && (
            <p>Nenhuma cliente encontrada para "{busca}".</p>
          )}

          {!carregando && !erro && clientesFiltrados.map((cliente) => (

            <div className="cliente" key={cliente.id}>

              <div className="cliente-identificacao">

                <div className="cliente-avatar">
                  {cliente.nome.charAt(0).toUpperCase()}
                </div>

                <div className="cliente-info">
                  <strong>{cliente.nome}</strong>

                  <span>{formatarTelefone(cliente.telefone)}</span>

                  <span className="cliente-email">
                    {cliente.email || 'E-mail não informado'}
                  </span>
                </div>

              </div>

              <div className="cliente-acoes">

                <button
                  className="botao-ver"
                  onClick={() => abrirVisualizacao(cliente)}
                >
                  Ver
                </button>

                <button
                  className="botao-editar"
                  onClick={() => abrirEdicao(cliente)}
                >
                  Editar
                </button>

                <button
                  className="botao-excluir-lista"
                  onClick={() => setClienteExcluindo(cliente)}
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </section>

        {mostrarModal && (

          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-cabecalho">
                <div>
                  <h2>
                    {clienteEditando ? 'Editar cliente' : 'Nova cliente'}
                  </h2>

                  <p>
                    {clienteEditando
                      ? 'Altere os dados da cliente.'
                      : 'Cadastre uma nova cliente.'}
                  </p>
                </div>

                <button
                  className="modal-fechar"
                  onClick={() => setMostrarModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={clienteEditando ? editarCliente : salvarCliente}>

                <div className="campo">
                  <label>Nome</label>
                 <input
                   type="text"
                   placeholder="Nome da cliente"
                   value={nome}
                   onChange={(e) => {
                     const valor = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
                     setNome(valor)
                   }}
                   required
                 />
                </div>

                <div className="campo">
                  <label>Telefone</label>

                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={(e) => {
                      const numeros = e.target.value.replace(/\D/g, '').slice(0, 11)

                      let telefoneFormatado = numeros

                      if (numeros.length <= 2) {
                        telefoneFormatado = `(${numeros}`
                      } else if (numeros.length <= 7) {
                        telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
                      } else {
                        telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
                      }

                      setTelefone(telefoneFormatado)
                    }}
                    required
                    minLength={15}
                    maxLength={15}
                  />
                </div>

                <div className="campo">
                  <label>E-mail</label>
                  <input
                  type="email"
                    placeholder="cliente@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-acoes">

                  <button
                    type="button"
                    className="botao-cancelar"
                    onClick={() => setMostrarModal(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                     className="botao-salvar"
                     disabled={salvando}
                   >
                     {salvando
                       ? 'Salvando...'
                       : clienteEditando
                         ? 'Salvar alterações'
                         : 'Salvar cliente'}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </section>

    </Layout>
  )
}

export default Clientes

