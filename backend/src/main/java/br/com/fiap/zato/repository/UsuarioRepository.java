package br.com.fiap.zato.repository;

import br.com.fiap.zato.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
