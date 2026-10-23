package br.com.fiap.zato.model;

import jakarta.persistence.*;

@Entity
@Table(name = "T_DESEJO")
public class Desejo {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_DESEJO"
    )
    @SequenceGenerator(
            name = "SEQ_DESEJO",
            sequenceName = "SEQ_DESEJO",
            allocationSize = 1
    )
    @Column(name = "ID_DESEJO")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NM_PRODUTO", nullable = false, length = 150)
    private String nomeProduto;

    @Column(name = "VL_ESTIMADO")
    private Double valorEstimado;

    @Column(name = "DS_LINK", length = 500)
    private String link;

    @Column(name = "DS_PRIORIDADE", length = 20)
    private String prioridade;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getNomeProduto() { return nomeProduto; }
    public void setNomeProduto(String nomeProduto) { this.nomeProduto = nomeProduto; }

    public Double getValorEstimado() { return valorEstimado; }
    public void setValorEstimado(Double valorEstimado) { this.valorEstimado = valorEstimado; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getPrioridade() { return prioridade; }
    public void setPrioridade(String prioridade) { this.prioridade = prioridade; }
}
