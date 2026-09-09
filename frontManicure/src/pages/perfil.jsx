import { useEffect, useState } from 'react'
import { buscarMeuPerfil } from '../services/api'

function Perfil() {

  const [perfil, setPerfil] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagemSenha, setMensagemSenha] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const [alterandoSenha, setAlterandoSenha] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

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
async function handleAlterarSenha(event) {
  event.preventDefault()

  setMensagemSenha('')
  setErroSenha('')

  if (novaSenha !== confirmarSenha) {
    setErroSenha('A nova senha e a confirmação não são iguais.')
    return
  }

  if (novaSenha.length < 6) {
    setErroSenha('A nova senha deve ter pelo menos 6 caracteres.')
    return
  }

  try {
    setAlterandoSenha(true)

    const token = localStorage.getItem('token')

    const resposta = await fetch(
      'http://192.168.1.5:8080/profissionais/me/senha',
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha
        })
      }
    )

    const mensagem = await resposta.text()

    if (!resposta.ok) {
      throw new Error(mensagem || 'Erro ao alterar senha')
    }

    setMensagemSenha('Senha alterada com sucesso!')

    setSenhaAtual('')
    setNovaSenha('')
    setConfirmarSenha('')

  } catch (erro) {
    setErroSenha(erro.message)
  } finally {
    setAlterandoSenha(false)
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
    <div className="card-seguranca">

      <div className="seguranca-cabecalho">
        <h2>Segurança da conta</h2>
        <p>Altere sua senha para manter sua conta protegida.</p>
      </div>

      <form onSubmit={handleAlterarSenha}>

       <div className="campo-senha">
         <label>Senha atual</label>

         <div className="campo-senha-wrapper">
           <input
             type={mostrarSenha ? 'text' : 'password'}
             value={senhaAtual}
             onChange={(e) => setSenhaAtual(e.target.value)}
             placeholder="Digite sua senha atual"
             required
           />

           <button
             type="button"
             className="botao-olho"
             onClick={() => setMostrarSenha(!mostrarSenha)}
           >
             {mostrarSenha ? '🙈' : '👁️'}
           </button>
         </div>
       </div>

        <div className="campo-senha">
          <label>Nova senha</label>

          <div className="campo-senha-wrapper">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite sua nova senha"
              required
            />

            <button
              type="button"
              className="botao-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="campo-senha">
          <label>Confirmar nova senha</label>

          <div className="campo-senha-wrapper">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite novamente sua nova senha"
              required
            />

            <button
              type="button"
              className="botao-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {mensagemSenha && (
          <p className="mensagem-sucesso">
            {mensagemSenha}
          </p>
        )}

        {erroSenha && (
          <p className="mensagem-erro">
            {erroSenha}
          </p>
        )}

        <button
          type="submit"
          className="botao-senha"
          disabled={alterandoSenha}
        >
          {alterandoSenha ? 'Alterando...' : 'Alterar senha'}
        </button>

      </form>

    </div>
    </div>
  )
}

export default Perfil