package br.com.fiap.zato.controller;

import br.com.fiap.zato.model.Transacao;
import br.com.fiap.zato.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @GetMapping
    public ResponseEntity<List<Transacao>> listarTodos() {
        return ResponseEntity.ok(transacaoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarPorId(@PathVariable Long id) {
        return transacaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transacao criar(@RequestBody Transacao transacao) {
        return transacaoService.salvar(transacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable Long id, @RequestBody Transacao transacao) {
        return transacaoService.atualizar(id, transacao)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (transacaoService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
