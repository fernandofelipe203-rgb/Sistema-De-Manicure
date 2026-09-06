package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.dto.LoginDTO;

import com.ProjetoManicure.Manicure.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginDTO dados) {

        String token = authService.login(dados);

        if (token == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(token);
    }

}
