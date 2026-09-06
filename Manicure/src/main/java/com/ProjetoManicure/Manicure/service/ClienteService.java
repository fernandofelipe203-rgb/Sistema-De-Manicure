package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(int id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public Cliente cadastrar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(int id, Cliente dados) {

        Cliente cliente = clienteRepository.findById(id).orElse(null);

        if (cliente == null) {
            return null;
        }

        cliente.setNome(dados.getNome());
        cliente.setTelefone(dados.getTelefone());
        cliente.setEmail(dados.getEmail());

        return clienteRepository.save(cliente);
    }

    public boolean excluir(int id) {

        if (!clienteRepository.existsById(id)) {
            return false;
        }

        clienteRepository.deleteById(id);
        return true;
    }
}
