package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FinanceiroRepository
        extends JpaRepository<Agendamento, Integer> {

    List<Agendamento> findByProfissionalIdAndStatus(
            int profissionalId,
            String status
    );

    List<Agendamento> findByProfissionalIdAndStatusAndDataHoraBetween(
            int profissionalId,
            String status,
            LocalDateTime inicio,
            LocalDateTime fim
    );
}