package br.com.fiap.zato.service;

import br.com.fiap.zato.model.ContaBancaria;
import br.com.fiap.zato.repository.ContaBancariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaBancariaService {

    @Autowired
    private ContaBancariaRepository contaBancariaRepository;

    public List<ContaBancaria> listarTodos() {
        return contaBancariaRepository.findAll();
    }

    public Optional<ContaBancaria> buscarPorId(Long id) {
        return contaBancariaRepository.findById(id);
    }

    public ContaBancaria salvar(ContaBancaria contaBancaria) {
        return contaBancariaRepository.save(contaBancaria);
    }

    public Optional<ContaBancaria> atualizar(Long id, ContaBancaria contaAtualizada) {
        Optional<ContaBancaria> contaExistente = contaBancariaRepository.findById(id);
        if (contaExistente.isPresent()) {
            ContaBancaria conta = contaExistente.get();
            conta.setNomeBanco(contaAtualizada.getNomeBanco());
            conta.setTipoConta(contaAtualizada.getTipoConta());
            conta.setSaldo(contaAtualizada.getSaldo());
            conta.setCor(contaAtualizada.getCor());
            return Optional.of(contaBancariaRepository.save(conta));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (contaBancariaRepository.existsById(id)) {
            contaBancariaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
