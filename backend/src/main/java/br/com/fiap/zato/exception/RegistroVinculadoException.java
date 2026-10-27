package br.com.fiap.zato.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Lançada quando tento excluir um registro que ainda tem outros ligados a ele
// (por exemplo, um usuário que ainda tem contas). O banco bloqueia pela chave estrangeira,
// e o @ResponseStatus faz o Spring responder 409 Conflict em vez de 500.
@ResponseStatus(HttpStatus.CONFLICT)
public class RegistroVinculadoException extends RuntimeException {

    public RegistroVinculadoException(String mensagem) {
        super(mensagem);
    }
}
