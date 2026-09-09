package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Agendamento;
import com.ProjetoManicure.Manicure.model.Cliente;
import com.ProjetoManicure.Manicure.model.Servico;
import com.ProjetoManicure.Manicure.repository.AgendamentoRepository;
import com.ProjetoManicure.Manicure.repository.ClienteRepository;
import com.ProjetoManicure.Manicure.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        if (agendamento.getDataHora().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Não é permitido criar agendamento em data ou horário passado."
            );
        }

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

// Verifica se o cliente pertence ao profissional
        int clienteId =
                agendamento.getCliente().getId();

        Cliente cliente =
                clienteRepository
                        .findByIdAndProfissionalId(
                                clienteId,
                                profissionalId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Cliente não pertence a este profissional."
                                )
                        );

        agendamento.setCliente(cliente);

// Guarda o preço do serviço no momento do agendamento
        agendamento.setServico (servico);
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
        if (dados.getDataHora().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Não é permitido alterar o agendamento para uma data ou horário passado."
            );
        }
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

// Verifica se o cliente pertence ao profissional
        int clienteId =
                dados.getCliente().getId();

        Cliente cliente =
                clienteRepository
                        .findByIdAndProfissionalId(
                                clienteId,
                                profissionalId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Cliente não pertence a este profissional."
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
        agendamento.setCliente(cliente);
        agendamento.setServico(servico);

        String statusAtual = agendamento.getStatus();
        String novoStatus = dados.getStatus();

        agendamento.setStatus(novoStatus);

        if (!"CONCLUIDO".equals(statusAtual)
                && "CONCLUIDO".equals(novoStatus)) {

            agendamento.setValor(servico.getPreco());
        }

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