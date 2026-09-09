package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.service.FinanceiroService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/financeiro")
@CrossOrigin(origins = "*")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    @GetMapping
    public List<Agendamento> listarReceitas(
            HttpServletRequest request) {

        int profissionalId =
                (int) request.getAttribute("id");

        return financeiroService
                .listarReceitas(profissionalId);
    }

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
}