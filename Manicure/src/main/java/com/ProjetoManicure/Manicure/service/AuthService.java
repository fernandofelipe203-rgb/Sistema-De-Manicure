package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.dto.LoginDTO;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private ProfissionalRepository profissionalRepository;

    private BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public String login(LoginDTO dados) {

        Profissional profissional =
                profissionalRepository.findByEmail(dados.getEmail())
                        .orElse(null);

        if (profissional == null) {
            return null;
        }

        boolean senhaCorreta =
                passwordEncoder.matches(
                        dados.getSenha(),
                        profissional.getSenha()
                );

        if (!senhaCorreta) {
            return null;
        }

        return jwtService.gerarToken(
                profissional.getId(),
                profissional.getEmail()
        );
    }
}
