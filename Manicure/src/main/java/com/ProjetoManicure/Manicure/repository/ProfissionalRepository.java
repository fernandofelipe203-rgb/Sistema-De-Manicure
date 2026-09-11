package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfissionalRepository  extends JpaRepository <Profissional, Integer> {
    Optional<Profissional> findByEmail(String email);
    boolean existsByEmailAndIdNot(String email, int id);
    Optional<Profissional> findByLinkPublico(String linkPublico);
    boolean existsByLinkPublicoAndIdNot(String linkPublico, int id);
}
