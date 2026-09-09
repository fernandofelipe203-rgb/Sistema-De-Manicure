package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository <Cliente ,Integer> {

    Optional<Profissional> findByEmail(String email);
    List<Cliente> findByProfissionalId(int profissionalId);
    Optional<Cliente> findByIdAndProfissionalId(
            int id,
            int profissionalId
    );
    boolean existsByProfissionalIdAndTelefone(int profissionalId, String telefone);

    boolean existsByProfissionalIdAndEmail(int profissionalId, String email);

    boolean existsByProfissionalIdAndTelefoneAndIdNot(
            int profissionalId,
            String telefone,
            int id
    );

    boolean existsByProfissionalIdAndEmailAndIdNot(
            int profissionalId,
            String email,
            int id
    );

}
