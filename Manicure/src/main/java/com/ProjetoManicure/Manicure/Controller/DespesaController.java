package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Despesa;
import com.ProjetoManicure.Manicure.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    @GetMapping
    public ResponseEntity<List<Despesa>> listar(
            @RequestHeader("Authorization") String token) {

        return ResponseEntity.ok(
                despesaService.listar(token)
        );
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<Despesa>> listarPorPeriodo(
            @RequestHeader("Authorization") String token,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate dataInicio,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate dataFim) {

        return ResponseEntity.ok(
                despesaService.listarPorPeriodo(
                        token,
                        dataInicio,
                        dataFim
                )
        );
    }

    @PostMapping
    public ResponseEntity<Despesa> cadastrar(
            @RequestHeader("Authorization") String token,
            @RequestBody Despesa dados) {

        return ResponseEntity.ok(
                despesaService.cadastrar(
                        dados,
                        token
                )
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(
            @PathVariable int id,
            @RequestHeader("Authorization") String token,
            @RequestBody Despesa dados) {

        Despesa despesaAtualizada =
                despesaService.atualizar(
                        id,
                        dados,
                        token
                );

        if (despesaAtualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(despesaAtualizada);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable int id,
            @RequestHeader("Authorization") String token) {

        boolean excluida =
                despesaService.excluir(id, token);

        if (!excluida) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}