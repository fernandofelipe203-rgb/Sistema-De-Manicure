package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.repository.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    public List<Agendamento> listarReceitas(int profissionalId) {

        return financeiroRepository
                .findByProfissionalIdAndStatus(
                        profissionalId,
                        "CONCLUIDO"
                );
    }

    public Double calcularTotal(int profissionalId) {

        List<Agendamento> agendamentos =
                listarReceitas(profissionalId);

        return agendamentos.stream()
                .mapToDouble(agendamento ->
                        agendamento.getValor() != null
                                ? agendamento.getValor()
                                : 0.0
                )
                .sum();
    }
}