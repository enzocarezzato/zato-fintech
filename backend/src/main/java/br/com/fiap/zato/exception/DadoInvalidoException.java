package br.com.fiap.zato.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Lançada quando a requisição traz um valor que a regra de negócio não aceita.
// O @ResponseStatus faz o Spring responder 400 Bad Request em vez de 500.
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DadoInvalidoException extends RuntimeException {

    public DadoInvalidoException(String mensagem) {
        super(mensagem);
    }
}
