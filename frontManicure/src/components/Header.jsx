import { useEffect, useState } from 'react'
import { buscarMeuPerfil } from '../services/api'

function Header() {

  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    carregarPerfil()
  }, [])

  async function carregarPerfil() {
    try {
      const dados = await buscarMeuPerfil()
      setPerfil(dados)
    } catch (erro) {
      console.error(erro)
    }
  }

  return (
    <header className="topo">

      <div>
        <h1>
          Olá, {perfil ? perfil.nome : 'profissional'}! ✨
        </h1>

        <p>
          Tenha um ótimo dia de trabalho.
        </p>
      </div>

      <div className="perfil">
        {perfil?.foto ? (
          <img
            src={`http://192.168.1.5:8080${perfil.foto}`}
            alt={`Foto de ${perfil.nome}`}
          />
        ) : (
          perfil
            ? perfil.nome.charAt(0).toUpperCase()
            : '♡'
        )}
      </div>

    </header>
  )
}

export default Header