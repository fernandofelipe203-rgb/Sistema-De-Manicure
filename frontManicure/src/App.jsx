import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)
  const [pagina, setPagina] = useState('dashboard')

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const resposta = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      })

      if (!resposta.ok) {
        throw new Error('E-mail ou senha inválidos')
      }

      const token = await resposta.text()

      localStorage.setItem('token', token)
      setLogado(true)

      console.log('Login realizado!')
      console.log('Token:', token)

    } catch (erro) {
      console.error(erro.message)
    }
  }

  if (logado) {
   if (pagina === 'clientes') {
     return <Clientes setPagina={setPagina} />
   }

    return <Dashboard setPagina={setPagina} />
  }

  return (
    <main className="login-container">
      <div className="login-card">

        <h1>Bem-vinda!</h1>
        <p>Entre para acessar seu sistema</p>

        <form onSubmit={handleLogin}>

          <div className="campo">
            <label>E-mail</label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="campo">
            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>
    </main>
  )
}

export default App