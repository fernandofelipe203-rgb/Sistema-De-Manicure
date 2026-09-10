package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.model.Despesa;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.repository.DespesaRepository;
import com.ProjetoManicure.Manicure.repository.ProfissionalRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private JwtService jwtService;

    public List<Despesa> listar(String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        return despesaRepository
                .findByProfissional_Id(profissionalId);
    }

    public List<Despesa> listarPorPeriodo(
            String token,
            LocalDate dataInicio,
            LocalDate dataFim) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        return despesaRepository
                .findByProfissional_IdAndDataBetween(
                        profissionalId,
                        dataInicio,
                        dataFim
                );
    }

    public Despesa cadastrar(
            Despesa dados,
            String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        Profissional profissional =
                profissionalRepository
                        .findById(profissionalId)
                        .orElseThrow();

        dados.setProfissional(profissional);

        return despesaRepository.save(dados);
    }
    public Despesa atualizar(
            int id,
            Despesa dados,
            String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        Despesa despesa = despesaRepository
                .findById(id)
                .filter(d ->
                        d.getProfissional().getId()
                                == profissionalId
                )
                .orElse(null);

        if (despesa == null) {
            return null;
        }

        despesa.setDescricao(dados.getDescricao());
        despesa.setCategoria(dados.getCategoria());
        despesa.setValor(dados.getValor());
        despesa.setData(dados.getData());

        return despesaRepository.save(despesa);
    }
    public boolean excluir(int id, String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId =
                claims.get("id", Integer.class);

        Despesa despesa = despesaRepository
                .findById(id)
                .filter(d ->
                        d.getProfissional().getId()
                                == profissionalId
                )
                .orElse(null);

        if (despesa == null) {
            return false;
        }

        despesaRepository.delete(despesa);

        return true;
    }
}