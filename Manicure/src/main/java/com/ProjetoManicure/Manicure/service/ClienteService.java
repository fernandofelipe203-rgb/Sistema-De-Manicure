
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

        return clienteRepository.findByProfissionais_Id(profissionalId);
    }

    public Cliente buscarPorId(int id, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        return clienteRepository
                .findById(id)
                .filter(cliente ->
                        cliente.getProfissionais()
                                .stream()
                                .anyMatch(profissional ->
                                        profissional.getId() == profissionalId
                                )
                )
                .orElseThrow(ClienteNaoEncontradoException::new);
    }

    public Cliente cadastrar(Cliente dados, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Profissional profissional = profissionalRepository
                .findById(profissionalId)
                .orElseThrow();

        /*
         * Verifica se a cliente já existe pelo telefone.
         */


        Cliente clienteExistente = clienteRepository
                .findByTelefone(dados.getTelefone())
                .orElse(null);





        /*
         * Se a cliente já existe...
         */
        if (clienteExistente != null) {



            boolean jaVinculada =
                    clienteExistente.getProfissionais()
                            .stream()
                            .anyMatch(p ->
                                    p.getId() == profissionalId
                            );

            if (jaVinculada) {
                throw new ClienteDuplicadoException(
                        "Esta cliente já está cadastrada para este profissional."
                );
            }

            /*
             * Adiciona o novo profissional
             * à cliente existente.
             */
            clienteExistente
                    .getProfissionais()
                    .add(profissional);

            return clienteRepository.save(clienteExistente);
        }


        dados.getProfissionais().add(profissional);

        return clienteRepository.save(dados);
    }

    public Cliente atualizar(int id, Cliente dados, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Cliente cliente = clienteRepository
                .findById(id)
                .filter(c ->
                        c.getProfissionais()
                                .stream()
                                .anyMatch(profissional ->
                                        profissional.getId() == profissionalId
                                )
                )
                .orElse(null);

        if (cliente == null) {
            return null;
        }

        if (clienteRepository
                .existsByProfissionais_IdAndTelefoneAndIdNot(
                        profissionalId,
                        dados.getTelefone(),
                        id
                )) {

            throw new ClienteDuplicadoException(
                    "Já existe uma cliente cadastrada com este telefone."
            );
        }

        if (clienteRepository
                .existsByProfissionais_IdAndEmailAndIdNot(
                        profissionalId,
                        dados.getEmail(),
                        id
                )) {

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
                .filter(c ->
                        c.getProfissionais()
                                .stream()
                                .anyMatch(profissional ->
                                        profissional.getId() == profissionalId
                                )
                )
                .orElse(null);

        if (cliente == null) {
            return false;
        }

        cliente.getProfissionais().removeIf(
                profissional -> profissional.getId() == profissionalId
        );

        if (cliente.getProfissionais().isEmpty()) {
            clienteRepository.delete(cliente);
        } else {
            clienteRepository.save(cliente);
        }

        return true;
    }
}



