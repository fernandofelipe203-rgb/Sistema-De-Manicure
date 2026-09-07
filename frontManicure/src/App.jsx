import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)

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
  return (
    <main className="dashboard">

      <aside className="menu">
        <div className="logo">
          ✿ Manicure
        </div>

        <nav>
          <button>Início</button>
          <button>Clientes</button>
          <button>Agenda</button>
          <button>Serviços</button>
          <button>Financeiro</button>
        </nav>

        <button className="sair" onClick={() => {
          localStorage.removeItem('token')
          setLogado(false)
        }}>
          Sair
        </button>
      </aside>

      <section className="conteudo">

        <header className="topo">
          <div>
            <h1>Olá! ✨</h1>
            <p>Tenha um ótimo dia de trabalho.</p>
          </div>

          <div className="perfil">
            ♡
          </div>
        </header>

        <section className="cards">

          <div className="card">
            <span>Clientes</span>
            <strong>24</strong>
            <small>cadastrados</small>
          </div>

          <div className="card">
            <span>Agendamentos</span>
            <strong>6</strong>
            <small>hoje</small>
          </div>

          <div className="card">
            <span>Serviços</span>
            <strong>8</strong>
            <small>cadastrados</small>
          </div>

        </section>

        <section className="proximos">

          <div className="secao-titulo">
            <h2>Próximos atendimentos</h2>
            <button>Ver agenda</button>
          </div>

          <div className="atendimento">
            <div>
              <strong>Maria Silva</strong>
              <span>Manicure + esmaltação</span>
            </div>

            <time>14:00</time>
          </div>

          <div className="atendimento">
            <div>
              <strong>Ana Paula</strong>
              <span>Alongamento de unhas</span>
            </div>

            <time>15:30</time>
          </div>

          <div className="atendimento">
            <div>
              <strong>Juliana</strong>
              <span>Banho de gel</span>
            </div>

            <time>17:00</time>
          </div>

        </section>

      </section>

    </main>
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


        </form>

      </div>
    </main>
  )
}

export default App