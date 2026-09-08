package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AgendamentoRepository
        extends JpaRepository<Agendamento, Integer> {

    List<Agendamento> findByProfissionalId(int profissionalId);

    Optional<Agendamento> findByIdAndProfissionalId(
            int id,
            int profissionalId
    );

    boolean existsByProfissionalIdAndDataHora(
            int profissionalId,
            LocalDateTime dataHora
    );
}