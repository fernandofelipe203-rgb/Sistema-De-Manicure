
import { useEffect, useState } from 'react'
import {
  buscarReceitas,
  buscarTotalFinanceiro,
  buscarTotalHoje,
  buscarTotalSemana,
  buscarTotalMes,
  buscarReceitasPorPeriodo
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

  useEffect(() => {
    carregarFinanceiro()
  }, [])

  async function carregarFinanceiro() {

    try {

      setCarregando(true)
      setMensagem('')

      const [
        dadosReceitas,
        dadosTotal,
        dadosHoje,
        dadosSemana,
        dadosMes
      ] = await Promise.all([
        buscarReceitas(),
        buscarTotalFinanceiro(),
        buscarTotalHoje(),
        buscarTotalSemana(),
        buscarTotalMes()
      ])

      setReceitas(dadosReceitas)
      setTotal(dadosTotal.total)
      setTotalHoje(dadosHoje.total)
      setTotalSemana(dadosSemana.total)
      setTotalMes(dadosMes.total)

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

        const dados = await buscarReceitas()

        setReceitas(dados)

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

      const dados =
        await buscarReceitasPorPeriodo(
          formatarDataAPI(inicio),
          formatarDataAPI(fim)
        )

      setReceitas(dados)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao aplicar filtro'
      )

    }
  }
async function aplicarPeriodoPersonalizado() {

  if (!dataInicio || !dataFim) {
    setMensagem('Informe a data inicial e a data final')
    return
  }

  if (dataInicio > dataFim) {
    setMensagem('A data inicial não pode ser maior que a data final')
    return
  }

  try {

    setMensagem('')
    setPeriodo('personalizado')

    const dados =
      await buscarReceitasPorPeriodo(
        dataInicio,
        dataFim
      )

    setReceitas(dados)

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

  return (
    <div className="pagina">

      <div className="pagina-cabecalho">

        <div>
          <h1>Financeiro</h1>

          <p>
            Acompanhe seus recebimentos
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
                  Total recebido
                </span>

                <strong>
                  {formatarPreco(total)}
                </strong>
              </div>

            </div>


            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                📅
              </div>

              <div>
                <span>
                  Hoje
                </span>

                <strong>
                  {formatarPreco(totalHoje)}
                </strong>
              </div>

            </div>


            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                📆
              </div>

              <div>
                <span>
                  Esta semana
                </span>

                <strong>
                  {formatarPreco(totalSemana)}
                </strong>
              </div>

            </div>


            <div className="card-financeiro">

              <div className="card-financeiro-icone">
                🗓️
              </div>

              <div>
                <span>
                  Este mês
                </span>

                <strong>
                  {formatarPreco(totalMes)}
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
                onChange={(e) => setDataInicio(e.target.value)}
              />

              <span>até</span>

              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
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

        </>

      )}

    </div>
  )
}

export default Financeiro

