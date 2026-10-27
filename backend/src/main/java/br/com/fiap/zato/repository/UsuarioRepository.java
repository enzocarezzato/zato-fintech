package br.com.fiap.zato.repository;

import br.com.fiap.zato.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // O Spring Data monta a consulta sozinho a partir do nome do método:
    // SELECT * FROM T_USUARIO WHERE DS_EMAIL = ?
    Optional<Usuario> findByEmail(String email);
}
