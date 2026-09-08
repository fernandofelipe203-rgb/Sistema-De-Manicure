package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.service.AgendamentoService;
import com.ProjetoManicure.Manicure.service.ProfissionalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping
    public List<Agendamento> listar(HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        return agendamentoService
                .listarPorProfissional(profissionalId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(
            @PathVariable int id,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Agendamento agendamento =
                agendamentoService
                        .buscarPorId(id, profissionalId);

        if (agendamento == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(agendamento);
    }

    @PostMapping
    public ResponseEntity<Agendamento> cadastrar(
            @Valid @RequestBody Agendamento agendamento,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        System.out.println("PROFISSIONAL ID: " + profissionalId);

        Profissional profissional =
                profissionalService.buscarPorId(profissionalId);

        System.out.println("PROFISSIONAL: " + profissional);

        agendamento.setProfissional(profissional);

        return ResponseEntity.ok(
                agendamentoService.cadastrar(agendamento)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(
            @PathVariable int id,
            @Valid @RequestBody Agendamento dados,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Agendamento agendamentoAtualizado =
                agendamentoService.atualizar(
                        id,
                        profissionalId,
                        dados
                );

        if (agendamentoAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(agendamentoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable int id,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        boolean excluido =
                agendamentoService.excluir(
                        id,
                        profissionalId
                );

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}