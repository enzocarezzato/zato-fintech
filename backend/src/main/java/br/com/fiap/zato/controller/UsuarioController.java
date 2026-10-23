package br.com.fiap.zato.controller;

import br.com.fiap.zato.model.Usuario;
import br.com.fiap.zato.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // GET /api/usuarios -> 200 OK
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // GET /api/usuarios/{id} -> 200 OK ou 404 Not Found
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/usuarios -> 201 Created
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    // PUT /api/usuarios/{id} -> 200 OK ou 404 Not Found
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.atualizar(id, usuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/usuarios/{id} -> 204 No Content ou 404 Not Found
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (usuarioService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
