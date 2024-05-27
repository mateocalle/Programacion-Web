const form = document.querySelector('#form-campos');
const tablaLocal = document.querySelector('#tablaLocal');
const tablaSession = document.querySelector('#tablaSession');
const selectLocal = document.querySelector('#buscarLocal');
const selectSession = document.querySelector('#buscarSession');

// Función para agregar datos a la tabla y al select
function agregarDatosATablaYSelect(persona, tabla, select) {
    // Agrega una nueva fila a la tabla
    const row = document.createElement('tr');
    Object.values(persona).forEach((text, index) => {
        const cell = document.createElement('td');
        if (index === 0) { // Si es la primera propiedad (la imagen)
            const img = document.createElement('img');
            img.src = text;
            img.className = 'rounded-circle'; // Agrega la clase a la imagen
            img.style = 'width: 50px; height: 50px; object-fit: cover'; // Establece el ancho y el alto de la imagen
            cell.appendChild(img);
        } else {
            cell.textContent = text;
        }
        row.appendChild(cell);
    });
    tabla.appendChild(row);

    // Agrega una nueva opción al select
    const option = document.createElement('option');
    option.textContent = `${persona.nombre} ${persona.apellido}`;
    option.value = persona.cedula;
    select.appendChild(option);
}

// Función para previsualizar la imagen seleccionada
document.querySelector('#foto').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.querySelector('#preview').src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Función para activar el clic en el campo de entrada de tipo "file" cuando se hace clic en la imagen
document.querySelector('#preview').addEventListener('click', function () {
    document.querySelector('#foto').click();
});

// Función para limpiar y habilitar los campos del formulario
function limpiarCampos() {
    const fotoPerfil = document.getElementById('preview');

    fotoPerfil.src = 'https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png';
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido').value = '';
    document.querySelector('#cedula').value = '';
    document.querySelector('#genero').value = 'default';
    document.querySelector('#correo').value = '';
    document.querySelector('#fechaNacimiento').value = '';
    document.querySelector('#ciudad').value = '';
    document.querySelector('#telefono').value = '';
    document.querySelector('#buscarLocal').value = 'default';
    document.querySelector('#buscarSession').value = 'default';

    // Habilitar los campos
    document.querySelector('#nombre').disabled = false;
    document.querySelector('#apellido').disabled = false;
    document.querySelector('#cedula').disabled = false;
    document.querySelector('#genero').disabled = false;
    document.querySelector('#correo').disabled = false;
    document.querySelector('#fechaNacimiento').disabled = false;
    document.querySelector('#ciudad').disabled = false;
    document.querySelector('#telefono').disabled = false;
    document.querySelector('#preview').style.pointerEvents = 'auto';
    btnEliminar.disabled = true;
    btnEditar.disabled = true;

}

// Limpia y habilita los campos
document.querySelector('#btnLimpiar').addEventListener('click', limpiarCampos);

// Función para cargar los datos del almacenamiento local y de sesión
function cargarDatos() {
    // Carga los datos del almacenamiento local
    for (let i = 0; i < localStorage.length; i++) {
        const cedula = localStorage.key(i);
        const persona = JSON.parse(localStorage.getItem(cedula));
        agregarDatosATablaYSelect(persona, tablaLocal, selectLocal);
    }

    // Carga los datos del almacenamiento de sesión
    for (let i = 0; i < sessionStorage.length; i++) {
        const cedula = sessionStorage.key(i);
        const persona = JSON.parse(sessionStorage.getItem(cedula));
        agregarDatosATablaYSelect(persona, tablaSession, selectSession);
    }
}

window.onload = cargarDatos;

// Función para llenar los campos del formulario con los datos de una persona
function llenarCampos(persona) {
    document.querySelector('#nombre').value = persona.nombre;
    document.querySelector('#apellido').value = persona.apellido;
    document.querySelector('#cedula').value = persona.cedula;
    document.querySelector('#genero').value = persona.genero;
    document.querySelector('#correo').value = persona.correo;
    document.querySelector('#fechaNacimiento').value = persona.fechaNacimiento;
    document.querySelector('#ciudad').value = persona.edad;
    document.querySelector('#telefono').value = persona.telefono;
    document.querySelector('#preview').src = persona.foto;
}

// Función para deshabilitar los campos del formulario
function deshabilitarCampos() {
    document.querySelector('#nombre').disabled = true;
    document.querySelector('#apellido').disabled = true;
    document.querySelector('#cedula').disabled = true;
    document.querySelector('#genero').disabled = true;
    document.querySelector('#correo').disabled = true;
    document.querySelector('#fechaNacimiento').disabled = true;
    document.querySelector('#ciudad').disabled = true;
    document.querySelector('#telefono').disabled = true;
    document.querySelector('#preview').style.pointerEvents = 'none';
}

// Evento de escucha para el select del almacenamiento local
selectLocal.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(localStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
});

// Evento de escucha para el select del almacenamiento de sesión
selectSession.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(sessionStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
});

const btnEditar = document.querySelector('#btnEditar');

// Evento de escucha para el select del almacenamiento local
selectLocal.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(localStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
    btnEditar.disabled = false; // Habilita el botón "Editar"
});

// Evento de escucha para el select del almacenamiento de sesión
selectSession.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(sessionStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
    btnEditar.disabled = false; // Habilita el botón "Editar"
});

// Evento de escucha para el botón "Editar"
btnEditar.addEventListener('click', function () {
    // Habilita los campos del formulario
    document.querySelector('#nombre').disabled = false;
    document.querySelector('#apellido').disabled = false;
    document.querySelector('#cedula').disabled = false;
    document.querySelector('#genero').disabled = false;
    document.querySelector('#correo').disabled = false;
    document.querySelector('#fechaNacimiento').disabled = false;
    document.querySelector('#ciudad').disabled = false;
    document.querySelector('#telefono').disabled = false;
    document.querySelector('#preview').style.pointerEvents = 'auto';
});

// Función para actualizar la tabla y el select
function actualizarTablaYSelect(tabla, select, almacenamiento) {
    // Elimina todas las filas y opciones existentes
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Vuelve a agregar las filas y opciones desde el almacenamiento
    for (let i = 0; i < almacenamiento.length; i++) {
        const cedula = almacenamiento.key(i);
        const persona = JSON.parse(almacenamiento.getItem(cedula));
        agregarDatosATablaYSelect(persona, tabla, select);
    }
}

// Variable de estado para el modo de edición
let editMode = false;
let cedulaEdit = '';

// Evento de escucha para el botón "Editar"
btnEditar.addEventListener('click', function () {
    // Habilita los campos del formulario
    document.querySelector('#nombre').disabled = false;
    document.querySelector('#apellido').disabled = false;
    document.querySelector('#cedula').disabled = false;
    document.querySelector('#genero').disabled = false;
    document.querySelector('#correo').disabled = false;
    document.querySelector('#fechaNacimiento').disabled = false;
    document.querySelector('#ciudad').disabled = false;
    document.querySelector('#telefono').disabled = false;
    document.querySelector('#preview').style.pointerEvents = 'auto';

    // Cambia a modo de edición
    editMode = true;
    cedulaEdit = document.querySelector('#cedula').value;
});

// Validar cédula ecuatoriana
function validarCedula(cedula) {
    var cad = cedula.trim();
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Modifica el evento de escucha del botón "Guardar"
form.addEventListener('submit', function (event) {
    // Previene la recarga de la página
    event.preventDefault();

    // Recoge los datos del formulario
    const persona = {
        foto: document.querySelector('#preview').src,
        nombre: document.querySelector('#nombre').value,
        apellido: document.querySelector('#apellido').value,
        cedula: document.querySelector('#cedula').value,
        genero: document.querySelector('#genero').value,
        correo: document.querySelector('#correo').value,
        fechaNacimiento: document.querySelector('#fechaNacimiento').value,
        edad: document.querySelector('#ciudad').value,
        telefono: document.querySelector('#telefono').value
    };

    // Verifica si los campos del formulario están habilitados
    if (!document.querySelector('#nombre').disabled) {
        // Si están habilitados, guarda los cambios en el almacenamiento correspondiente
        if (editMode) {
            // Modo de edición: actualiza la persona existente
            if (selectLocal.value === cedulaEdit) {
                localStorage.setItem(persona.cedula, JSON.stringify(persona));
                actualizarTablaYSelect(tablaLocal, selectLocal, localStorage);
            } else if (selectSession.value === cedulaEdit) {
                sessionStorage.setItem(persona.cedula, JSON.stringify(persona));
                actualizarTablaYSelect(tablaSession, selectSession, sessionStorage);
            }
            // Cambia a modo de no edición
            editMode = false;
            cedulaEdit = '';
        } else {
            // Verifica si se ha seleccionado una foto
            const foto = document.querySelector('#foto');
            if (!foto.files.length) {
                alert('Por favor, selecciona una foto de perfil.');
                return;
            }

            if (!validarCedula(persona.cedula)) {
                alert("La cédula ingresada no es válida.");
                return;
            }

            // Verifica si la cédula ya existe en el almacenamiento local o de sesión
            if (localStorage.getItem(persona.cedula) !== null || sessionStorage.getItem(persona.cedula) !== null) {
                alert('La cédula ya existe en el almacenamiento.');
                return;
            }

            // Modo de no edición: agrega una nueva persona
            if (localStorage.getItem(persona.cedula) === null && sessionStorage.getItem(persona.cedula) === null) {
                localStorage.setItem(persona.cedula, JSON.stringify(persona));
                sessionStorage.setItem(persona.cedula, JSON.stringify(persona));
                actualizarTablaYSelect(tablaLocal, selectLocal, localStorage);
                actualizarTablaYSelect(tablaSession, selectSession, sessionStorage);
            } else {
                alert('La cédula ya existe en el almacenamiento');
            }
        }
    }
    limpiarCampos();
});

const btnEliminar = document.querySelector('#btnEliminar');

// Evento de escucha para el select del almacenamiento local
selectLocal.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(localStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
    btnEliminar.disabled = false; // Habilita el botón "Eliminar"
});

// Evento de escucha para el select del almacenamiento de sesión
selectSession.addEventListener('change', function () {
    const cedula = this.value;
    const persona = JSON.parse(sessionStorage.getItem(cedula));
    llenarCampos(persona);
    deshabilitarCampos();
    btnEliminar.disabled = false; // Habilita el botón "Eliminar"
});

// Evento de escucha para el botón "Eliminar"
btnEliminar.addEventListener('click', function () {
    const cedula = document.querySelector('#cedula').value;
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar a esta persona?');

    if (confirmacion) {
        if (selectLocal.value === cedula) {
            localStorage.removeItem(cedula);
            actualizarTablaYSelect(tablaLocal, selectLocal, localStorage);
        } else if (selectSession.value === cedula) {
            sessionStorage.removeItem(cedula);
            actualizarTablaYSelect(tablaSession, selectSession, sessionStorage);
        }
        limpiarCampos();
        btnEliminar.disabled = true;
    }
});