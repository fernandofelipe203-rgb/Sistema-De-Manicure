package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfissionalService {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    public List<Profissional> listar() {
        return profissionalRepository.findAll();
    }

    public Profissional buscarPorId(int id) {
        return profissionalRepository.findById(id).orElse(null);
    }

    public Profissional cadastrar(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }

    public Profissional atualizar(int id, Profissional dados) {

        Profissional profissional = profissionalRepository.findById(id).orElse(null);

        if (profissional == null) {
            return null;
        }

        profissional.setNome(dados.getNome());
        profissional.setEmail(dados.getEmail());
        profissional.setSenha(dados.getSenha());
        profissional.setPerfil(dados.getPerfil());

        return profissionalRepository.save(profissional);
    }

    public boolean excluir(int id) {

        if (!profissionalRepository.existsById(id)) {
            return false;
        }

        profissionalRepository.deleteById(id);
        return true;
    }
}
