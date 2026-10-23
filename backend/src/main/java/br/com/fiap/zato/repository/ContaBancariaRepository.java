package br.com.fiap.zato.repository;

import br.com.fiap.zato.model.ContaBancaria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaBancariaRepository extends JpaRepository<ContaBancaria, Long> {
}
