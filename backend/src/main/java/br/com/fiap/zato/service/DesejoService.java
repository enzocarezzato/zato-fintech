package br.com.fiap.zato.service;

import br.com.fiap.zato.exception.DadoInvalidoException;
import br.com.fiap.zato.model.Desejo;
import br.com.fiap.zato.repository.DesejoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesejoService {

    @Autowired
    private DesejoRepository desejoRepository;

    public List<Desejo> listarTodos() {
        return desejoRepository.findAll();
    }

    public Optional<Desejo> buscarPorId(Long id) {
        return desejoRepository.findById(id);
    }

    public Desejo salvar(Desejo desejo) {
        validarPrioridade(desejo.getPrioridade());
        return desejoRepository.save(desejo);
    }

    public Optional<Desejo> atualizar(Long id, Desejo desejoAtualizado) {
        Optional<Desejo> desejoExistente = desejoRepository.findById(id);
        if (desejoExistente.isPresent()) {
            validarPrioridade(desejoAtualizado.getPrioridade());
            Desejo desejo = desejoExistente.get();
            desejo.setNomeProduto(desejoAtualizado.getNomeProduto());
            desejo.setValorEstimado(desejoAtualizado.getValorEstimado());
            desejo.setLink(desejoAtualizado.getLink());
            desejo.setPrioridade(desejoAtualizado.getPrioridade());
            return Optional.of(desejoRepository.save(desejo));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (desejoRepository.existsById(id)) {
            desejoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // A prioridade é opcional, mas quando vier precisa ser um dos valores aceitos pelo banco
    private void validarPrioridade(String prioridade) {
        if (prioridade != null && !List.of("ALTA", "MEDIA", "BAIXA").contains(prioridade)) {
            throw new DadoInvalidoException("Prioridade inválida. Use ALTA, MEDIA ou BAIXA.");
        }
    }
}
