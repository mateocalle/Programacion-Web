package com.example.demo.Servicio;

import com.example.demo.Modelo.Direcciones;
import com.example.demo.Repositorio.DireccionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;
import java.util.List;

@Service
public class DireccionesService {
    @Autowired
    private DireccionesRepository direccionesRepository;

    @Async
    public CompletableFuture<List<Direcciones>> getAllDirecciones() {
        return CompletableFuture.completedFuture(direccionesRepository.findAll());
    }

    @Async
    public CompletableFuture<Direcciones> saveDirecciones(Direcciones direcciones) {
        return CompletableFuture.completedFuture(direccionesRepository.save(direcciones));
    }

    @Async
    public CompletableFuture<Direcciones> updateDirecciones(Long id, Direcciones direccionesDetails) {
        return direccionesRepository.findById(id)
                .map(direcciones -> {
                    direcciones.setNombre(direccionesDetails.getNombre());
                    direcciones.setApellido(direccionesDetails.getApellido());
                    direcciones.setLugar(direccionesDetails.getLugar());
                    direcciones.setDireccion(direccionesDetails.getDireccion());
                    direcciones.setPais(direccionesDetails.getPais());
                    direcciones.setCiudad(direccionesDetails.getCiudad());
                    direcciones.setZip(direccionesDetails.getZip());
                    direcciones.setEmail(direccionesDetails.getEmail());
                    direcciones.setPrefijoCelular(direccionesDetails.getPrefijoCelular());
                    direcciones.setCelular(direccionesDetails.getCelular());
                    return CompletableFuture.completedFuture(direccionesRepository.save(direcciones));
                }).orElseGet(() -> CompletableFuture.completedFuture(null));
    }

    @Async
    public CompletableFuture<Direcciones> getDireccionesById(Long id) {
        return CompletableFuture.completedFuture(direccionesRepository.findById(id).orElse(null));
    }

    @Async
    public CompletableFuture<Void> deleteDirecciones(Long id) {
        direccionesRepository.deleteById(id);
        return CompletableFuture.completedFuture(null);
    }
}
