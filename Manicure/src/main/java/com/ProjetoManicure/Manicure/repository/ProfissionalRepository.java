package com.ProjetoManicure.Manicure.repository;

import com.ProjetoManicure.Manicure.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRepository  extends JpaRepository <Profissional, Integer> {
}
