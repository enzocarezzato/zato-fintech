package br.com.fiap.zato.service;

import br.com.fiap.zato.model.Meta;
import br.com.fiap.zato.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetaService {

    @Autowired
    private MetaRepository metaRepository;

    public List<Meta> listarTodos() {
        return metaRepository.findAll();
    }

    public Optional<Meta> buscarPorId(Long id) {
        return metaRepository.findById(id);
    }

    public Meta salvar(Meta meta) {
        return metaRepository.save(meta);
    }

    public Optional<Meta> atualizar(Long id, Meta metaAtualizada) {
        Optional<Meta> metaExistente = metaRepository.findById(id);
        if (metaExistente.isPresent()) {
            Meta meta = metaExistente.get();
            meta.setNome(metaAtualizada.getNome());
            meta.setValorObjetivo(metaAtualizada.getValorObjetivo());
            meta.setValorAtual(metaAtualizada.getValorAtual());
            meta.setDataPrazo(metaAtualizada.getDataPrazo());
            meta.setStatus(metaAtualizada.getStatus());
            return Optional.of(metaRepository.save(meta));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (metaRepository.existsById(id)) {
            metaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
