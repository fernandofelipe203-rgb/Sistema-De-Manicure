package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.model.Servico;
import com.ProjetoManicure.Manicure.service.ProfissionalService;
import com.ProjetoManicure.Manicure.service.ServicoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicos")
@CrossOrigin(origins = "*")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;
    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping
    public List<Servico> listar(HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        return servicoService.listarPorProfissional(profissionalId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(
            @PathVariable int id,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Servico servico =
                servicoService.buscarPorId(id, profissionalId);

        if (servico == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(servico);
    }

    @PostMapping
    public ResponseEntity<Servico> cadastrar(
            @Valid @RequestBody Servico servico,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Profissional profissional =
                profissionalService.buscarPorId(profissionalId);

        servico.setProfissional(profissional);

        return ResponseEntity.ok(
                servicoService.cadastrar(servico)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(
            @PathVariable int id,
            @Valid @RequestBody Servico dados,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Servico servicoAtualizado =
                servicoService.atualizar(
                        id,
                        profissionalId,
                        dados
                );

        if (servicoAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(servicoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable int id,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        boolean excluido =
                servicoService.excluir(id, profissionalId);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

}
