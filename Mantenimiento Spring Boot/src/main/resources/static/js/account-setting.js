/* Fin Loader */
document.getElementById('imageUploadSetting').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var imageUrl = URL.createObjectURL(file);
    document.getElementById('imagenUsuarioConfiguracion').src = imageUrl;
});

document.querySelectorAll('.verContraseña').forEach(function (button) {
    button.addEventListener('click', function () {
        var input = button.previousElementSibling;
        var img = button.querySelector('img');
        if (input.type === 'password') {
            input.type = 'text';
            img.src = '../assets/img/account-setting/ocultar-contrasena.svg'; // Cambia la imagen a "ocultar"
        } else {
            input.type = 'password';
            img.src = '../assets/img/account-setting/ver-contraseña.svg'; // Cambia la imagen a "ver"
        }
    });
});

