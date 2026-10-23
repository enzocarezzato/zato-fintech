package br.com.fiap.zato.service;

import br.com.fiap.zato.model.Transacao;
import br.com.fiap.zato.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    public List<Transacao> listarTodos() {
        return transacaoRepository.findAll();
    }

    public Optional<Transacao> buscarPorId(Long id) {
        return transacaoRepository.findById(id);
    }

    public Transacao salvar(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    public Optional<Transacao> atualizar(Long id, Transacao transacaoAtualizada) {
        Optional<Transacao> transacaoExistente = transacaoRepository.findById(id);
        if (transacaoExistente.isPresent()) {
            Transacao transacao = transacaoExistente.get();
            transacao.setDescricao(transacaoAtualizada.getDescricao());
            transacao.setValor(transacaoAtualizada.getValor());
            transacao.setTipo(transacaoAtualizada.getTipo());
            transacao.setDataTransacao(transacaoAtualizada.getDataTransacao());
            transacao.setCategoria(transacaoAtualizada.getCategoria());
            return Optional.of(transacaoRepository.save(transacao));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (transacaoRepository.existsById(id)) {
            transacaoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
