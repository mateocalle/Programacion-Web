function previewProfilePicture(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function() {
        const preview = document.getElementById('profile-picture-preview');
        preview.src = reader.result;
    };

    reader.readAsDataURL(input.files[0]);
}

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

function addOption(select, value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
}

document.getElementById('paisNacimiento').addEventListener('change', function() {
    const paisSeleccionado = this.value;
    const ciudadNacimientoSelect = document.getElementById('ciudadNacimiento');

    if (paisSeleccionado) {
        ciudadNacimientoSelect.innerHTML = "<option value='' disabled selected>Selecciona una ciudad</option>";
        ciudadNacimientoSelect.disabled = false;
    }

    switch (paisSeleccionado) {
        case 'Ecuador':
            addOption(ciudadNacimientoSelect, 'Cuenca');
            addOption(ciudadNacimientoSelect, 'Quito');
            break;
        case 'Colombia':
            addOption(ciudadNacimientoSelect, 'Medellín');
            addOption(ciudadNacimientoSelect, 'Bogotá');
            break;
        case 'Argentina':
            addOption(ciudadNacimientoSelect, 'Buenos Aires');
            addOption(ciudadNacimientoSelect, 'Rosario');
            break;
        default:
            addOption(ciudadNacimientoSelect, 'Selecciona un país primero');
            break;
    }
});

let cedulasIngresadas = [];
document.getElementById('historiaClinicaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fotoPerfil = document.getElementById('profile-picture-preview');
    const fotoPerfilUrl = fotoPerfil.src;
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value.trim();
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const paisNacimiento = document.getElementById('paisNacimiento').value;
    const ciudadNacimiento = document.getElementById('ciudadNacimiento').value;
    const fechaActual = new Date();

    // Validar que la fecha de nacimiento no sea posterior a la fecha y hora actual
    if (fechaNacimiento > fechaActual) {
        alert("La fecha de nacimiento no puede ser posterior a la fecha y hora actual.");
        return;
    }

    // Validar cédula ecuatoriana
    if (paisNacimiento == 'Ecuador') {
        if (!validarCedula(cedula)) {
            alert("La cédula ingresada no es válida.");
            return;
        }
    }

    if (fotoPerfilUrl === 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg') {
        // Si es la imagen predeterminada, muestra una alerta y no permitas guardar
        alert("Por favor, selecciona una foto de perfil.");
        return;
    }

    if (cedulasIngresadas.includes(cedula)) {
        alert("La cédula ingresada ya ha sido registrada.");
        return;
    }

    let edadAnios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let edadMeses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    let edadDias = fechaActual.getDate() - fechaNacimiento.getDate();
    let edadHoras = fechaActual.getHours() - fechaNacimiento.getHours();

    // Corregir si la diferencia de meses o días es negativa
    if (edadMeses < 0 || (edadMeses === 0 && edadDias < 0)) {
        edadAnios--;
        edadMeses += 12;
        if (edadDias < 0) {
            const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
            edadDias += ultimoDiaMesAnterior;
            edadMeses--;
        }
    }

    // Corregir si la diferencia de horas es negativa
    if (edadHoras < 0) {
        edadDias--;
        edadHoras += 24;
    }

    // Agregar la persona al combo y limpiar los campos del formulario
    const comboPersonas = document.getElementById('comboPersonas');
    const option = document.createElement('option');
    option.text = nombre;
    option.value = JSON.stringify({
        nombre: nombre,
        cedula: cedula,
        direccion: direccion,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento, // Tomar solo hasta los minutos
        paisNacimiento: paisNacimiento,
        ciudadNacimiento: ciudadNacimiento,
        edad: `${edadAnios} años, ${edadMeses} meses, ${edadDias} días y ${edadHoras} horas`,
        fotoPerfilUrl: fotoPerfilUrl
    });
    console.log(fechaNacimiento)
    comboPersonas.disabled = false;
    comboPersonas.add(option);
    cedulasIngresadas.push(cedula);


    // Limpiar los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('paisNacimiento').value = '';
    document.getElementById('ciudadNacimiento').value = '';
    document.getElementById('ciudadNacimiento').disabled = true;
    document.getElementById('comboPersonas').value = '';
    fotoPerfil.src = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';
    // fotoPerfil.style.display = 'none';

    // Mostrar mensaje de éxito
    alert('Persona guardada con éxito');
});

document.getElementById('comboPersonas').addEventListener('change', function() {
    const selectedPersonData = JSON.parse(this.value);
    document.getElementById('consulta').disabled = false;
    const fotoPerfil = document.getElementById('profile-picture-preview');

    // Rellenar los campos con los datos de la persona seleccionada
    document.getElementById('nombre').value = selectedPersonData.nombre;
    document.getElementById('cedula').value = selectedPersonData.cedula;
    document.getElementById('direccion').value = selectedPersonData.direccion;
    document.getElementById('telefono').value = selectedPersonData.telefono;
    // document.getElementById('fechaNacimiento').value = selectedPersonData.fechaNacimiento;
    const fechaNacimiento = new Date(selectedPersonData.fechaNacimiento);
    const fechaNacFormateada = fechaNacimiento.toISOString().slice(0, 16);
    document.getElementById('fechaNacimiento').value = fechaNacFormateada;
    document.getElementById('paisNacimiento').value = selectedPersonData.paisNacimiento;
    document.getElementById('ciudadNacimiento').value = selectedPersonData.ciudadNacimiento;
    document.getElementById('nombre').disabled=true;
    document.getElementById('cedula').disabled=true;
    document.getElementById('direccion').disabled=true;
    document.getElementById('telefono').disabled=true;
    document.getElementById('fechaNacimiento').disabled=true;
    document.getElementById('paisNacimiento').disabled=true;
    fotoPerfil.src = selectedPersonData.fotoPerfilUrl;
    // fotoPerfil.style.display = 'block';

    // Mostrar la edad debajo del campo de fecha de nacimiento
    const edadSpan = document.getElementById('edadSpan');
    document.getElementById('edadSpan').style.display = 'block';
    edadSpan.textContent = `Edad: ${selectedPersonData.edad}`;
});

document.getElementById('comboPersonas').addEventListener('change', function() {
    const nombreSeleccionado = this.value;

    actualizarTablaConsultas(nombreSeleccionado);
    actualizarTablaHijos(nombreSeleccionado);
});

document.getElementById('comboPersonas').addEventListener('change', function() {
    const selectedPersonData = JSON.parse(this.value);
    const ciudadNacimientoSelect = document.getElementById('ciudadNacimiento');

    ciudadNacimientoSelect.innerHTML = '';

    switch (selectedPersonData.paisNacimiento) {
        case 'Ecuador':
            addOption(ciudadNacimientoSelect, 'Cuenca');
            addOption(ciudadNacimientoSelect, 'Quito');
            break;
        case 'Colombia':
            addOption(ciudadNacimientoSelect, 'Medellín');
            addOption(ciudadNacimientoSelect, 'Bogotá');
            break;
        case 'Argentina':
            addOption(ciudadNacimientoSelect, 'Buenos Aires');
            addOption(ciudadNacimientoSelect, 'Rosario');
            break;
        default:
            addOption(ciudadNacimientoSelect, 'Selecciona un país primero');
            break;
    }
});

let historialConsultas = {};

document.getElementById('guardarConsulta').addEventListener('click', function() {
    const nombreSeleccionado = document.getElementById('comboPersonas').value;
    const consultaDateTime = document.getElementById('consulta').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const fechaActual = new Date();
    const fechaConsulta = new Date(document.getElementById('consulta').value);

    if (!nombreSeleccionado) {
        alert('Por favor selecciona una persona.');
        return;
    }

    if (!consultaDateTime) {
        alert('Por favor ingresa una fecha y hora de consulta.');
        return;
    }

    if (fechaConsulta > fechaActual) {
        alert("La fecha de consulta no puede ser posterior a la fecha y hora actual.");
        return;
    }
    console.log(fechaNacimiento);
    console.log(fechaConsulta);
    if (fechaConsulta < fechaNacimiento) {
        alert("La fecha y hora de la consulta no pueden ser anteriores a la fecha de nacimiento del paciente.");
        return;
    }

    if (!historialConsultas[nombreSeleccionado]) {
        historialConsultas[nombreSeleccionado] = [];
    }

    historialConsultas[nombreSeleccionado].push(consultaDateTime);

    actualizarTablaConsultas(nombreSeleccionado);
    document.getElementById('consulta').value = '';
});

function actualizarTablaConsultas(nombre) {
    const tablaConsultas = document.getElementById('historialConsultas').getElementsByTagName('tbody')[0];

    tablaConsultas.innerHTML = '';

    if (historialConsultas[nombre]) {
        historialConsultas[nombre].forEach(function(consultaDateTime) {
            const consultaDate = new Date(consultaDateTime);
            const fila = tablaConsultas.insertRow();
            const celdaFecha = fila.insertCell(0);
            const celdaHora = fila.insertCell(1);
            celdaFecha.textContent = consultaDate.toLocaleDateString();
            celdaHora.textContent = consultaDate.toLocaleTimeString();
        });
    }
}


document.getElementById('limpiarTodo').addEventListener('click', function() {
    limpiar()
});

function limpiar(){
    // Limpiar los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('paisNacimiento').value = '';
    // document.getElementById('ciudadNacimiento').value = '';
    const ciudadNacimientoSelect = document.getElementById('ciudadNacimiento');
    ciudadNacimientoSelect.innerHTML = "<option value='' disabled selected>Selecciona una ciudad</option>";
    // ciudadNacimientoSelect.innerHTML = "<option value='' disabled selected>Selecciona una ciudad</option>";
    const fotoPerfil = document.getElementById('profile-picture-preview');

    fotoPerfil.src = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

    // Limpiar todos los campos del formulario
    // document.getElementById('comboPersonas').selectedIndex = 0;
    document.getElementById('comboPersonas').value = '';
    document.getElementById('consulta').value = '';
    document.getElementById('edadSpan').style.display = 'none';
    document.getElementById('nombre').disabled=false;
    document.getElementById('cedula').disabled=false;
    document.getElementById('direccion').disabled=false;
    document.getElementById('telefono').disabled=false;
    document.getElementById('fechaNacimiento').disabled=false;
    document.getElementById('paisNacimiento').disabled=false;
    // document.getElementById('ciudadNacimiento').disabled=false;
    // document.getElementById('comboPersonas').disabled=false;
    // document.getElementById('consulta').disabled=false;
    // Desactivar y poner en off el radio button
    const tieneHijoCheckbox = document.getElementById('tieneHijo');
    tieneHijoCheckbox.checked = false;
    tieneHijoCheckbox.disabled = true;

    // Ocultar la sección de registrar hijos
    const registrarHijosSection = document.getElementById('registrarHijosSection');
    registrarHijosSection.style.display = 'none';

    // Limpiar el historial de consultas
    // historialConsultas = {};
    actualizarTablaConsultas('');
    actualizarTablaHijos('');
}

document.getElementById('tieneHijo').addEventListener('change', function() {
    const registrarHijosSection = document.getElementById('registrarHijosSection');
    if (this.checked) {
        registrarHijosSection.style.display = 'block';
    } else {
        registrarHijosSection.style.display = 'none';
    }
});

document.getElementById('comboPersonas').addEventListener('change', function() {
    document.getElementById('tieneHijo').disabled = false;
});

let historialHijos = {};

document.getElementById('guardarHijos').addEventListener('click', function() {
    const nombreSeleccionado = document.getElementById('comboPersonas').value;
    const nombreHijo = document.getElementById('hijos').value;

    if (!nombreSeleccionado) {
        alert('Por favor selecciona una persona.');
        return;
    }

    if (!nombreHijo) {
        alert('Por favor ingresa una fecha y hora de consulta.');
        return;
    }

    if (!historialHijos[nombreSeleccionado]) {
        historialHijos[nombreSeleccionado] = [];
    }

    historialHijos[nombreSeleccionado].push(nombreHijo);

    actualizarTablaHijos(nombreSeleccionado);
    document.getElementById('hijos').value = '';
});

function actualizarTablaHijos(nombre) {
    const tablaHijos = document.getElementById('tablaHijos').getElementsByTagName('tbody')[0];

    tablaHijos.innerHTML = '';

    if (historialHijos[nombre]) {
        historialHijos[nombre].forEach(function(hijoNombre) {
            const fila = tablaHijos.insertRow();
            const celdaPaciente = fila.insertCell(0);
            const celdaHijo = fila.insertCell(1);
            const nombrePaciente = JSON.parse(nombre).nombre;
            celdaPaciente.textContent = nombrePaciente;
            celdaHijo.textContent = hijoNombre;
        });
    }
}
