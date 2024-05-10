function crearFormulario() {
    var numPreguntas = document.getElementById('numPreguntas').value;
    var formularioHTML = '';
    formularioHTML += '<form id="gen">';

    for (var i = 0; i < numPreguntas; i++) {
        formularioHTML += '<div class="form-group mt-4">';
        formularioHTML += '<label for="pregunta' + (i + 1) + '">Pregunta ' + (i + 1) + ':</label>';
        formularioHTML += '<input type="text" class="form-control" id="pregunta' + (i + 1) + '" name="pregunta' + (i + 1) + '" required>';
        formularioHTML += '<div id="respuestas' + (i + 1) + '"></div>';
        formularioHTML += '</div>';

        formularioHTML += '<div class="form-group mt-2">';
        formularioHTML += '<label for="tipoPregunta' + (i + 1) + '">Tipo de pregunta:</label>';
        formularioHTML += '<select class="form-control" id="tipoPregunta' + (i + 1) + '" name="tipoPregunta' + (i + 1) + '" onchange="mostrarRespuesta(' + (i + 1) + ')" required>';
        formularioHTML += '<option value="" disabled selected>Selecciona el tipo de pregunta</option>';
        formularioHTML += '<option value="texto">Pregunta de texto</option>';
        formularioHTML += '<option value="verdadero_falso">Pregunta de Verdadero/Falso</option>';
        formularioHTML += '<option value="opcion_multiple">Opción Múltiple</option>';
        formularioHTML += '</select>';
        formularioHTML += '</div>';
    }

    formularioHTML += '<button type="submit" class="btn btn-success mt-4" onclick="mostrarRespuestas()">Aceptar</button></form>';

    document.getElementById('formulario').innerHTML = formularioHTML;
    document.getElementById('respuestas').style.display = 'none';
    document.getElementById('configForm').style.display = 'none';
    // document.getElementById('pregunta' + numPregunta).style.display = 'none';
    // document.getElementById('numPreguntas' + numPregunta).style.display = 'none';
}

function mostrarRespuesta(numPregunta) {
    var tipoPregunta = document.getElementById('tipoPregunta' + numPregunta).value;
    var respuestaHTML = '';

    if (tipoPregunta === 'texto') {
        respuestaHTML += '<input type="text" class="form-control" id="respuesta' + numPregunta + '" name="respuesta' + numPregunta + '" placeholder="Ingrese su respuesta">';
    } else if (tipoPregunta === 'verdadero_falso') {
        respuestaHTML += '<div class="form-check">';
        respuestaHTML += '<input class="form-check-input" type="radio" name="respuesta' + numPregunta + '" id="verdadero' + numPregunta + '" value="verdadero">';
        respuestaHTML += '<label class="form-check-label" for="verdadero' + numPregunta + '">Verdadero</label>';
        respuestaHTML += '</div>';
        respuestaHTML += '<div class="form-check">';
        respuestaHTML += '<input class="form-check-input" type="radio" name="respuesta' + numPregunta + '" id="falso' + numPregunta + '" value="falso">';
        respuestaHTML += '<label class="form-check-label" for="falso' + numPregunta + '">Falso</label>';
        respuestaHTML += '</div>';
    } else if (tipoPregunta === 'opcion_multiple') {
        respuestaHTML += '<div class="form-group">';
        respuestaHTML += '<label for="cantidadOpciones' + numPregunta + '">Cantidad de opciones:</label>';
        respuestaHTML += '<select class="form-control" id="cantidadOpciones' + numPregunta + '" name="cantidadOpciones' + numPregunta + '" onchange="generarOpciones(' + numPregunta + ')">';
        respuestaHTML += '<option value="" disabled selected>Selecciona el numero de opciones</option>';
        respuestaHTML += '<option value="2">2</option>';
        respuestaHTML += '<option value="3">3</option>';
        respuestaHTML += '<option value="4">4</option>';
        respuestaHTML += '</select>';
        respuestaHTML += '</div>';

        respuestaHTML += '<div id="opciones' + numPregunta + '" style="display: none;"></div>';
    }


    document.getElementById('respuestas' + numPregunta).innerHTML = respuestaHTML;
    // document.getElementById('pregunta' + numPregunta).style.display = tipoPregunta === 'texto' ? 'block' : 'none';
}

function generarOpciones(numPregunta) {
    var cantidadOpciones = document.getElementById('cantidadOpciones' + numPregunta).value;
    var opcionesHTML = '';

    for (var i = 1; i <= cantidadOpciones; i++) {
        opcionesHTML += '<div class="form-group">';
        opcionesHTML += '<input type="text" class="form-control" id="opcion' + i + '_' + numPregunta + '" name="opcion' + i + '_' + numPregunta + '" placeholder="Opción ' + i + '">';
        opcionesHTML += '</div>';
    }

    opcionesHTML += '<button type="button" class="btn btn-primary" onclick="generarCheckboxes(' + numPregunta + ')">Generar Pregunta</button>';

    document.getElementById('opciones' + numPregunta).innerHTML = opcionesHTML;
    document.getElementById('opciones' + numPregunta).style.display = 'block';
}

function generarCheckboxes(numPregunta) {
    var opcionesSeleccionadas = document.getElementById('cantidadOpciones' + numPregunta).value;
    var checkboxesHTML = '';

    for (var i = 1; i <= opcionesSeleccionadas; i++) {
        var opcion = document.getElementById('opcion' + i + '_' + numPregunta).value;
        checkboxesHTML += '<div class="form-check">';
        checkboxesHTML += '<input class="form-check-input" type="checkbox" id="checkbox' + i + '_' + numPregunta + '" name="checkbox' + i + '_' + numPregunta + '" value="' + opcion + '">';
        checkboxesHTML += '<label class="form-check-label" for="checkbox' + i + '_' + numPregunta + '">' + opcion + '</label>';
        checkboxesHTML += '</div>';
    }

    document.getElementById('respuestas' + numPregunta).innerHTML = checkboxesHTML;
}

function mostrarRespuestas() {

    document.getElementById('gen').addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('El formulario se ha enviado');
        var respuestasHTML = '';

        var numPreguntas = document.getElementById('numPreguntas').value;
        for (var i = 0; i < numPreguntas; i++) {
            var pregunta = document.getElementById('pregunta' + (i + 1)).value;
            var tipoPregunta = document.getElementById('tipoPregunta' + (i + 1)).value;

            var respuesta;
            if (tipoPregunta === 'texto') {
                respuesta = document.getElementById('respuesta' + (i + 1)).value;
            } else if (tipoPregunta === 'verdadero_falso') {
                respuesta = document.querySelector('input[name="respuesta' + (i + 1) + '"]:checked').value;
            } else if (tipoPregunta === 'opcion_multiple') {
                var opcionesSeleccionadas = [];
                for (var j = 1; j <= 4; j++) {
                    var opcion = document.getElementById('checkbox' + j + '_' + (i + 1));
                    if (opcion && opcion.checked) {
                        opcionesSeleccionadas.push(opcion.value);
                    }
                }
                respuesta = opcionesSeleccionadas.join(', ');
            }

            respuestasHTML += 'Pregunta ' + (i + 1) + ': ' + ' Respuesta: ' + respuesta + '\n';
        }

        document.querySelector('#respuestas textarea').value = respuestasHTML;
        document.getElementById('respuestas').style.display = 'block';
    });
}