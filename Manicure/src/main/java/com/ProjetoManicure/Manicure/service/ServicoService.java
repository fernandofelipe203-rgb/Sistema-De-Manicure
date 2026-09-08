package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Servico;
import com.ProjetoManicure.Manicure.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {
    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> listarPorProfissional(int profissionalId) {
        return servicoRepository.findByProfissionalId(profissionalId);
    }

    public Servico buscarPorId(int id, int profissionalId) {

        return servicoRepository
                .findByIdAndProfissionalId(id, profissionalId)
                .orElse(null);
    }

    public Servico cadastrar(Servico servico) {
        return servicoRepository.save(servico);
    }

    public Servico atualizar(int id, int profissionalId, Servico dados) {

        Servico servico =
                servicoRepository
                        .findByIdAndProfissionalId(id, profissionalId)
                        .orElse(null);

        if (servico == null) {
            return null;
        }

        servico.setNome(dados.getNome());
        servico.setPreco(dados.getPreco());
        servico.setDuracao(dados.getDuracao());

        return servicoRepository.save(servico);
    }

    public boolean excluir(int id, int profissionalId) {

        Servico servico =
                servicoRepository
                        .findByIdAndProfissionalId(id, profissionalId)
                        .orElse(null);

        if (servico == null) {
            return false;
        }

        servicoRepository.delete(servico);
        return true;
    }
}
