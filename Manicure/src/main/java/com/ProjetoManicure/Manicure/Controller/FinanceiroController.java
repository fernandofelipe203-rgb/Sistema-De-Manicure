package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.dto.ResumoFinanceiroDTO;
import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.service.FinanceiroService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/financeiro")
@CrossOrigin(origins = "*")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    // =========================
    // TODAS AS RECEITAS
    // =========================

    @GetMapping
    public List<Agendamento> listarReceitas(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        return financeiroService
                .listarReceitas(profissionalId);
    }

    // =========================
    // TOTAL GERAL
    // =========================

    @GetMapping("/total")
    public Map<String, Double> calcularTotal(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Double total =
                financeiroService
                        .calcularTotal(profissionalId);

        Map<String, Double> resposta =
                new HashMap<>();

        resposta.put("total", total);

        return resposta;
    }

    // =========================
    // TOTAL DE HOJE
    // =========================

    @GetMapping("/hoje")
    public Map<String, Double> calcularTotalHoje(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Double total =
                financeiroService
                        .calcularTotalHoje(profissionalId);

        Map<String, Double> resposta =
                new HashMap<>();

        resposta.put("total", total);

        return resposta;
    }

    // =========================
    // TOTAL DA SEMANA
    // =========================

    @GetMapping("/semana")
    public Map<String, Double> calcularTotalSemana(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Double total =
                financeiroService
                        .calcularTotalSemana(profissionalId);

        Map<String, Double> resposta =
                new HashMap<>();

        resposta.put("total", total);

        return resposta;
    }

    // =========================
    // TOTAL DO MÊS
    // =========================

    @GetMapping("/mes")
    public Map<String, Double> calcularTotalMes(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        Double total =
                financeiroService
                        .calcularTotalMes(profissionalId);

        Map<String, Double> resposta =
                new HashMap<>();

        resposta.put("total", total);

        return resposta;
    }
    @GetMapping("/periodo")
    public List<Agendamento> listarReceitasPorPeriodo(
            @RequestParam LocalDate inicio,
            @RequestParam LocalDate fim,
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        return financeiroService
                .listarReceitasPorPeriodo(
                        profissionalId,
                        inicio,
                        fim
                );
    }
    @GetMapping("/resumo-periodo")
    public ResponseEntity<ResumoFinanceiroDTO> resumoPorPeriodo(
            @RequestHeader("Authorization") String token,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate dataInicio,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate dataFim) {

        return ResponseEntity.ok(
                financeiroService.resumoPorPeriodo(
                        token,
                        dataInicio,
                        dataFim
                )
        );
    }
}
