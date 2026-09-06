package com.ProjetoManicure.Manicure.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagamentos")
public class Pagamentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double valor;

    private String formaPagamento;

    private String status;

    private LocalDate dataPagamento;

    @OneToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;
}
