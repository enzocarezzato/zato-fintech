package br.com.fiap.zato.controller;

import br.com.fiap.zato.model.Desejo;
import br.com.fiap.zato.service.DesejoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/desejos")
public class DesejoController {

    @Autowired
    private DesejoService desejoService;

    @GetMapping
    public ResponseEntity<List<Desejo>> listarTodos() {
        return ResponseEntity.ok(desejoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Desejo> buscarPorId(@PathVariable Long id) {
        return desejoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Desejo criar(@RequestBody Desejo desejo) {
        return desejoService.salvar(desejo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Desejo> atualizar(@PathVariable Long id, @RequestBody Desejo desejo) {
        return desejoService.atualizar(id, desejo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (desejoService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
