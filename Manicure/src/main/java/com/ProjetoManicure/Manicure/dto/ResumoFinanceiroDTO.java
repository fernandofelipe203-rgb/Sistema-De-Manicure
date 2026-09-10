package com.ProjetoManicure.Manicure.dto;

public class ResumoFinanceiroDTO {

    private Double recebimentos;
    private Double despesas;
    private Double lucro;

    public ResumoFinanceiroDTO(
            Double recebimentos,
            Double despesas) {

        this.recebimentos = recebimentos;
        this.despesas = despesas;
        this.lucro = recebimentos - despesas;
    }

    public Double getRecebimentos() {
        return recebimentos;
    }

    public Double getDespesas() {
        return despesas;
    }

    public Double getLucro() {
        return lucro;
    }
}