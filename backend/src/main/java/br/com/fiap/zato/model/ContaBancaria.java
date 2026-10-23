package br.com.fiap.zato.model;

import jakarta.persistence.*;

@Entity
@Table(name = "T_CONTA_BANCARIA")
public class ContaBancaria {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_CONTA_BANCARIA"
    )
    @SequenceGenerator(
            name = "SEQ_CONTA_BANCARIA",
            sequenceName = "SEQ_CONTA_BANCARIA",
            allocationSize = 1
    )
    @Column(name = "ID_CONTA")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NM_BANCO", nullable = false, length = 100)
    private String nomeBanco;

    @Column(name = "TP_CONTA", nullable = false, length = 20)
    private String tipoConta;

    @Column(name = "VL_SALDO", nullable = false)
    private Double saldo;

    @Column(name = "DS_COR", length = 7)
    private String cor;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getNomeBanco() { return nomeBanco; }
    public void setNomeBanco(String nomeBanco) { this.nomeBanco = nomeBanco; }

    public String getTipoConta() { return tipoConta; }
    public void setTipoConta(String tipoConta) { this.tipoConta = tipoConta; }

    public Double getSaldo() { return saldo; }
    public void setSaldo(Double saldo) { this.saldo = saldo; }

    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
}
