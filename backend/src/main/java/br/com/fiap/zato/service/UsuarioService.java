package br.com.fiap.zato.service;

import br.com.fiap.zato.exception.RegistroVinculadoException;
import br.com.fiap.zato.model.Usuario;
import br.com.fiap.zato.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> atualizar(Long id, Usuario usuarioAtualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setSenha(usuarioAtualizado.getSenha());
            usuario.setDataCadastro(usuarioAtualizado.getDataCadastro());
            return Optional.of(usuarioRepository.save(usuario));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            try {
                usuarioRepository.deleteById(id);
            } catch (DataIntegrityViolationException e) {
                // O banco recusou por causa das chaves estrangeiras: o usuário ainda tem registros ligados a ele
                throw new RegistroVinculadoException(
                        "Não é possível excluir o usuário: ele ainda tem contas, metas ou desejos cadastrados.");
            }
            return true;
        }
        return false;
    }
}
