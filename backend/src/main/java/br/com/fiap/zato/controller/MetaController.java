package br.com.fiap.zato.controller;

import br.com.fiap.zato.model.Meta;
import br.com.fiap.zato.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @GetMapping
    public ResponseEntity<List<Meta>> listarTodos() {
        return ResponseEntity.ok(metaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meta> buscarPorId(@PathVariable Long id) {
        return metaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Meta criar(@RequestBody Meta meta) {
        return metaService.salvar(meta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meta> atualizar(@PathVariable Long id, @RequestBody Meta meta) {
        return metaService.atualizar(id, meta)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (metaService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
