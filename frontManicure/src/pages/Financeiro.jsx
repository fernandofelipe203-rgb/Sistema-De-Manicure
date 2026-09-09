import { useEffect, useState } from 'react'
import {
  buscarReceitas,
  buscarTotalFinanceiro
} from '../services/api'

function Financeiro() {

  const [receitas, setReceitas] = useState([])
  const [total, setTotal] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    carregarFinanceiro()
  }, [])

  async function carregarFinanceiro() {

    try {

      setCarregando(true)

      const [dadosReceitas, dadosTotal] =
        await Promise.all([
          buscarReceitas(),
          buscarTotalFinanceiro()
        ])

      setReceitas(dadosReceitas)
      setTotal(dadosTotal.total)

    } catch (erro) {

      setMensagem(
        erro.message || 'Erro ao carregar financeiro'
      )

    } finally {

      setCarregando(false)

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
                ✓
              </div>

              <div>
                <span>
                  Atendimentos concluídos
                </span>

                <strong>
                  {receitas.length}
                </strong>
              </div>

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