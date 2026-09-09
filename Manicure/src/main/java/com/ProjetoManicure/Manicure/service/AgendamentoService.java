package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.model.Servico;
import com.ProjetoManicure.Manicure.repository.AgendamentoRepository;
import com.ProjetoManicure.Manicure.repository.ClienteRepository;
import com.ProjetoManicure.Manicure.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    public List<Agendamento> listarPorProfissional(int profissionalId) {
        return agendamentoRepository.findByProfissionalId(profissionalId);
    }

    public Agendamento buscarPorId(int id, int profissionalId) {

        return agendamentoRepository
                .findByIdAndProfissionalId(id, profissionalId)
                .orElse(null);
    }

    public Agendamento cadastrar(Agendamento agendamento) {

        int profissionalId =
                agendamento.getProfissional().getId();

        int servicoId =
                agendamento.getServico().getId();

        // Verifica se o serviço pertence ao profissional
        Servico servico =
                servicoRepository
                        .findByIdAndProfissionalId(
                                servicoId,
                                profissionalId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Serviço não pertence a este profissional."
                                )
                        );

        // Garante que o serviço pertence à profissional
        agendamento.setServico(servico);
        // Guarda o preço do serviço no momento do agendamento
        agendamento.setValor(servico.getPreco());
        // Verifica conflito de horário
        boolean horarioOcupado =
                agendamentoRepository
                        .existsByProfissionalIdAndDataHora(
                                profissionalId,
                                agendamento.getDataHora()
                        );

        if (horarioOcupado) {
            throw new IllegalArgumentException(
                    "Já existe um agendamento neste horário."
            );
        }

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizar(
            int id,
            int profissionalId,
            Agendamento dados) {

        Agendamento agendamento =
                agendamentoRepository
                        .findByIdAndProfissionalId(id, profissionalId)
                        .orElse(null);

        if (agendamento == null) {
            return null;
        }

        // Verifica se o serviço pertence ao profissional
        Servico servico =
                servicoRepository
                        .findByIdAndProfissionalId(
                                dados.getServico().getId(),
                                profissionalId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Serviço não pertence a este profissional."
                                )
                        );

        // Verifica conflito de horário
        boolean horarioOcupado =
                agendamentoRepository
                        .existsByProfissionalIdAndDataHora(
                                profissionalId,
                                dados.getDataHora()
                        );

        if (horarioOcupado &&
                !agendamento.getDataHora()
                        .equals(dados.getDataHora())) {

            throw new IllegalArgumentException(
                    "Já existe um agendamento neste horário."
            );
        }

        agendamento.setDataHora(dados.getDataHora());
        agendamento.setCliente(dados.getCliente());
        agendamento.setServico(servico);
        agendamento.setValor(servico.getPreco());
        agendamento.setStatus(dados.getStatus());

        return agendamentoRepository.save(agendamento);
    }

    public boolean excluir(int id, int profissionalId) {

        Agendamento agendamento =
                agendamentoRepository
                        .findByIdAndProfissionalId(id, profissionalId)
                        .orElse(null);

        if (agendamento == null) {
            return false;
        }

        agendamentoRepository.delete(agendamento);
        return true;
    }
}