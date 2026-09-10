package com.ProjetoManicure.Manicure.dto;

public class ServicoPublicoDTO {

    private int id;
    private String nome;
    private Double preco;
    private Integer duracao;

    public ServicoPublicoDTO(
            int id,
            String nome,
            Double preco,
            Integer duracao) {

        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.duracao = duracao;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getDuracao() {
        return duracao;
    }
}