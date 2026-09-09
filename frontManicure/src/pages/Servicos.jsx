import { useEffect, useState } from 'react'
import {
  buscarServicos,
  cadastrarServico,
  atualizarServico,
  excluirServico
} from '../services/api'

function Servicos() {

  const [servicos, setServicos] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState(false)

  const [id, setId] = useState(null)
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [duracao, setDuracao] = useState('')

  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('')

  useEffect(() => {
    carregarServicos()
  }, [])

  async function carregarServicos() {
    try {
      setCarregando(true)

      const dados = await buscarServicos()

      setServicos(dados)

    } catch (erro) {
      mostrarMensagem(erro.message, 'erro')
    } finally {
      setCarregando(false)
    }
  }

  function abrirNovoServico() {
    setEditando(false)

    setId(null)
    setNome('')
    setPreco('')
    setDuracao('')

    setModalAberto(true)
  }

  function abrirEditarServico(servico) {
    setEditando(true)

    setId(servico.id)
    setNome(servico.nome)
    setPreco(servico.preco)
    setDuracao(servico.duracao)

    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
  }

  async function salvarServico(e) {
    e.preventDefault()

    const dados = {
      nome: nome.trim(),
      preco: Number(preco),
      duracao: Number(duracao)
    }

    try {

      if (editando) {

        await atualizarServico(id, dados)

        mostrarMensagem(
          'Serviço atualizado com sucesso!',
          'sucesso'
        )

      } else {

        await cadastrarServico(dados)

        mostrarMensagem(
          'Serviço cadastrado com sucesso!',
          'sucesso'
        )
      }

      fecharModal()
      carregarServicos()

    } catch (erro) {
      mostrarMensagem(erro.message, 'erro')
    }
  }

  async function removerServico(id) {

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este serviço?'
    )

    if (!confirmar) {
      return
    }

    try {

      await excluirServico(id)

      mostrarMensagem(
        'Serviço excluído com sucesso!',
        'sucesso'
      )

      carregarServicos()

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

  function formatarPreco(valor) {

    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="pagina">

      <div className="pagina-cabecalho">

        <div>
          <h1>Serviços</h1>
          <p>Gerencie os serviços oferecidos</p>
        </div>

        <button
          className="botao-principal"
          onClick={abrirNovoServico}
        >
          + Novo serviço
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
            Carregando serviços...
          </div>

        ) : servicos.length === 0 ? (

          <div className="estado">
            <h3>Nenhum serviço cadastrado</h3>
            <p>
              Cadastre seu primeiro serviço para começar.
            </p>
          </div>

        ) : (

          <div className="tabela-container">

            <table>

              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Preço</th>
                  <th>Duração</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>

                {servicos.map((servico) => (

                  <tr key={servico.id}>

                    <td>
                      <strong>{servico.nome}</strong>
                    </td>

                    <td>
                      {formatarPreco(servico.preco)}
                    </td>

                    <td>
                      {servico.duracao} min
                    </td>

                    <td>

                      <div className="acoes">

                        <button
                          className="botao-editar"
                          onClick={() =>
                            abrirEditarServico(servico)
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="botao-excluir"
                          onClick={() =>
                            removerServico(servico.id)
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
                    ? 'Editar serviço'
                    : 'Novo serviço'}
                </h2>

                <p>
                  {editando
                    ? 'Atualize os dados do serviço'
                    : 'Cadastre um novo serviço'}
                </p>
              </div>

              <button
                className="fechar-modal"
                onClick={fecharModal}
              >
                ×
              </button>

            </div>


            <form onSubmit={salvarServico}>

              <div className="campo">

                <label>
                  Nome do serviço
                </label>

                <input
                  type="text"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  placeholder="Ex: Manicure tradicional"
                  required
                />

              </div>


              <div className="campo">

                <label>
                  Preço
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={preco}
                  onChange={(e) =>
                    setPreco(e.target.value)
                  }
                  placeholder="Ex: 35.00"
                  required
                />

              </div>


              <div className="campo">

                <label>
                  Duração
                </label>

                <div className="campo-duracao">

                  <input
                    type="number"
                    min="1"
                    value={duracao}
                    onChange={(e) =>
                      setDuracao(e.target.value)
                    }
                    placeholder="Ex: 60"
                    required
                  />

                  <span>minutos</span>

                </div>

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
                    : 'Cadastrar serviço'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Servicos