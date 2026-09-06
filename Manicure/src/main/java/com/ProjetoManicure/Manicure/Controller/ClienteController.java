package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listar(
            @RequestHeader("Authorization") String token) {

        return clienteService.listar(token);
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(
            @PathVariable int id,
            @RequestHeader("Authorization") String token) {

        Cliente cliente = clienteService.buscarPorId(id, token);

        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cliente);
    }

    // Cadastrar cliente
    @PostMapping
    public ResponseEntity<Cliente> cadastrar(
            @Valid @RequestBody Cliente cliente,
            @RequestHeader("Authorization") String token) {

        Cliente clienteSalvo = clienteService.cadastrar(cliente, token);

        return ResponseEntity.ok(clienteSalvo);
    }

    // Atualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(
            @PathVariable int id,
            @RequestBody Cliente dados,
            @RequestHeader("Authorization") String token) {

        Cliente clienteAtualizado = clienteService.atualizar(id, dados, token);



        return ResponseEntity.ok(clienteAtualizado);
    }

    // Excluir cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable int id,
            @RequestHeader("Authorization") String token) {

        boolean excluido = clienteService.excluir(id, token);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
