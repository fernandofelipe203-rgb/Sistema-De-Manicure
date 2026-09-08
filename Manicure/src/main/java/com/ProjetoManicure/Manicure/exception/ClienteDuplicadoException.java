package com.ProjetoManicure.Manicure.exception;

public class ClienteDuplicadoException extends RuntimeException {
    public ClienteDuplicadoException(String mensagem) {
        super(mensagem);
    }
}
