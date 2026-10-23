package br.com.fiap.zato.controller;

import br.com.fiap.zato.model.ContaBancaria;
import br.com.fiap.zato.service.ContaBancariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contas")
public class ContaBancariaController {

    @Autowired
    private ContaBancariaService contaBancariaService;

    @GetMapping
    public ResponseEntity<List<ContaBancaria>> listarTodos() {
        return ResponseEntity.ok(contaBancariaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContaBancaria> buscarPorId(@PathVariable Long id) {
        return contaBancariaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContaBancaria criar(@RequestBody ContaBancaria contaBancaria) {
        return contaBancariaService.salvar(contaBancaria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContaBancaria> atualizar(@PathVariable Long id, @RequestBody ContaBancaria contaBancaria) {
        return contaBancariaService.atualizar(id, contaBancaria)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (contaBancariaService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
