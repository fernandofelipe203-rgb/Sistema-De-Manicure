import {
  Users,
  CalendarDays,
  CalendarClock,
  Wallet
} from 'lucide-react'

import { useEffect, useState } from 'react'
import {
  buscarClientes,
  buscarServicos,
  buscarAgendamentos,
  buscarTotalHoje
} from '../services/api'

function Dashboard({ setPagina }) {

  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [agendamentos, setAgendamentos] = useState([])
  const [faturamentoHoje, setFaturamentoHoje] = useState(0)

  useEffect(() => {

    async function carregarDados() {

      try {

        const [
          dadosClientes,
          dadosServicos,
          dadosAgendamentos,
          dadosFaturamentoHoje
        ] = await Promise.all([
          buscarClientes(),
          buscarServicos(),
          buscarAgendamentos(),
          buscarTotalHoje()
        ])

        setClientes(dadosClientes)
        setServicos(dadosServicos)
        setAgendamentos(dadosAgendamentos)
        setFaturamentoHoje(dadosFaturamentoHoje.total)

      } catch (erro) {

        console.error(
          'Erro ao carregar dados do dashboard:',
          erro
        )

      }

    }

    carregarDados()

  }, [])


  // =========================
  // FORMATAR HORA
  // =========================

  function formatarHora(dataHora) {

    const data = new Date(dataHora)

    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })

  }


  // =========================
  // FORMATAR DATA
  // =========================

  function formatarData(dataHora) {

    const data = new Date(dataHora)

    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    })

  }


  // =========================
  // ATENDIMENTOS DE HOJE
  // =========================

  function atendimentosDeHoje() {

    const hoje = new Date()

    return agendamentos
      .filter((agendamento) => {

        const dataAgendamento =
          new Date(agendamento.dataHora)

        return (
          dataAgendamento.getDate() === hoje.getDate() &&
          dataAgendamento.getMonth() === hoje.getMonth() &&
          dataAgendamento.getFullYear() === hoje.getFullYear() &&
          agendamento.status !== 'CANCELADO'
        )

      })
      .sort((a, b) => {

        return (
          new Date(a.dataHora) -
          new Date(b.dataHora)
        )

      })

  }


  // =========================
  // PRÓXIMOS ATENDIMENTOS
  // =========================

  function proximosAtendimentos() {

    const hoje = new Date()

    // Zera o horário para comparar somente a data
    hoje.setHours(0, 0, 0, 0)

    return agendamentos
      .filter((agendamento) => {

        const dataAgendamento =
          new Date(agendamento.dataHora)

        // Zera o horário do agendamento também
        dataAgendamento.setHours(0, 0, 0, 0)

        return (
          dataAgendamento > hoje &&
          agendamento.status !== 'CANCELADO'
        )

      })
      .sort((a, b) => {

        return (
          new Date(a.dataHora) -
          new Date(b.dataHora)
        )

      })
      .slice(0, 3)

  }


  const hoje = atendimentosDeHoje()
  const proximos = proximosAtendimentos()


  return (
    <>

      {/* =========================
          CARDS
      ========================= */}

      <section className="cards">

        <div className="card">
            <div className="card-icone">
              <Users />
            </div>
          <span>
            Clientes
          </span>

          <strong>
            {clientes.length}
          </strong>

          <small>
            cadastrados
          </small>
        </div>


        <div className="card">
            <div className="card-icone">
              <CalendarDays />
            </div>
          <span>
            Atendimentos hoje
          </span>

          <strong>
            {hoje.length}
          </strong>

          <small>
            agendados para hoje
          </small>
        </div>


        <div className="card">
            <div className="card-icone">
              <CalendarClock />
            </div>
          <span>
            Próximos
          </span>

          <strong>
            {proximos.length}
          </strong>

          <small>
            próximos atendimentos
          </small>
        </div>


        <div className="card">
            <div className="card-icone">
              <Wallet />
            </div>
          <span>
            Faturamento hoje
          </span>

          <strong>
            R$ {Number(faturamentoHoje).toFixed(2).replace('.', ',')}
          </strong>

          <small>
            atendimentos concluídos
          </small>
        </div>

      </section>


      {/* =========================
          ATENDIMENTOS DE HOJE
      ========================= */}

      <section className="proximos">

        <div className="secao-titulo">

          <h2>
            Atendimentos de hoje
          </h2>

          <span>
            {hoje.length} atendimento(s)
          </span>

        </div>


        {hoje.length === 0 ? (

          <div className="estado">

            <h3>
              Nenhum atendimento hoje
            </h3>

            <p>
              Você não possui atendimentos agendados para hoje.
            </p>

          </div>

        ) : (

          hoje.map((agendamento) => (

            <div
              className="atendimento"
              key={agendamento.id}
            >

              <div>

                <strong>
                  {agendamento.cliente.nome}
                </strong>

                <span>
                  {agendamento.servico.nome}
                </span>

              </div>

              <time>
                {formatarHora(agendamento.dataHora)}
              </time>

            </div>

          ))

        )}

      </section>


      {/* =========================
          PRÓXIMOS ATENDIMENTOS
      ========================= */}

      <section className="proximos">

        <div className="secao-titulo">

          <h2>
            Próximos atendimentos
          </h2>

          <button
            onClick={() => setPagina('agenda')}
          >
            Ver agenda
          </button>

        </div>


        {proximos.length === 0 ? (

          <div className="estado">

            <h3>
              Nenhum atendimento próximo
            </h3>

            <p>
              Seus próximos agendamentos aparecerão aqui.
            </p>

          </div>

        ) : (

          proximos.map((agendamento) => (

            <div
              className="atendimento"
              key={agendamento.id}
            >

              <div>

                <strong>
                  {agendamento.cliente.nome}
                </strong>

                <span>
                  {agendamento.servico.nome}
                </span>

              </div>

              <time>

                {formatarData(agendamento.dataHora)}

                {' • '}

                {formatarHora(agendamento.dataHora)}

              </time>

            </div>

          ))

        )}

      </section>

    </>
  )
}

export default Dashboard

