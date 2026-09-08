package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.service.ProfissionalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profissionais")
@CrossOrigin(origins = "*")
public class ProfissionalController {

    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping
    public List<Profissional> listar() {
        return profissionalService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profissional> buscarPorId(@PathVariable int id) {

        Profissional profissional = profissionalService.buscarPorId(id);

        if (profissional == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissional);
    }

    @PostMapping
    public ResponseEntity<Profissional> cadastrar(
            @Valid @RequestBody Profissional profissional) {

        Profissional profissionalSalvo =
                profissionalService.cadastrar(profissional);

        return ResponseEntity.ok(profissionalSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profissional> atualizar(
            @PathVariable int id,
            @Valid @RequestBody Profissional dados) {

        Profissional profissionalAtualizado =
                profissionalService.atualizar(id, dados);

        if (profissionalAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissionalAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable int id) {

        boolean excluido = profissionalService.excluir(id);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}