const API_URL = 'http://192.168.1.5:8080'


// =========================
// CLIENTES
// =========================

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


// =========================
// SERVIÇOS
// =========================

export async function buscarServicos() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/servicos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar serviços')
  }

  return await resposta.json()
}


export async function cadastrarServico(servico) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/servicos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(servico)
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao cadastrar serviço')
  }

  return await resposta.json()
}


export async function atualizarServico(id, servico) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/servicos/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(servico)
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao atualizar serviço')
  }

  return await resposta.json()
}


export async function excluirServico(id) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/servicos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao excluir serviço')
  }

}
// =========================
// AGENDAMENTOS
// =========================

export async function buscarAgendamentos() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/agendamentos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar agendamentos')
  }

  return await resposta.json()
}


export async function cadastrarAgendamento(agendamento) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agendamento)
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao cadastrar agendamento')
  }

  return await resposta.json()
}


export async function atualizarAgendamento(id, agendamento) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agendamento)
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao atualizar agendamento')
  }

  return await resposta.json()
}


export async function excluirAgendamento(id) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao excluir agendamento')
  }
}
// =========================
// FINANCEIRO
// =========================

export async function buscarReceitas() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/financeiro`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar receitas')
  }

  return await resposta.json()
}


export async function buscarTotalFinanceiro() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/financeiro/total`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar total financeiro')
  }

  return await resposta.json()
}
export async function buscarTotalHoje() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/financeiro/hoje`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar total de hoje')
  }

  return await resposta.json()
}


export async function buscarTotalSemana() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/financeiro/semana`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar total da semana')
  }

  return await resposta.json()
}


export async function buscarTotalMes() {
  const token = localStorage.getItem('token')

  const resposta = await fetch(`${API_URL}/financeiro/mes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(mensagem || 'Erro ao buscar total do mês')
  }

  return await resposta.json()
}
export async function buscarReceitasPorPeriodo(inicio, fim) {
  const token = localStorage.getItem('token')

  const resposta = await fetch(
    `${API_URL}/financeiro/periodo?inicio=${inicio}&fim=${fim}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  if (!resposta.ok) {
    const mensagem = await resposta.text()
    throw new Error(
      mensagem || 'Erro ao buscar receitas por período'
    )
  }

  return await resposta.json()
}