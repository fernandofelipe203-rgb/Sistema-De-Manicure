package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinanceiroRepository extends JpaRepository<Agendamento, Integer> {

    List<Agendamento> findByProfissionalIdAndStatus(
            int profissionalId,
            String status
    );
}