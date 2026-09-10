
import { useEffect, useState } from 'react'
import {
  buscarReceitas,
  buscarReceitasPorPeriodo,
  buscarResumoFinanceiroPorPeriodo,
  buscarDespesasPorPeriodo,
  buscarDespesas,
  cadastrarDespesa,
  excluirDespesa as excluirDespesaAPI,
  atualizarDespesa
} from '../services/api'

function Financeiro() {

  const [receitas, setReceitas] = useState([])
  const [total, setTotal] = useState(0)
  const [totalHoje, setTotalHoje] = useState(0)
  const [totalSemana, setTotalSemana] = useState(0)
  const [totalMes, setTotalMes] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')
  const [periodo, setPeriodo] = useState('todos')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [despesas, setDespesas] = useState([])
  const [despesaEditando, setDespesaEditando] = useState(null)
  const [novaDespesa, setNovaDespesa] = useState(null)
  const [despesaParaExcluir, setDespesaParaExcluir] = useState(null)

  const [resumoFinanceiro, setResumoFinanceiro] = useState({
    recebimentos: 0,
    despesas: 0,
    lucro: 0
  })

  useEffect(() => {
    carregarFinanceiro()
  }, [])

  async function carregarFinanceiro() {

    try {

      setCarregando(true)
      setMensagem('')

      const hoje = new Date()

      const formatarDataAPI = (data) => {
        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dia = String(data.getDate()).padStart(2, '0')

        return `${ano}-${mes}-${dia}`
      }

      const inicioMes = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        1
      )

      const fimMes = new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        0
      )

      const inicio = formatarDataAPI(inicioMes)
      const fim = formatarDataAPI(fimMes)

      const dadosReceitas = await buscarReceitasPorPeriodo(
        inicio,
        fim
      )

      const [
        dadosResumo,
        dadosDespesas
      ] = await Promise.all([
        buscarResumoFinanceiroPorPeriodo(inicio, fim),
        buscarDespesasPorPeriodo(inicio, fim)
      ])

      setResumoFinanceiro(dadosResumo)
      setDespesas(dadosDespesas)
      setReceitas(dadosReceitas)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao carregar financeiro'
      )

    } finally {

      setCarregando(false)

    }
  }

  async function aplicarFiltro(novoPeriodo) {

    try {

      setPeriodo(novoPeriodo)
      setMensagem('')

      if (novoPeriodo === 'todos') {

        const [dadosReceitas, dadosDespesas] = await Promise.all([
          buscarReceitas(),
          buscarDespesas()
        ])

        const recebimentos = dadosReceitas.reduce(
          (total, receita) =>
            total + Number(receita.valor || 0),
          0
        )

        const totalDespesas = dadosDespesas.reduce(
          (total, despesa) =>
            total + Number(despesa.valor || 0),
          0
        )

        setReceitas(dadosReceitas)
        setDespesas(dadosDespesas)

        setResumoFinanceiro({
          recebimentos,
          despesas: totalDespesas,
          lucro: recebimentos - totalDespesas
        })

        return
      }

      const hoje = new Date()

      let inicio
      let fim

      if (novoPeriodo === 'hoje') {

        inicio = hoje
        fim = hoje

      }

      if (novoPeriodo === 'semana') {

        const diaSemana = hoje.getDay()

        const diferenca =
          diaSemana === 0 ? 6 : diaSemana - 1

        inicio = new Date(hoje)

        inicio.setDate(
          hoje.getDate() - diferenca
        )

        fim = new Date(inicio)

        fim.setDate(
          inicio.getDate() + 6
        )

      }

      if (novoPeriodo === 'mes') {

        inicio = new Date(
          hoje.getFullYear(),
          hoje.getMonth(),
          1
        )

        fim = new Date(
          hoje.getFullYear(),
          hoje.getMonth() + 1,
          0
        )

      }

      const formatarDataAPI = (data) => {

        const ano = data.getFullYear()

        const mes = String(
          data.getMonth() + 1
        ).padStart(2, '0')

        const dia = String(
          data.getDate()
        ).padStart(2, '0')

        return `${ano}-${mes}-${dia}`
      }

      const inicioFormatado =
        formatarDataAPI(inicio)

      const fimFormatado =
        formatarDataAPI(fim)

      const [
        dadosReceitas,
        dadosResumo,
        dadosDespesas
      ] = await Promise.all([
        buscarReceitasPorPeriodo(
          inicioFormatado,
          fimFormatado
        ),
        buscarResumoFinanceiroPorPeriodo(
          inicioFormatado,
          fimFormatado
        ),
        buscarDespesasPorPeriodo(
          inicioFormatado,
          fimFormatado
        )
      ])

      setReceitas(dadosReceitas)
      setResumoFinanceiro(dadosResumo)
      setDespesas(dadosDespesas)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao aplicar filtro'
      )

    }
  }

  async function aplicarPeriodoPersonalizado() {

    if (!dataInicio || !dataFim) {

      setMensagem(
        'Informe a data inicial e a data final'
      )

      return
    }

    if (dataInicio > dataFim) {

      setMensagem(
        'A data inicial não pode ser maior que a data final'
      )

      return
    }

    try {

      setMensagem('')
      setPeriodo('personalizado')

      const [
        dadosReceitas,
        dadosResumo,
        dadosDespesas
      ] = await Promise.all([
        buscarReceitasPorPeriodo(
          dataInicio,
          dataFim
        ),
        buscarResumoFinanceiroPorPeriodo(
          dataInicio,
          dataFim
        ),
        buscarDespesasPorPeriodo(
          dataInicio,
          dataFim
        )
      ])

      setReceitas(dadosReceitas)
      setResumoFinanceiro(dadosResumo)
      setDespesas(dadosDespesas)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao buscar período'
      )

    }
  }

  function formatarPreco(valor) {

    return Number(valor || 0).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    )
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

  async function excluirDespesa(id) {

    setDespesaParaExcluir(id)

  }
async function confirmarExclusao() {

  if (!despesaParaExcluir) return

  try {

    setMensagem('')

    const despesaExcluida = despesas.find(
      (despesa) => despesa.id === despesaParaExcluir
    )

    await excluirDespesaAPI(despesaParaExcluir)

    setDespesas(
      despesas.filter(
        (despesa) => despesa.id !== despesaParaExcluir
      )
    )

    setResumoFinanceiro((atual) => ({
      ...atual,
      despesas:
        atual.despesas -
        Number(despesaExcluida?.valor || 0),
      lucro:
        atual.lucro +
        Number(despesaExcluida?.valor || 0)
    }))

    setDespesaParaExcluir(null)

    setMensagem('Despesa excluída com sucesso.')

  } catch (erro) {

    setMensagem(
      erro.message || 'Erro ao excluir despesa'
    )
  }
}
function cancelarExclusao() {
  setDespesaParaExcluir(null)
}

  function iniciarEdicaoDespesa(despesa) {

    setDespesaEditando({
      id: despesa.id,
      descricao: despesa.descricao,
      categoria: despesa.categoria,
      valor: despesa.valor,
      data: despesa.data
    })
  }

  async function salvarEdicaoDespesa() {

    const valorAntigo = Number(
      despesas.find(
        (despesa) =>
          despesa.id === despesaEditando.id
      )?.valor || 0
    )

    const valorNovo = Number(
      despesaEditando.valor || 0
    )

    try {

      setMensagem('')

      const despesaAtualizada =
        await atualizarDespesa(
          despesaEditando.id,
          {
            descricao: despesaEditando.descricao,
            categoria: despesaEditando.categoria,
            valor: valorNovo,
            data: despesaEditando.data
          }
        )

      setDespesas(
        despesas.map((despesa) =>
          despesa.id === despesaAtualizada.id
            ? despesaAtualizada
            : despesa
        )
      )

      setResumoFinanceiro((atual) => ({
        ...atual,
        despesas:
          atual.despesas -
          valorAntigo +
          valorNovo,
        lucro:
          atual.lucro +
          valorAntigo -
          valorNovo
      }))

      setDespesaEditando(null)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao atualizar despesa'
      )
    }
  }

  async function salvarNovaDespesa() {

    try {

      setMensagem('')

      const despesaCadastrada =
        await cadastrarDespesa({
          descricao: novaDespesa.descricao,
          categoria: novaDespesa.categoria,
          valor: Number(novaDespesa.valor),
          data: novaDespesa.data
        })

      const dataDespesa =
        despesaCadastrada.data

      let pertenceAoPeriodo = false

      if (periodo === 'todos') {

        pertenceAoPeriodo = true

      } else if (periodo === 'personalizado') {

        pertenceAoPeriodo =
          dataDespesa >= dataInicio &&
          dataDespesa <= dataFim

      } else {

        const hoje = new Date()

        const formatarDataAPI = (data) => {

          const ano = data.getFullYear()

          const mes = String(
            data.getMonth() + 1
          ).padStart(2, '0')

          const dia = String(
            data.getDate()
          ).padStart(2, '0')

          return `${ano}-${mes}-${dia}`
        }

        let inicio
        let fim

        if (periodo === 'hoje') {

          inicio = hoje
          fim = hoje

        }

        if (periodo === 'semana') {

          const diaSemana = hoje.getDay()

          const diferenca =
            diaSemana === 0
              ? 6
              : diaSemana - 1

          inicio = new Date(hoje)

          inicio.setDate(
            hoje.getDate() - diferenca
          )

          fim = new Date(inicio)

          fim.setDate(
            inicio.getDate() + 6
          )

        }

        if (periodo === 'mes') {

          inicio = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
          )

          fim = new Date(
            hoje.getFullYear(),
            hoje.getMonth() + 1,
            0
          )

        }

        const inicioFormatado =
          formatarDataAPI(inicio)

        const fimFormatado =
          formatarDataAPI(fim)

        pertenceAoPeriodo =
          dataDespesa >= inicioFormatado &&
          dataDespesa <= fimFormatado
      }

      if (pertenceAoPeriodo) {

        setDespesas((atuais) => [
          ...atuais,
          despesaCadastrada
        ])

        setResumoFinanceiro((atual) => ({
          ...atual,
          despesas:
            atual.despesas +
            Number(
              despesaCadastrada.valor || 0
            ),
          lucro:
            atual.lucro -
            Number(
              despesaCadastrada.valor || 0
            )
        }))
      }

      setNovaDespesa(null)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao cadastrar despesa'
      )
    }
  }

  return (
    <div className="pagina">

      <div className="pagina-cabecalho">

        <div>
          <h1>Financeiro</h1>

          <p>
            Acompanhe seus resultados
          </p>
        </div>

      </div>

      {mensagem && (
        <div className="mensagem erro">
          {mensagem}
        </div>
      )}

      {carregando ? (

        <div className="estado">
          Carregando financeiro...
        </div>

      ) : (

        <>

          <div className="cards-financeiro">

            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                💰
              </div>

              <div>
                <span>
                  Recebimentos
                </span>

                <strong>
                  {formatarPreco(
                    resumoFinanceiro.recebimentos
                  )}
                </strong>
              </div>

            </div>

            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                💸
              </div>

              <div>
                <span>
                  Despesas
                </span>

                <strong>
                  {formatarPreco(
                    resumoFinanceiro.despesas
                  )}
                </strong>
              </div>

            </div>

            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                📈
              </div>

              <div>
                <span>
                  Lucro
                </span>

                <strong>
                  {formatarPreco(
                    resumoFinanceiro.lucro
                  )}
                </strong>
              </div>

            </div>

          </div>

          <div className="filtros-financeiro">

            <button
              className={
                periodo === 'todos'
                  ? 'filtro-ativo'
                  : ''
              }
              onClick={() => aplicarFiltro('todos')}
            >
              Todos
            </button>

            <button
              className={
                periodo === 'hoje'
                  ? 'filtro-ativo'
                  : ''
              }
              onClick={() => aplicarFiltro('hoje')}
            >
              Hoje
            </button>

            <button
              className={
                periodo === 'semana'
                  ? 'filtro-ativo'
                  : ''
              }
              onClick={() => aplicarFiltro('semana')}
            >
              Esta semana
            </button>

            <button
              className={
                periodo === 'mes'
                  ? 'filtro-ativo'
                  : ''
              }
              onClick={() => aplicarFiltro('mes')}
            >
              Este mês
            </button>

            <div className="filtro-personalizado">

              <input
                type="date"
                value={dataInicio}
                onChange={(e) =>
                  setDataInicio(e.target.value)
                }
              />

              <span>
                até
              </span>

              <input
                type="date"
                value={dataFim}
                onChange={(e) =>
                  setDataFim(e.target.value)
                }
              />

              <button
                className={
                  periodo === 'personalizado'
                    ? 'filtro-ativo'
                    : ''
                }
                onClick={aplicarPeriodoPersonalizado}
              >
                Filtrar
              </button>

            </div>

          </div>

          <div className="card-tabela">

            <div className="secao-cabecalho">

              <div>

                <h2>
                  Recebimentos
                </h2>

                <p>
                  Atendimentos concluídos
                </p>

              </div>

            </div>

            {receitas.length === 0 ? (

              <div className="estado">

                <h3>
                  Nenhum recebimento
                </h3>

                <p>
                  Os atendimentos concluídos aparecerão aqui.
                </p>

              </div>

            ) : (

              <div className="tabela-container">

                <table>

                  <thead>

                    <tr>
                      <th>Data</th>
                      <th>Cliente</th>
                      <th>Serviço</th>
                      <th>Status</th>
                      <th>Valor</th>
                    </tr>

                  </thead>

                  <tbody>

                    {receitas.map((agendamento) => (

                      <tr key={agendamento.id}>

                        <td>

                          <div className="data-agendamento">

                            <div className="data">
                              {formatarData(
                                agendamento.dataHora
                              )}
                            </div>

                            <div className="hora">
                              {formatarHora(
                                agendamento.dataHora
                              )}
                            </div>

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

                          <span className="status status-concluido">
                            Concluído
                          </span>

                        </td>

                        <td>

                          <strong className="valor-receita">
                            {formatarPreco(
                              agendamento.valor
                            )}
                          </strong>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          <div className="card-tabela">

            <div className="secao-cabecalho">

              <div>

                <h2>
                  Despesas do período
                </h2>

                <p>
                  Despesas registradas no período selecionado
                </p>

              </div>

              <button
                className="botao-nova-despesa"
                onClick={() =>
                  setNovaDespesa({
                    descricao: '',
                    categoria: '',
                    valor: '',
                    data: ''
                  })
                }
              >
                + Nova despesa
              </button>

            </div>

            {novaDespesa && (
              <div className="formulario-edicao-despesa">

                <h3>
                  Nova despesa
                </h3>

                <div className="formulario-despesa-grid">

                  <input
                    type="text"
                    placeholder="Descrição"
                    value={novaDespesa.descricao}
                    onChange={(e) =>
                      setNovaDespesa({
                        ...novaDespesa,
                        descricao: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Categoria"
                    value={novaDespesa.categoria}
                    onChange={(e) =>
                      setNovaDespesa({
                        ...novaDespesa,
                        categoria: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                    value={novaDespesa.valor}
                    onChange={(e) =>
                      setNovaDespesa({
                        ...novaDespesa,
                        valor: e.target.value
                      })
                    }
                  />

                  <input
                    type="date"
                    value={novaDespesa.data}
                    onChange={(e) =>
                      setNovaDespesa({
                        ...novaDespesa,
                        data: e.target.value
                      })
                    }
                  />

                </div>

                <div className="acoes-edicao-despesa">

                  <button
                    onClick={() =>
                      setNovaDespesa(null)
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={salvarNovaDespesa}
                  >
                    Registrar despesa
                  </button>

                </div>

              </div>
            )}

            {despesaEditando && (
              <div className="formulario-edicao-despesa">

                <h3>
                  Editar despesa
                </h3>

                <div className="formulario-despesa-grid">

                  <input
                    type="text"
                    placeholder="Descrição"
                    value={despesaEditando.descricao}
                    onChange={(e) =>
                      setDespesaEditando({
                        ...despesaEditando,
                        descricao: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Categoria"
                    value={despesaEditando.categoria}
                    onChange={(e) =>
                      setDespesaEditando({
                        ...despesaEditando,
                        categoria: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                    value={despesaEditando.valor}
                    onChange={(e) =>
                      setDespesaEditando({
                        ...despesaEditando,
                        valor: e.target.value
                      })
                    }
                  />

                  <input
                    type="date"
                    value={despesaEditando.data}
                    onChange={(e) =>
                      setDespesaEditando({
                        ...despesaEditando,
                        data: e.target.value
                      })
                    }
                  />

                </div>

                <div className="acoes-edicao-despesa">

                  <button
                    onClick={() =>
                      setDespesaEditando(null)
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={salvarEdicaoDespesa}
                  >
                    Salvar alterações
                  </button>

                </div>

              </div>
            )}

            {despesas.length === 0 ? (

              <div className="estado">

                <h3>
                  Nenhuma despesa
                </h3>

                <p>
                  As despesas registradas aparecerão aqui.
                </p>

              </div>

            ) : (

              <div className="tabela-container">

                <table>

                  <thead>

                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>

                  </thead>

                  <tbody>

                    {despesas.map((despesa) => (

                      <tr key={despesa.id}>

                        <td>
                          {new Date(
                            despesa.data
                          ).toLocaleDateString('pt-BR')}
                        </td>

                        <td>

                          <strong>
                            {despesa.descricao}
                          </strong>

                        </td>

                        <td>
                          {despesa.categoria}
                        </td>

                        <td>

                          <strong className="valor-despesa">
                            {formatarPreco(
                              despesa.valor
                            )}
                          </strong>

                        </td>

                        <td>

                          <button
                            className="botao-editar-despesa"
                            onClick={() =>
                              iniciarEdicaoDespesa(despesa)
                            }
                          >
                            ✏️
                          </button>

                          <button
                            className="botao-excluir-despesa"
                            onClick={() =>
                              excluirDespesa(despesa.id)
                            }
                          >
                            🗑️
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>

            )}

            {despesaParaExcluir && (
              <div className="confirmacao-exclusao">

                <div className="confirmacao-card">

                  <h3>
                    Excluir despesa?
                  </h3>

                  <p>
                    Tem certeza que deseja excluir esta despesa?
                  </p>

                  <div className="confirmacao-botoes">

                    <button
                      type="button"
                      onClick={cancelarExclusao}
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      onClick={confirmarExclusao}
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>
        )
}

export default Financeiro

