package br.com.fiap.zato.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "T_META")
public class Meta {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_META"
    )
    @SequenceGenerator(
            name = "SEQ_META",
            sequenceName = "SEQ_META",
            allocationSize = 1
    )
    @Column(name = "ID_META")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NM_META", nullable = false, length = 100)
    private String nome;

    @Column(name = "VL_OBJETIVO", nullable = false)
    private Double valorObjetivo;

    @Column(name = "VL_ATUAL", nullable = false)
    private Double valorAtual;

    @Column(name = "DT_PRAZO")
    private LocalDate dataPrazo;

    @Column(name = "DS_STATUS", length = 20)
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getValorObjetivo() { return valorObjetivo; }
    public void setValorObjetivo(Double valorObjetivo) { this.valorObjetivo = valorObjetivo; }

    public Double getValorAtual() { return valorAtual; }
    public void setValorAtual(Double valorAtual) { this.valorAtual = valorAtual; }

    public LocalDate getDataPrazo() { return dataPrazo; }
    public void setDataPrazo(LocalDate dataPrazo) { this.dataPrazo = dataPrazo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
