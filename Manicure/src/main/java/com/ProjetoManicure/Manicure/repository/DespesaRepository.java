package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {

    List<Despesa> findByProfissional_Id(int profissionalId);

    List<Despesa> findByProfissional_IdAndDataBetween(
            int profissionalId,
            LocalDate dataInicio,
            LocalDate dataFim
    );
}