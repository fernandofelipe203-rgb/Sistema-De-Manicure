
import { useEffect, useState } from 'react'
import { buscarDadosPublicosPorLink } from '../services/api'
import './Publico.css'

function Publico() {

  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {

    const partes = window.location.pathname.split('/')
    const linkPublico = partes[2]

    buscarDadosPublicosPorLink(linkPublico)
      .then((dadosRecebidos) => {
        setDados(dadosRecebidos)
      })
      .catch(() => {
        setErro('Profissional não encontrada.')
      })

  }, [])

  if (erro) {
    return (
      <div className="publico-erro">
        <h2>{erro}</h2>
      </div>
    )
  }

  if (!dados) {
    return (
      <div className="publico-carregando">
        <p>Carregando...</p>
      </div>
    )
  }
function abrirWhatsApp(servico) {

  const telefone = `55${dados.telefone.replace(/\D/g, '')}`

  const preco = servico.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const mensagem =
    `Olá! Tenho interesse no serviço de ${servico.nome} no valor de ${preco}.`

  const url =
    `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

  window.open(url, '_blank')
}

  return (
    <main className="publico-container">

      <section className="publico-header">
        <span className="publico-detalhe">✦</span>

        <h1>{dados.nome}</h1>

        <p>Serviços de beleza</p>
      </section>

      <section className="publico-servicos">

        <h2>Serviços</h2>

        <div className="servicos-grid">

          {dados.servicos.map((servico) => (

            <article className="servico-card" key={servico.id}>

              <div className="servico-icone">
                ✦
              </div>

              <div className="servico-info">

                <h3>{servico.nome}</h3>

                <p className="servico-duracao">
                  {servico.duracao} minutos
                </p>

                <strong>
                  {servico.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </strong>

              </div>

              <button onClick={() => abrirWhatsApp(servico)}>
                Tenho interesse
              </button>

            </article>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Publico

