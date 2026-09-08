package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.exception.ClienteDuplicadoException;
import com.ProjetoManicure.Manicure.exception.ClienteNaoEncontradoException;
import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.repository.ClienteRepository;
import com.ProjetoManicure.Manicure.repository.ProfissionalRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ProfissionalRepository profissionalRepository;
    @Autowired
    private JwtService jwtService;

    public List<Cliente> listar(String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        return clienteRepository.findByProfissionalId(profissionalId);
    }

    public Cliente buscarPorId(int id, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        return clienteRepository
                .findById(id)
                .filter(cliente -> cliente.getProfissional().getId() == profissionalId)
                .orElseThrow(ClienteNaoEncontradoException::new);
    }

    public Cliente cadastrar(Cliente cliente, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Profissional profissional = profissionalRepository
                .findById(profissionalId)
                .orElseThrow();

        cliente.setProfissional(profissional);

        if (clienteRepository.existsByProfissionalIdAndTelefone(
                profissionalId,
                cliente.getTelefone())) {

            throw new ClienteDuplicadoException(
                    "Já existe uma cliente cadastrada com este telefone."
            );
        }

        if (clienteRepository.existsByProfissionalIdAndEmail(
                profissionalId,
                cliente.getEmail())) {

            throw new ClienteDuplicadoException(
                    "Já existe uma cliente cadastrada com este e-mail."
            );
        }

        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(int id, Cliente dados, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Cliente cliente = clienteRepository
                .findById(id)
                .filter(c -> c.getProfissional().getId() == profissionalId)
                .orElse(null);

        if (cliente == null) {
            return null;
        }

        if (clienteRepository.existsByProfissionalIdAndTelefoneAndIdNot(
                profissionalId,
                dados.getTelefone(),
                id)) {

            throw new ClienteDuplicadoException(
                    "Já existe uma cliente cadastrada com este telefone."
            );
        }

        if (clienteRepository.existsByProfissionalIdAndEmailAndIdNot(
                profissionalId,
                dados.getEmail(),
                id)) {

            throw new ClienteDuplicadoException(
                    "Já existe uma cliente cadastrada com este e-mail."
            );
        }

        cliente.setNome(dados.getNome());
        cliente.setTelefone(dados.getTelefone());
        cliente.setEmail(dados.getEmail());

        return clienteRepository.save(cliente);
    }

    public boolean excluir(int id, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Cliente cliente = clienteRepository
                .findById(id)
                .filter(c -> c.getProfissional().getId() == profissionalId)
                .orElse(null);

        if (cliente == null) {
            return false;
        }

        clienteRepository.delete(cliente);
        return true;
    }
}
