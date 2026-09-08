const API_URL = 'http://localhost:8080'

export async function buscarClientes() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/clientes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    throw new Error('Erro ao buscar clientes')
  }

  return await resposta.json()
}