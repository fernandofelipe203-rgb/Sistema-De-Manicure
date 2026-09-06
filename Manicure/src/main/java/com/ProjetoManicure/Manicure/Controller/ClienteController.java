package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.service.ClienteService;
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
    public ResponseEntity<Cliente> buscarPorId(@PathVariable int id) {

        Cliente cliente = clienteService.buscarPorId(id);

        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cliente);
    }

    // Cadastrar cliente
    @PostMapping
    public ResponseEntity<Cliente> cadastrar(
            @RequestBody Cliente cliente,
            @RequestHeader("Authorization") String token) {

        Cliente clienteSalvo = clienteService.cadastrar(cliente, token);

        return ResponseEntity.ok(clienteSalvo);
    }

    // Atualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(
            @PathVariable int id,
            @RequestBody Cliente dados) {

        Cliente clienteAtualizado = clienteService.atualizar(id, dados);

        if (clienteAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clienteAtualizado);
    }

    // Excluir cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable int id) {

        boolean excluido = clienteService.excluir(id);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
