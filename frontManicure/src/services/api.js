const API_URL = 'http://192.168.1.5:8080'

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


export async function cadastrarCliente(cliente) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao cadastrar cliente')
  }

  return await resposta.json()
}
export async function atualizarCliente(id, cliente) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })

 if (!resposta.ok) {
   const mensagem = await resposta.text()
   throw new Error(mensagem || 'Erro ao atualizar cliente')
 }

  return await resposta.json()
}
export async function excluirCliente(id) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    throw new Error('Erro ao excluir cliente')
  }
}

