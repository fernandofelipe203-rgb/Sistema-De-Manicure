package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServicoRepository extends JpaRepository<Servico, Integer> {

    List<Servico> findByProfissionalId(int profissionalId);
    Optional<Servico> findByIdAndProfissionalId(int id, int profissionalId);

}