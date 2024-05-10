document.addEventListener('DOMContentLoaded', function () {
    const configForm = document.getElementById('config-form');
    const configSubmitBtn = document.getElementById('config-submit');

    document.getElementById('pre').addEventListener('submit', function (event) {
        event.preventDefault();

        const numQuestionsInput = document.getElementById('num-questions');
        const numQuestions = parseInt(numQuestionsInput.value);

        document.getElementById("inicio").style.display = 'none';

        // Crear nuevo formulario de preguntas
        const questionForm = document.createElement('form');
        questionForm.id = 'question-form';
        questionForm.classList.add('mt-4');

        for (let i = 0; i < numQuestions; i++) {
            const questionNumber = i + 1;
            const questionText = `Pregunta ${questionNumber}`; // Texto de la pregunta

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('form-group');

            const questionLabel = document.createElement('label');
            questionLabel.textContent = questionText; // Agregar el texto de la pregunta al label
            questionLabel.setAttribute('for', `question-${questionNumber}-text`);

            const questionTextInput = document.createElement('input');
            questionTextInput.type = 'text';
            questionTextInput.id = `question-${questionNumber}-text`;
            questionTextInput.classList.add('form-control', 'mb-2');
            questionTextInput.labels = `Pregunta ${questionNumber}`;
            questionTextInput.placeholder = 'Escriba su pregunta aquí';
            questionTextInput.required = true;

            const questionTypeSelect = document.createElement('select');
            questionTypeSelect.id = `question-${questionNumber}-type`;
            questionTypeSelect.classList.add('form-control', 'mb-2');
            questionTypeSelect.required = true;
            questionTypeSelect.innerHTML = `
                  <option value="" selected>Seleccione un tipo de pregunta</option>
                  <option value="text">Pregunta de Texto</option>
                  <option value="boolean">Verdadero/Falso</option>
                  <option value="multiple">Opción Múltiple</option>
                `;

            questionTypeSelect.addEventListener('change', function () {
                const questionType = this.value;
                if (questionType === 'text') {
                    optionsDiv.innerHTML = `
                              <input class="form-control" type="text" name="respuesta-${questionNumber}" id="respuesta-${questionNumber}" placeholder="Ingrese su respuesta">
                          `;
                } else {
                    if (questionType === 'boolean') {
                        optionsDiv.innerHTML = `
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="question-${questionNumber}-option" id="option-${questionNumber}-true" value="Verdadero">
                              <label class="form-check-label" for="option-${questionNumber}-true">Verdadero</label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="question-${questionNumber}-option" id="option-${questionNumber}-false" value="Falso">
                              <label class="form-check-label" for="option-${questionNumber}-false">Falso</label>
                            </div>
                          `;
                    } else if (questionType === 'multiple') {
                        optionsDiv.innerHTML = `
                    <select class="form-control mb-2" id="multiple-options-${questionNumber}" required>
                        <option value="" selected>Seleccione el número de opciones</option>
                        <option value="2">2 opciones</option>
                        <option value="3">3 opciones</option>
                        <option value="4">4 opciones</option>
                    </select>
                    <div id="multiple-text-inputs-${questionNumber}"></div>
                    <button type="button" class="btn btn-primary mt-2" id="generate-checkboxes-${questionNumber}" style="display: none;">Guardar opciones</button>
                `;

                        const multipleOptionsSelect = document.getElementById(`multiple-options-${questionNumber}`);
                        const generateCheckboxesBtn = document.getElementById(`generate-checkboxes-${questionNumber}`);
                        const textInputsDiv = document.getElementById(`multiple-text-inputs-${questionNumber}`);

                        multipleOptionsSelect.addEventListener('change', function () {
                            const numOptions = parseInt(this.value);
                            let textInputsHTML = '';

                            for (let j = 0; j < numOptions; j++) {
                                textInputsHTML += `
                            <input type="text" class="form-control mb-2" id="option-text-${questionNumber}-${j + 1}" placeholder="Opción ${j + 1}">
                        `;
                            }

                            textInputsDiv.innerHTML = textInputsHTML;

                            // Mostrar el botón "Guardar opciones" cuando se selecciona un valor en el combo box
                            if (numOptions > 0) {
                                generateCheckboxesBtn.style.display = 'block';
                            } else {
                                generateCheckboxesBtn.style.display = 'none';
                            }
                        });

                        generateCheckboxesBtn.addEventListener('click', function () {
                            const numOptions = parseInt(multipleOptionsSelect.value);
                            let checkboxesHTML = '';

                            for (let j = 0; j < numOptions; j++) {
                                const textInput = document.getElementById(`option-text-${questionNumber}-${j + 1}`);
                                const optionValue = textInput.value.trim();
                                if (optionValue !== '') {
                                    checkboxesHTML += `
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox-${questionNumber}-${j + 1}" name="checkbox-${questionNumber}" value="${optionValue}">
                                    <label class="form-check-label" for="checkbox-${questionNumber}-${j + 1}">${optionValue}</label>
                                </div>
                            `;
                                }
                            }

                            if (checkboxesHTML !== '') {
                                textInputsDiv.innerHTML = checkboxesHTML;
                                generateCheckboxesBtn.style.display = 'none';
                            } else {
                                alert('Por favor, ingrese al menos una opción.');
                            }
                        });
                    }

                }
            });


            const optionsDiv = document.createElement('div');
            optionsDiv.id = `options-${questionNumber}`;

            questionDiv.appendChild(questionLabel);
            questionDiv.appendChild(questionTextInput);
            questionDiv.appendChild(questionTypeSelect);
            questionDiv.appendChild(optionsDiv);
            questionForm.appendChild(questionDiv);
        }

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.classList.add('btn', 'btn-primary', 'mt-3');
        submitBtn.textContent = 'Aceptar';
        questionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Validar que se hayan respondido todas las preguntas
            for (let i = 0; i < numQuestions; i++) {
                const questionText = document.getElementById(`question-${i + 1}-text`).value;
                const questionType = document.getElementById(`question-${i + 1}-type`).value;
                if (questionText.trim() === '') {
                    alert(`Por favor, ingrese una pregunta para la pregunta ${i + 1}.`);
                    return;
                }
                //     if (questionType === '') {
                //     alert(`Por favor, seleccione un tipo de pregunta para la pregunta ${i + 1}.`);
                //     return;
                // }
                //     if (questionType === 'text' && document.getElementById(`text-input-${i + 1}`).value.trim() === '') {
                //     alert(`Por favor, ingrese una respuesta para la pregunta de texto ${i + 1}.`);
                //     return;
                // }
                if (questionType === 'boolean' && !document.querySelector(`input[name="question-${i + 1}-option"]:checked`)) {
                    alert(`Por favor, seleccione una opción para la pregunta ${i + 1}.`);
                    return;
                }
                if (questionType === 'multiple' && !document.querySelector(`input[name="checkbox-${i + 1}"]:checked`)) {
                    alert(`Por favor, seleccione al menos una opción para la pregunta ${i + 1}.`);
                    return;
                }
            }

            // Recopilar respuestas y mostrarlas
            const answers = [];
            for (let i = 0; i < numQuestions; i++) {
                const questionText = document.getElementById(`question-${i + 1}-text`).value;
                const questionType = document.getElementById(`question-${i + 1}-type`).value;
                let answer;
                if (questionType === 'text') {
                    answer = document.getElementById(`respuesta-${i + 1}`).value;
                    // answer = document.getElementById(`text-input-${i + 1}`).value;
                } else if (questionType === 'boolean') {
                    const selectedOption = document.querySelector(`input[name="question-${i + 1}-option"]:checked`);
                    answer = selectedOption ? selectedOption.value : 'No respondida';
                } else if (questionType === 'multiple') {
                    const selectedOptions = document.querySelectorAll(`input[name="checkbox-${i + 1}"]:checked`);
                    console.log(selectedOptions);
                    answer = Array.from(selectedOptions).map(option => option.value).join(', ') || 'No respondida';
                }
                answers.push(`Pregunta ${i + 1}: ${questionText} - Respuesta: ${answer}`);
            }
            const resultDiv = document.createElement('div');
            document.querySelector('#respuestas textarea').value = answers.join('\n');
            document.getElementById('respuestas').style.display = 'block';

        });
        questionForm.appendChild(submitBtn);
        configForm.appendChild(questionForm);
    });
});