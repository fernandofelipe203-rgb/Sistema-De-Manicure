package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.dto.AlterarSenhaRequest;
import com.ProjetoManicure.Manicure.dto.AtualizarPerfilRequest;
import com.ProjetoManicure.Manicure.model.Profissional;
import com.ProjetoManicure.Manicure.service.JwtService;
import com.ProjetoManicure.Manicure.service.ProfissionalService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/profissionais")
@CrossOrigin(origins = "*")
public class ProfissionalController {

    @Autowired
    private ProfissionalService profissionalService;
    @Autowired
    private JwtService jwtService;

    @GetMapping
    public List<Profissional> listar() {
        return profissionalService.listar();
    }

    @GetMapping("/me")
    public ResponseEntity<Profissional> meuPerfil(
            @RequestHeader("Authorization") String token) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Profissional profissional =
                profissionalService.buscarPorIdDoToken(profissionalId);

        if (profissional == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissional);
    }
    @PutMapping("/me")
    public ResponseEntity<Profissional> atualizarMeuPerfil(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody AtualizarPerfilRequest dados) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        Profissional profissionalAtualizado =
                profissionalService.atualizarMeuPerfil(profissionalId, dados);

        if (profissionalAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissionalAtualizado);
    }
    @PostMapping("/me/foto")
    public ResponseEntity<?> enviarFoto(
            @RequestHeader("Authorization") String token,
            @RequestParam("foto") MultipartFile foto) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        try {

            Profissional profissional =
                    profissionalService.salvarFoto(profissionalId, foto);

            if (profissional == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(profissional);

        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body("Erro ao salvar a foto.");
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Profissional> buscarPorId(@PathVariable int id) {

        Profissional profissional = profissionalService.buscarPorId(id);

        if (profissional == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissional);
    }

    @PostMapping
    public ResponseEntity<Profissional> cadastrar(
            @Valid @RequestBody Profissional profissional) {

        Profissional profissionalSalvo =
                profissionalService.cadastrar(profissional);

        return ResponseEntity.ok(profissionalSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profissional> atualizar(
            @PathVariable int id,
            @Valid @RequestBody Profissional dados) {

        Profissional profissionalAtualizado =
                profissionalService.atualizar(id, dados);

        if (profissionalAtualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profissionalAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable int id) {

        boolean excluido = profissionalService.excluir(id);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
    @PutMapping("/me/senha")
    public ResponseEntity<?> alterarSenha(
            @RequestHeader("Authorization") String token,
            @RequestBody AlterarSenhaRequest dados) {

        token = token.replace("Bearer ", "");

        Claims claims = jwtService.validarToken(token);

        int profissionalId = claims.get("id", Integer.class);

        boolean alterada = profissionalService.alterarSenha(
                profissionalId,
                dados.getSenhaAtual(),
                dados.getNovaSenha()
        );

        if (!alterada) {
            return ResponseEntity
                    .badRequest()
                    .body("Senha atual incorreta.");
        }

        return ResponseEntity.ok("Senha alterada com sucesso.");
    }
}