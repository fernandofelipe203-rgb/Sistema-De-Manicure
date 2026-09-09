import { useEffect, useState } from 'react'
import {
  buscarAgendamentos,
  cadastrarAgendamento,
  atualizarAgendamento,
  excluirAgendamento,
  buscarClientes,
  buscarServicos
} from '../services/api'

function Agenda() {

  const [agendamentos, setAgendamentos] = useState([])
  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])

  const [carregando, setCarregando] = useState(true)

  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(false)

  const [id, setId] = useState(null)
  const [clienteId, setClienteId] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [status, setStatus] = useState('AGENDADO')

  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setCarregando(true)

      const [dadosAgendamentos, dadosClientes, dadosServicos] =
        await Promise.all([
          buscarAgendamentos(),
          buscarClientes(),
          buscarServicos()
        ])

      setAgendamentos(dadosAgendamentos)
      setClientes(dadosClientes)
      setServicos(dadosServicos)

    } catch (erro) {
      mostrarMensagem(erro.message, 'erro')
    } finally {
      setCarregando(false)
    }
  }

  function abrirNovoAgendamento() {
    setEditando(false)

    setId(null)
    setClienteId('')
    setServicoId('')
    setData('')
    setHora('')
    setStatus('AGENDADO')

    setModalAberto(true)
  }

  function abrirEditarAgendamento(agendamento) {
    setEditando(true)

    setId(agendamento.id)
    setClienteId(agendamento.cliente.id)
    setServicoId(agendamento.servico.id)

    const dataHora = agendamento.dataHora

    setData(dataHora.substring(0, 10))
    setHora(dataHora.substring(11, 16))

    setStatus(agendamento.status)

    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
  }

  async function salvarAgendamento(e) {
    e.preventDefault()
        const hoje = obterDataMinima()

        if (data < hoje) {

          mostrarMensagem(
            'Não é possível agendar para uma data anterior a hoje.',
            'erro'
          )

          return
        }

    const dados = {
      dataHora: `${data}T${hora}`,
      cliente: {
        id: Number(clienteId)
      },
      servico: {
        id: Number(servicoId)
      },
      status
    }

    try {

      if (editando) {

        await atualizarAgendamento(id, dados)

        mostrarMensagem(
          'Agendamento atualizado com sucesso!',
          'sucesso'
        )

      } else {

        await cadastrarAgendamento(dados)

        mostrarMensagem(
          'Agendamento criado com sucesso!',
          'sucesso'
        )
      }

      fecharModal()
      carregarDados()

    } catch (erro) {
      mostrarMensagem(erro.message, 'erro')
    }
  }

  async function removerAgendamento(id) {

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este agendamento?'
    )

    if (!confirmar) {
      return
    }

    try {

      await excluirAgendamento(id)

      mostrarMensagem(
        'Agendamento excluído com sucesso!',
        'sucesso'
      )

      carregarDados()

    } catch (erro) {
      mostrarMensagem(erro.message, 'erro')
    }
  }

  function mostrarMensagem(texto, tipo) {

    setMensagem(texto)
    setTipoMensagem(tipo)

    setTimeout(() => {
      setMensagem('')
      setTipoMensagem('')
    }, 3000)
  }

function formatarData(dataHora) {
  const data = new Date(dataHora)

  return data.toLocaleDateString('pt-BR')
}

function formatarHora(dataHora) {
  const data = new Date(dataHora)

  return data.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
function obterDataMinima() {

  const hoje = new Date()

  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')

  return `${ano}-${mes}-${dia}`

}

  return (
    <div className="pagina">

      <div className="pagina-cabecalho">

        <div>
          <h1>Agenda</h1>
          <p>Gerencie seus agendamentos</p>
        </div>

        <button
          className="botao-principal"
          onClick={abrirNovoAgendamento}
        >
          + Novo agendamento
        </button>

      </div>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}

      <div className="card-tabela">

        {carregando ? (

          <div className="estado">
            Carregando agenda...
          </div>

        ) : agendamentos.length === 0 ? (

          <div className="estado">
            <h3>Nenhum agendamento</h3>
            <p>
              Crie seu primeiro agendamento.
            </p>
          </div>

        ) : (

          <div className="tabela-container">

            <table>

              <thead>
                <tr>
                  <th>Data e hora</th>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>

                {agendamentos.map((agendamento) => (

                  <tr key={agendamento.id}>

                    <td className="data-agendamento">
                      <div className="data">
                        {formatarData(agendamento.dataHora)}
                      </div>

                      <div className="hora">
                        {formatarHora(agendamento.dataHora)}
                      </div>
                    </td>

                    <td>
                      <strong>
                        {agendamento.cliente.nome}
                      </strong>
                    </td>

                    <td>
                      {agendamento.servico.nome}
                    </td>

                    <td>
                      <span className={`status status-${agendamento.status.toLowerCase()}`}>
                        {agendamento.status}
                      </span>
                    </td>

                    <td>

                      <div className="acoes">

                        <button
                          className="botao-editar"
                          onClick={() =>
                            abrirEditarAgendamento(
                              agendamento
                            )
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="botao-excluir"
                          onClick={() =>
                            removerAgendamento(
                              agendamento.id
                            )
                          }
                        >
                          Excluir
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {modalAberto && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-cabecalho">

              <div>

                <h2>
                  {editando
                    ? 'Editar agendamento'
                    : 'Novo agendamento'}
                </h2>

                <p>
                  {editando
                    ? 'Atualize os dados'
                    : 'Agende um novo atendimento'}
                </p>

              </div>

              <button
                className="fechar-modal"
                onClick={fecharModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={salvarAgendamento}>

              <div className="campo">

                <label>Cliente</label>

                <select
                  value={clienteId}
                  onChange={(e) =>
                    setClienteId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Selecione uma cliente
                  </option>

                  {clientes.map((cliente) => (

                    <option
                      key={cliente.id}
                      value={cliente.id}
                    >
                      {cliente.nome}
                    </option>

                  ))}

                </select>

              </div>


              <div className="campo">

                <label>Serviço</label>

                <select
                  value={servicoId}
                  onChange={(e) =>
                    setServicoId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Selecione um serviço
                  </option>

                  {servicos.map((servico) => (

                    <option
                      key={servico.id}
                      value={servico.id}
                    >
                      {servico.nome} - R$ {servico.preco}
                    </option>

                  ))}

                </select>

              </div>


              <div className="campos">

                <div className="campo">

                  <label>Data</label>

                  <input
                    type="date"
                    value={data}
                    min={obterDataMinima()}
                    onChange={(e) =>
                      setData(e.target.value)
                    }
                    required
                  />

                </div>


                <div className="campo">

                  <label>Horário</label>

                  <input
                    type="time"
                    value={hora}
                    onChange={(e) =>
                      setHora(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              <div className="campo">

                <label>Status</label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  required
                >

                  <option value="AGENDADO">
                    Agendado
                  </option>

                  <option value="CONFIRMADO">
                    Confirmado
                  </option>

                  <option value="CONCLUIDO">
                    Concluído
                  </option>

                  <option value="CANCELADO">
                    Cancelado
                  </option>

                </select>

              </div>


              <div className="modal-acoes">

                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="botao-principal"
                >
                  {editando
                    ? 'Salvar alterações'
                    : 'Criar agendamento'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Agenda