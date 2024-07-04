package com.example.demo.Controlador;

import com.example.demo.Modelo.Direcciones;
import com.example.demo.Servicio.DireccionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/direcciones")
public class DireccionesControler {

    @Autowired
    private DireccionesService direccionesService;

    @GetMapping
    public CompletableFuture<ResponseEntity<List<Direcciones>>> getAllDirecciones() {
        return direccionesService.getAllDirecciones().thenApply(ResponseEntity::ok);
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<Direcciones>> createDireccion(@RequestBody Direcciones direcciones) {
        return direccionesService.saveDirecciones(direcciones).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<Direcciones>> getDireccionById(@PathVariable Long id) {
        return direccionesService.getDireccionesById(id).thenApply(ResponseEntity::ok);
    }

    @PutMapping("/{id}")
    public CompletableFuture<ResponseEntity<Direcciones>> updateDireccion(@PathVariable Long id,
                                                                          @RequestBody Direcciones direccionesDetails) {
        return direccionesService.updateDirecciones(id, direccionesDetails).thenApply(updatedDireccion -> {
            if (updatedDireccion != null) {
                return ResponseEntity.ok(updatedDireccion);
            } else {
                return ResponseEntity.notFound().build();
            }
        });
    }

    @DeleteMapping("/{id}")
    public CompletableFuture<ResponseEntity<Void>> deleteDireccion(@PathVariable Long id) {
        return direccionesService.deleteDirecciones(id).thenApply(ResponseEntity::ok);
    }
}