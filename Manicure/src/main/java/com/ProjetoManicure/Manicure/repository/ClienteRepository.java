package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository <Cliente ,Integer> {

    Optional<Profissional> findByEmail(String email);
    List<Cliente> findByProfissionalId(int profissionalId);

}
