import { useState } from 'react'
import './App.css'

import Layout from './components/Layout'

import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Servicos from './pages/Servicos'
import Agenda from './pages/Agenda'
import Financeiro from './pages/Financeiro'
import Perfil from './pages/Perfil'
import Publico from './pages/Publico'


function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)
  const [pagina, setPagina] = useState('dashboard')
  const [erroLogin, setErroLogin] = useState('')

  const caminho = window.location.pathname

  if (caminho.startsWith('/publico/')) {
    return <Publico />
  }

  async function handleLogin(event) {
    event.preventDefault()
    setErroLogin('')


    try {
      const resposta = await fetch('http://192.168.1.5:8080/auth/login', {
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
        setErroLogin('E-mail ou senha inválidos.')
        return
      }

      const token = await resposta.text()

      localStorage.setItem('token', token)
      setLogado(true)

      console.log('Login realizado!')
      console.log('Token:', token)

    } catch (erro) {
      setErroLogin('Não foi possível realizar o login.')
  }
}

  function renderizarPagina() {
    if (pagina === 'clientes') {
      return <Clientes />
    }

    if (pagina === 'servicos') {
      return <Servicos />
    }

    if (pagina === 'agenda') {
      return <Agenda />
    }
    if (pagina === 'financeiro') {
      return <Financeiro />
    }
    if (pagina === 'perfil') {
      return <Perfil />
    }


    return <Dashboard setPagina={setPagina} />
  }

  if (logado) {
    return (
      <Layout
        pagina={pagina}
        setPagina={setPagina}
      >
        {renderizarPagina()}
      </Layout>
    )
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
          {erroLogin && (
            <p className="erro-login">
              {erroLogin}
            </p>
          )}

        </form>

      </div>
    </main>
  )
}


export default App

