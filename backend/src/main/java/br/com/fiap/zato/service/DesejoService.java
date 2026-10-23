package br.com.fiap.zato.service;

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
        return desejoRepository.save(desejo);
    }

    public Optional<Desejo> atualizar(Long id, Desejo desejoAtualizado) {
        Optional<Desejo> desejoExistente = desejoRepository.findById(id);
        if (desejoExistente.isPresent()) {
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
}
