import { useEffect, useState } from 'react'
import { buscarMeuPerfil } from '../services/api'

function Perfil() {

  const [perfil, setPerfil] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarPerfil()
  }, [])

  async function carregarPerfil() {
    try {
      const dados = await buscarMeuPerfil()
      setPerfil(dados)
    } catch (erro) {
      console.error(erro)
    } finally {
      setCarregando(false)
    }
  }

  if (carregando) {
    return (
      <div className="pagina">
        <h1>Meu perfil</h1>
        <p>Carregando informações...</p>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="pagina">
        <h1>Meu perfil</h1>
        <p>Não foi possível carregar seu perfil.</p>
      </div>
    )
  }

  return (
    <div className="pagina">

      <div className="pagina-cabecalho">
        <div>
          <h1>Meu perfil</h1>
          <p>Visualize suas informações</p>
        </div>
      </div>

      <div className="card-perfil">

        <div className="perfil-avatar">
          {perfil.nome.charAt(0).toUpperCase()}
        </div>

        <h2>{perfil.nome}</h2>
        <span>{perfil.perfil}</span>

        <div className="perfil-informacoes">

          <div>
            <label>Nome</label>
            <p>{perfil.nome}</p>
          </div>

          <div>
            <label>E-mail</label>
            <p>{perfil.email}</p>
          </div>

          <div>
            <label>Telefone</label>
            <p>{perfil.telefone}</p>
          </div>

          <div>
            <label>Perfil</label>
            <p>{perfil.perfil}</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Perfil