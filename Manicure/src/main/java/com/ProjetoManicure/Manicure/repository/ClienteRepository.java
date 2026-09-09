package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    List<Cliente> findByProfissionais_Id(int profissionalId);
    Optional<Cliente> findByTelefone(String telefone);
    Optional<Cliente> findByIdAndProfissionais_Id(
            int id,
            int profissionalId
    );

    boolean existsByProfissionais_IdAndTelefone(
            int profissionalId,
            String telefone
    );

    boolean existsByProfissionais_IdAndEmail(
            int profissionalId,
            String email
    );

    boolean existsByProfissionais_IdAndTelefoneAndIdNot(
            int profissionalId,
            String telefone,
            int id
    );

    boolean existsByProfissionais_IdAndEmailAndIdNot(
            int profissionalId,
            String email,
            int id
    );
}