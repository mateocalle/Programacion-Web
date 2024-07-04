document.addEventListener('DOMContentLoaded', function() {
    cargarDireccionesGuardadas();
});

function cargarDireccionesGuardadas() {
    fetch('/api/direcciones')
        .then(response => response.json())
        .then(data => {
            let selectDireccion = document.getElementById('direccionGuardada');
            selectDireccion.innerHTML = '<option selected disabled value="0">Escoger una dirección</option>';
            for (let direccion of data) {
                let option = document.createElement('option');
                option.value = direccion.id;
                option.text = direccion.nombre;
                selectDireccion.add(option);
            }
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('btnAgregar').addEventListener('click', function() {
    document.getElementById('camposDireccion').style.display = 'block';
    limpiarCampos();
    desbloquearCampos();
    document.getElementById('btnGuardar').style.display = 'block';
    document.getElementById('btnGuardar').dataset.id = ''; // Clear any previous ID
    document.getElementById('btnEditar').style.display = 'none';
    document.getElementById('btnEliminar').style.display = 'none';
    document.getElementById('btnAgregar').style.display = 'none';
});

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('camposDireccion').style.display = 'none';
    limpiarCampos();
    document.getElementById('btnGuardar').style.display = 'none';
});

document.getElementById('btnGuardar').addEventListener('click', function(event) {
    event.preventDefault();
    let direccion = obtenerDatosFormulario();
    let id = this.dataset.id;
    //let id = document.getElementById('direccionGuardada').value;

    let method = id ? 'PUT' : 'POST';
    let url = id ? `/api/direcciones/${id}` : '/api/direcciones';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(direccion)
    })
    .then(response => response.json())
    .then(data => {
        cargarDireccionesGuardadas();
        limpiarCampos();
        document.getElementById('camposDireccion').style.display = 'none';
        document.getElementById('btnGuardar').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
});

function mostrarDireccion(id) {
    fetch(`/api/direcciones/${id}`)
        .then(response => response.json())
        .then(direccion => {
            document.getElementById('nombreEnvio').value = direccion.nombre;
            document.getElementById('apellidoEnvio').value = direccion.apellido;
            document.getElementById('lugarEnvio').value = direccion.lugar;
            document.getElementById('direccionEnvio').value = direccion.direccion;
            document.getElementById('ciudadEnvio').value = direccion.ciudad;
            document.getElementById('paisEnvio').value = direccion.pais;
            document.getElementById('zipEnvio').value = direccion.zip;
            document.getElementById('emailEnvio').value = direccion.email;
            document.getElementById('prefijoCelular').value = direccion.prefijoCelular;
            document.getElementById('celularEnvio').value = direccion.celular;
            bloquearCampos();

            document.getElementById('btnAgregar').style.display = 'none';

            document.getElementById('camposDireccion').style.display = 'block';
            document.getElementById('btnGuardar').style.display = 'none';
            document.getElementById('btnGuardar').dataset.id = id; // Store the ID for PUT requests
            document.getElementById('btnEditar').style.display = 'block';
            document.getElementById('btnEliminar').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('btnEditar').addEventListener('click', function() {
    desbloquearCampos();
    document.getElementById('btnGuardar').style.display = 'block';
});

document.getElementById('btnEliminar').addEventListener('click', function() {
    let id = document.getElementById('direccionGuardada').value;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Si el usuario hace clic en "Aceptar", elimina la dirección
        if (result.isConfirmed) {
            fetch(`/api/direcciones/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                cargarDireccionesGuardadas();
                limpiarCampos();
                document.getElementById('camposDireccion').style.display = 'none';
            })
            .catch(error => console.error('Error:', error));
        }
    })
});

function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById('nombreEnvio').value,
        apellido: document.getElementById('apellidoEnvio').value,
        lugar: document.getElementById('lugarEnvio').value,
        direccion: document.getElementById('direccionEnvio').value,
        ciudad: document.getElementById('ciudadEnvio').value,
        pais: document.getElementById('paisEnvio').value,
        zip: document.getElementById('zipEnvio').value,
        email: document.getElementById('emailEnvio').value,
        prefijoCelular: document.getElementById('prefijoCelular').value,
        celular: document.getElementById('celularEnvio').value
    };
}

function limpiarCampos() {
    document.getElementById('nombreEnvio').value = '';
    document.getElementById('apellidoEnvio').value = '';
    document.getElementById('lugarEnvio').value = '';
    document.getElementById('direccionEnvio').value = '';
    document.getElementById('ciudadEnvio').value = '';
    document.getElementById('paisEnvio').value = '';
    document.getElementById('zipEnvio').value = '';
    document.getElementById('emailEnvio').value = '';
    document.getElementById('prefijoCelular').value = '+593';
    document.getElementById('celularEnvio').value = '';

    document.getElementById('direccionGuardada').value = '0';

    document.getElementById('btnAgregar').style.display = 'block';

}

function bloquearCampos() {
    document.getElementById('nombreEnvio').disabled = true;
    document.getElementById('apellidoEnvio').disabled = true;
    document.getElementById('lugarEnvio').disabled = true;
    document.getElementById('direccionEnvio').disabled = true;
    document.getElementById('ciudadEnvio').disabled = true;
    document.getElementById('paisEnvio').disabled = true;
    document.getElementById('zipEnvio').disabled = true;
    document.getElementById('emailEnvio').disabled = true;
    document.getElementById('prefijoCelular').disabled = true;
    document.getElementById('celularEnvio').disabled = true;
}

function desbloquearCampos() {
    document.getElementById('nombreEnvio').disabled = false;
    document.getElementById('apellidoEnvio').disabled = false;
    document.getElementById('lugarEnvio').disabled = false;
    document.getElementById('direccionEnvio').disabled = false;
    document.getElementById('ciudadEnvio').disabled = false;
    document.getElementById('paisEnvio').disabled = false;
    document.getElementById('zipEnvio').disabled = false;
    document.getElementById('emailEnvio').disabled = false;
    document.getElementById('prefijoCelular').disabled = false;
    document.getElementById('celularEnvio').disabled = false;
}
