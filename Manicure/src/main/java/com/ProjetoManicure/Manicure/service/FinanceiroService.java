package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.dto.ResumoFinanceiroDTO;
import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.model.Despesa;
import com.ProjetoManicure.Manicure.repository.AgendamentoRepository;
import com.ProjetoManicure.Manicure.repository.DespesaRepository;
import com.ProjetoManicure.Manicure.repository.FinanceiroRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // =========================
    // TODAS AS RECEITAS
    // =========================

    public List<Agendamento> listarReceitas(int profissionalId) {

        return financeiroRepository
                .findByProfissionalIdAndStatus(
                        profissionalId,
                        "CONCLUIDO"
                );
    }

    // =========================
    // TOTAL GERAL
    // =========================

    public Double calcularTotal(int profissionalId) {

        List<Agendamento> agendamentos =
                listarReceitas(profissionalId);

        return calcularSoma(agendamentos);
    }

    // =========================
    // RECEITAS POR PERÍODO
    // =========================

    public List<Agendamento> listarReceitasPorPeriodo(
            int profissionalId,
            LocalDate inicio,
            LocalDate fim) {

        LocalDateTime dataInicio =
                inicio.atStartOfDay();

        LocalDateTime dataFim =
                fim.atTime(LocalTime.MAX);

        return financeiroRepository
                .findByProfissionalIdAndStatusAndDataHoraBetween(
                        profissionalId,
                        "CONCLUIDO",
                        dataInicio,
                        dataFim
                );
    }

    // =========================
    // TOTAL POR PERÍODO
    // =========================

    public Double calcularTotalPorPeriodo(
            int profissionalId,
            LocalDate inicio,
            LocalDate fim) {

        List<Agendamento> agendamentos =
                listarReceitasPorPeriodo(
                        profissionalId,
                        inicio,
                        fim
                );

        return calcularSoma(agendamentos);
    }

    // =========================
    // HOJE
    // =========================

    public Double calcularTotalHoje(int profissionalId) {

        LocalDate hoje = LocalDate.now();

        return calcularTotalPorPeriodo(
                profissionalId,
                hoje,
                hoje
        );
    }

    // =========================
    // ESTA SEMANA
    // =========================

    public Double calcularTotalSemana(int profissionalId) {

        LocalDate hoje = LocalDate.now();

        LocalDate inicioSemana =
                hoje.with(DayOfWeek.MONDAY);

        LocalDate fimSemana =
                inicioSemana.plusDays(6);

        return calcularTotalPorPeriodo(
                profissionalId,
                inicioSemana,
                fimSemana
        );
    }

    // =========================
    // ESTE MÊS
    // =========================

    public Double calcularTotalMes(int profissionalId) {

        LocalDate hoje = LocalDate.now();

        LocalDate inicioMes =
                hoje.withDayOfMonth(1);

        LocalDate fimMes =
                hoje.withDayOfMonth(
                        hoje.lengthOfMonth()
                );

        return calcularTotalPorPeriodo(
                profissionalId,
                inicioMes,
                fimMes
        );
    }

    // =========================
    // SOMA DOS VALORES
    // =========================

    private Double calcularSoma(
            List<Agendamento> agendamentos) {

        return agendamentos.stream()
                .mapToDouble(agendamento ->
                        agendamento.getValor() != null
                                ? agendamento.getValor()
                                : 0.0
                )
                .sum();
    }
    public ResumoFinanceiroDTO resumoPorPeriodo(
            String token,
            LocalDate dataInicio,
            LocalDate dataFim) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        List<Agendamento> agendamentos =
                agendamentoRepository
                        .findByProfissional_IdAndDataHoraBetween(
                                profissionalId,
                                dataInicio.atStartOfDay(),
                                dataFim.atTime(23, 59, 59)
                        );

        Double recebimentos = agendamentos.stream()
                .filter(a -> "CONCLUIDO".equals(a.getStatus()))
                .mapToDouble(Agendamento::getValor)
                .sum();

        List<Despesa> despesas =
                despesaRepository
                        .findByProfissional_IdAndDataBetween(
                                profissionalId,
                                dataInicio,
                                dataFim
                        );

        Double totalDespesas = despesas.stream()
                .mapToDouble(Despesa::getValor)
                .sum();

        return new ResumoFinanceiroDTO(
                recebimentos,
                totalDespesas
        );
    }
}