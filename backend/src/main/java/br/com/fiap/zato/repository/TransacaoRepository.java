package br.com.fiap.zato.repository;

import br.com.fiap.zato.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}
