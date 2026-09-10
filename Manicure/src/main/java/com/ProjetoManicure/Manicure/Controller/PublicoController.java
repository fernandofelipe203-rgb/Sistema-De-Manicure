package com.ProjetoManicure.Manicure.Controller;

import com.ProjetoManicure.Manicure.dto.ProfissionalPublicoDTO;
import com.ProjetoManicure.Manicure.service.ProfissionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/publico")
@CrossOrigin(origins = "*")
public class PublicoController {

    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping("/profissional/{id}/servicos")
    public ResponseEntity<ProfissionalPublicoDTO> buscarServicosPublicos(
            @PathVariable int id) {

        ProfissionalPublicoDTO dados =
                profissionalService.buscarDadosPublicos(id);

        if (dados == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dados);
    }
}