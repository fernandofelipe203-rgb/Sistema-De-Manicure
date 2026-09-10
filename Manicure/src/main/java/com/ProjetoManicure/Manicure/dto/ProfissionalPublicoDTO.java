package com.ProjetoManicure.Manicure.dto;

import java.util.List;

public class ProfissionalPublicoDTO {

    private String nome;
    private String telefone;
    private List<ServicoPublicoDTO> servicos;

    public ProfissionalPublicoDTO(
            String nome,
            String telefone,
            List<ServicoPublicoDTO> servicos) {

        this.nome = nome;
        this.telefone = telefone;
        this.servicos = servicos;
    }

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public List<ServicoPublicoDTO> getServicos() {
        return servicos;
    }
}