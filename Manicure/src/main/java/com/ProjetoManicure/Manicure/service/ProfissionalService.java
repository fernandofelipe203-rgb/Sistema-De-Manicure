package com.ProjetoManicure.Manicure.service;

import com.ProjetoManicure.Manicure.exception.ProfissionalDuplicadoException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ProjetoManicure.Manicure.dto.AtualizarPerfilRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ProfissionalService {

    @Autowired
    private ProfissionalRepository profissionalRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



    public List<Profissional> listar() {
        return profissionalRepository.findAll();
    }

    public Profissional buscarPorId(int id) {
        return profissionalRepository.findById(id).orElse(null);
    }

    public Profissional cadastrar(Profissional profissional) {

        if (profissionalRepository.findByEmail(profissional.getEmail()).isPresent()) {

            throw new ProfissionalDuplicadoException(
                    "Já existe uma profissional cadastrada com este e-mail."
            );
        }

        profissional.setSenha(
                passwordEncoder.encode(profissional.getSenha())
        );

        return profissionalRepository.save(profissional);
    }

    public Profissional atualizar(int id, Profissional dados) {

        Profissional profissional =
                profissionalRepository.findById(id).orElse(null);

        if (profissional == null) {
            return null;
        }
        if (profissionalRepository.existsByEmailAndIdNot(
                dados.getEmail(), id)) {

            throw new ProfissionalDuplicadoException(
                    "Já existe uma profissional cadastrada com este e-mail."
            );
        }

        profissional.setNome(dados.getNome());
        profissional.setEmail(dados.getEmail());
        profissional.setTelefone(dados.getTelefone());
        profissional.setPerfil(dados.getPerfil());

        // Só altera a senha se uma nova senha for enviada
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
            profissional.setSenha(
                    passwordEncoder.encode(dados.getSenha())
            );
        }

        return profissionalRepository.save(profissional);
    }

    public Profissional atualizarMeuPerfil(
            int id,
            AtualizarPerfilRequest dados) {

        Profissional profissional =
                profissionalRepository.findById(id).orElse(null);

        if (profissional == null) {
            return null;
        }

        if (!passwordEncoder.matches(
                dados.getSenhaAtual(),
                profissional.getSenha())) {

            throw new IllegalArgumentException(
                    "Senha atual incorreta."
            );
        }

        if (profissionalRepository.existsByEmailAndIdNot(
                dados.getEmail(),
                id)) {

            throw new ProfissionalDuplicadoException(
                    "Já existe uma profissional cadastrada com este e-mail."
            );
        }

        profissional.setNome(dados.getNome());
        profissional.setEmail(dados.getEmail());
        profissional.setTelefone(dados.getTelefone());
        profissional.setPerfil(dados.getPerfil());

        return profissionalRepository.save(profissional);
    }
    public boolean excluir(int id) {

        if (!profissionalRepository.existsById(id)) {
            return false;
        }

        profissionalRepository.deleteById(id);
        return true;
    }
    public Profissional buscarPorIdDoToken(int id) {
        return profissionalRepository.findById(id).orElse(null);
    }
    public boolean alterarSenha(int id, String senhaAtual, String novaSenha) {

        Profissional profissional =
                profissionalRepository.findById(id).orElse(null);

        if (profissional == null) {
            return false;
        }

        // Verifica se a senha atual está correta
        if (!passwordEncoder.matches(senhaAtual, profissional.getSenha())) {
            return false;
        }

        // Criptografa e salva a nova senha
        profissional.setSenha(
                passwordEncoder.encode(novaSenha)
        );

        profissionalRepository.save(profissional);

        return true;
    }
    public Profissional salvarFoto(int id, MultipartFile arquivo) throws IOException {

        Profissional profissional =
                profissionalRepository.findById(id).orElse(null);

        if (profissional == null) {
            return null;
        }

        String nomeArquivo =
                UUID.randomUUID() + "_" + arquivo.getOriginalFilename();

        Path pasta = Paths.get("uploads/perfis");

        Files.createDirectories(pasta);

        Path caminho = pasta.resolve(nomeArquivo);

        Files.copy(
                arquivo.getInputStream(),
                caminho,
                StandardCopyOption.REPLACE_EXISTING
        );

        profissional.setFoto("/uploads/perfis/" + nomeArquivo);

        return profissionalRepository.save(profissional);
    }
}
