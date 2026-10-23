package br.com.fiap.zato.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "T_TRANSACAO")
public class Transacao {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_TRANSACAO"
    )
    @SequenceGenerator(
            name = "SEQ_TRANSACAO",
            sequenceName = "SEQ_TRANSACAO",
            allocationSize = 1
    )
    @Column(name = "ID_TRANSACAO")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_CONTA", nullable = false)
    private ContaBancaria contaBancaria;

    @Column(name = "DS_DESCRICAO", nullable = false, length = 200)
    private String descricao;

    @Column(name = "VL_VALOR", nullable = false)
    private Double valor;

    @Column(name = "TP_TIPO", nullable = false, length = 10)
    private String tipo;

    @Column(name = "DT_TRANSACAO", nullable = false)
    private LocalDate dataTransacao;

    @Column(name = "DS_CATEGORIA", length = 50)
    private String categoria;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ContaBancaria getContaBancaria() { return contaBancaria; }
    public void setContaBancaria(ContaBancaria contaBancaria) { this.contaBancaria = contaBancaria; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDate getDataTransacao() { return dataTransacao; }
    public void setDataTransacao(LocalDate dataTransacao) { this.dataTransacao = dataTransacao; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
}
