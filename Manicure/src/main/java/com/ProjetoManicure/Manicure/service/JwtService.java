package com.ProjetoManicure.Manicure.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String chave;

    @Value("${jwt.expiration}")
    private long tempoExpiracao;

    private SecretKey getChave() {
        return Keys.hmacShaKeyFor(
                chave.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String gerarToken(int id, String email) {

        Date agora = new Date();

        Date expiracao =
                new Date(agora.getTime() + tempoExpiracao);

        return Jwts.builder()
                .subject(email)
                .claim("id", id)
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(getChave())
                .compact();
    }
    public Claims validarToken(String token) {

        return Jwts.parser()
                .verifyWith(getChave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
