/* Loader */
const preloader = document.querySelector('.loader');

window.addEventListener('load', (event) => {
    preloader.style.display = 'none';
});
/* Fin Loader */
//
document.addEventListener("DOMContentLoaded", function () {
    // Dropdowns: al pasar el mouse se muestr el contenido
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("mouseenter", function () {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.add('show');
            }
            this.classList.add('show');
        });

        dropdown.addEventListener("mouseleave", function () {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
            this.classList.remove('show');
        });
    });
//     Fin Dropdowns
    var myCarousel = document.getElementById('carouselExampleIndicators')
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 2000, // Cambia el valor para ajustar la velocidad del carrusel en milisegundos
        wrap: true // Cambia a false si no deseas que el carrusel vuelva al principio cuando llegue al último elemento
    })
    var myTestimonialCarousel = document.getElementById('testimonialCarousel')
    var testimonialCarousel = new bootstrap.Carousel(myTestimonialCarousel, {
        interval: 5000, // Cambia el valor para ajustar la velocidad del carrusel en milisegundos
        wrap: true // Cambia a false si no deseas que el carrusel vuelva al principio cuando llegue al último elemento
    })
});
// Inicio Carrusel
// $('.carousel').carousel({
//     interval: 2000
// })
/* Inicio Corazones rojos*/
document.querySelectorAll('.heart-icon').forEach(function (heartIcon) {
    heartIcon.addEventListener('click', function (event) {
        event.preventDefault();
        this.classList.toggle('filled');
    });
});
/* Fin Corazones rojos*/

// //Fin Carrusel

//CHONY NEW ARTICLE
document.addEventListener("DOMContentLoaded", function () {
    // Controlador categorias

    var categorias = [
        {
            nombre: 'Hombre',
            subcategorias: [
                {
                    nombre: 'Ropa',
                    subcategorias: [
                        {nombre: 'Camisetas', subcategorias: [{nombre: 'Manga corta'}, {nombre: 'Manga larga'}]},
                        {nombre: 'Camisas'},
                        {nombre: 'Polos'},
                        {nombre: 'Pantalones', subcategorias: [{nombre: 'Jeans'}, {nombre: 'Deportivos'}]},
                        {nombre: 'Jeans'},
                        {nombre: 'Shorts'},
                        {nombre: 'Trajes'},
                        {nombre: 'Chaquetas'},
                        {nombre: 'Sudaderas'},
                        {nombre: 'Ropa interior'},
                        {nombre: 'Ropa deportiva'}
                    ]
                },
                {
                    nombre: 'Calzado',
                    subcategorias: [
                        {nombre: 'Zapatillas'},
                        {nombre: 'Zapatos formales'},
                        {nombre: 'Botas'},
                        {nombre: 'Sandalias'}
                    ]
                },
                {
                    nombre: 'Accesorios',
                    subcategorias: [
                        {nombre: 'Gorras y sombreros'},
                        {nombre: 'Bufandas'},
                        {nombre: 'Corbatas y pajaritas'},
                        {nombre: 'Cinturones'},
                        {nombre: 'Relojes'},
                        {nombre: 'Gafas de sol'},
                        {nombre: 'Bolsos y mochilas'}
                    ]
                }
            ]
        },
        {
            nombre: 'Mujer',
            subcategorias: [
                {
                    nombre: 'Ropa',
                    subcategorias: [
                        {nombre: 'Blusas'},
                        {nombre: 'Camisetas'},
                        {nombre: 'Vestidos', subcategorias: [{nombre: 'Cortos'}, {nombre: 'Largos'}]},
                        {nombre: 'Faldas'},
                        {nombre: 'Pantalones'},
                        {nombre: 'Jeans'},
                        {nombre: 'Shorts'},
                        {nombre: 'Trajes'},
                        {nombre: 'Chaquetas'},
                        {nombre: 'Sudaderas'},
                        {nombre: 'Ropa interior'},
                        {nombre: 'Lencería'},
                        {nombre: 'Ropa deportiva'},
                        {nombre: 'Ropa de baño'}
                    ]
                },
                {
                    nombre: 'Calzado',
                    subcategorias: [
                        {nombre: 'Zapatillas'},
                        {nombre: 'Zapatos de tacón'},
                        {nombre: 'Botas'},
                        {nombre: 'Sandalias'}
                    ]
                },
                {
                    nombre: 'Accesorios',
                    subcategorias: [
                        {nombre: 'Sombreros'},
                        {nombre: 'Bufandas'},
                        {nombre: 'Joyería'},
                        {nombre: 'Bolsos'},
                        {nombre: 'Gafas de sol'},
                        {nombre: 'Relojes'},
                        {nombre: 'Cinturones'}
                    ]
                }
            ]
        },
        {
            nombre: 'Niños',
            subcategorias: [
                {
                    nombre: 'Ropa',
                    subcategorias: [
                        {nombre: 'Camisetas'},
                        {nombre: 'Camisas'},
                        {nombre: 'Pantalones'},
                        {nombre: 'Jeans'},
                        {nombre: 'Shorts'},
                        {nombre: 'Faldas'},
                        {nombre: 'Vestidos'},
                        {nombre: 'Sudaderas'},
                        {nombre: 'Chaquetas'},
                        {nombre: 'Ropa interior'},
                        {nombre: 'Ropa deportiva'},
                        {nombre: 'Ropa de baño'}
                    ]
                },
                {
                    nombre: 'Calzado',
                    subcategorias: [
                        {nombre: 'Zapatillas'},
                        {nombre: 'Zapatos formales'},
                        {nombre: 'Botas'},
                        {nombre: 'Sandalias'}
                    ]
                },
                {
                    nombre: 'Accesorios',
                    subcategorias: [
                        {nombre: 'Gorras y sombreros'},
                        {nombre: 'Bufandas'},
                        {nombre: 'Cinturones'},
                        {nombre: 'Mochilas'},
                        {nombre: 'Gafas de sol'}
                    ]
                }
            ]
        },
        {
            nombre: 'Mascotas',
            subcategorias: [
                {
                    nombre: 'Ropa para mascotas',
                    subcategorias: [
                        {nombre: 'Abrigos'},
                        {nombre: 'Sudaderas'},
                        {nombre: 'Camisetas'},
                        {nombre: 'Disfraces'}
                    ]
                },
                {
                    nombre: 'Accesorios',
                    subcategorias: [
                        {nombre: 'Collares'},
                        {nombre: 'Correas'},
                        {nombre: 'Arnés'},
                        {nombre: 'Juguetes'},
                        {nombre: 'Camas'},
                        {nombre: 'Placas de identificación'}
                    ]
                }
            ]
        },
        {
            nombre: 'Otras Categorías',
            subcategorias: [
                {
                    nombre: 'Ofertas y Descuentos',
                    subcategorias: [
                        {nombre: 'Rebajas'},
                        {nombre: 'Ofertas por temporada'},
                        {nombre: 'Liquidación'}
                    ]
                },
                {
                    nombre: 'Novedades',
                    subcategorias: [
                        {nombre: 'Nuevas colecciones'},
                        {nombre: 'Lanzamientos recientes'}
                    ]
                }
            ]
        }
    ];

    var categoriaSeleccionada = 'Categorías';
    var categoriaAnterior = 'Categorías';
    var nivelActual = categorias.map(function (cat) {
        return {nombre: cat.nombre, subcategorias: cat.subcategorias};
    }); // comienza con las categorías principales
    var nivelesAnteriores = [];  // para rastrear los niveles anteriores

    function actualizarDropdown() {
        var dropdown = document.getElementById('categoriasDropdown');  // obtén el menú desplegable de categorías

        // limpia las opciones existentes en el menú desplegable de categorías
        dropdown.innerHTML = '';

        // agrega una opción de "Volver" si no estamos en el nivel principal
        if (nivelesAnteriores.length > 0) {
            var titulo = document.createElement('div');
            titulo.innerHTML = '<div class="d-flex h2 justify-content-between align-items-stretch"><div class="img-flechaVolver ms-3"><img class="flechaVolver img-fluid" src="../assets/img/loadProduct/back-arrow.svg"></div> <span class="tituloCategoria mx-auto">' + categoriaSeleccionada + '</span></div>';
            titulo.classList.add('tituloContenedor');
            dropdown.appendChild(titulo);
        }

        // crea y agrega las nuevas opciones al menú desplegable de categorías
        for (var i = 0; i < nivelActual.length; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.textContent = nivelActual[i].nombre;
            a.classList.add('dropdown-item');
            li.appendChild(a);
            dropdown.appendChild(li);
        }
    }

    document.getElementById('categoriasDropdown').addEventListener('click', function (event) {
        event.preventDefault();
        var seleccion = event.target.textContent;  // obtén la selección del usuario

        if (event.target.classList.contains('flechaVolver')) {
            // vuelve al nivel anterior
            nivelActual = nivelesAnteriores.pop();
            categoriaSeleccionada = categoriaAnterior;
        } else {
            // avanza al siguiente nivel
            var categoria = nivelActual.find(function (categoria) {
                return categoria.nombre === seleccion;
            });
            if (categoria && categoria.subcategorias && categoria.subcategorias.length > 0) {
                nivelesAnteriores.push(nivelActual);
                nivelActual = categoria.subcategorias;
                categoriaAnterior = categoriaSeleccionada;
                categoriaSeleccionada = seleccion;
            }
        }

        actualizarDropdown();
    });

    actualizarDropdown();  // inicializa el menú desplegable

// Controlador imagenes

    var uploadedImages = [];
    var imageId = 0;  // Para generar un ID único para cada imagen

    function createDeleteHandler(imgSrc, imgContainerId) {
        return function (event) {
            event.preventDefault();

            // Elimina la imagen del array
            var index = uploadedImages.indexOf(imgSrc);
            if (index > -1) {
                uploadedImages.splice(index, 1);
            }

            // Elimina el contenedor de la imagen del DOM
            var imgContainer = document.getElementById(imgContainerId);
            imgContainer.parentNode.removeChild(imgContainer);
        };
    }

    function createRotateHandler(img) {
        return function (event) {
            event.preventDefault();

            // Obtiene el valor actual de la rotación
            var rotation = img.style.transform;

            // Calcula el nuevo valor de la rotación
            var newRotation;
            if (rotation) {
                var angle = parseInt(rotation.slice(7, -4));  // Extrae el ángulo actual de la cadena 'rotate(Xdeg)'
                newRotation = 'rotate(' + (angle + 90) + 'deg)';  // Añade 90 grados al ángulo actual
            } else {
                newRotation = 'rotate(90deg)';  // Si no hay rotación actual, establece la rotación en 90 grados
            }

            // Aplica la nueva rotación a la imagen
            img.style.transform = newRotation;
        };
    }

    document.getElementById('imageUpload').addEventListener('change', function (e) {
        var imageContainer = document.getElementById('contenedorFotos');

        // Valida la cantidad de archivos seleccionados
        if (this.files.length + uploadedImages.length > 9) {
            alert('No puedes seleccionar más de 9 imágenes');
        } else {
            // Agrega las nuevas imágenes al array
            for (var i = 0; i < this.files.length; i++) {
                uploadedImages.push(URL.createObjectURL(this.files[i]));
            }

            // Limpia el contenedor de imágenes
            imageContainer.innerHTML = '';

            // Crea y agrega las imágenes al contenedor
            for (var i = 0; i < uploadedImages.length; i++) {
                var img = document.createElement('img');
                img.src = uploadedImages[i];
                img.alt = 'Foto del artículo';
                img.classList.add('img-fluid', 'imgFotoArticulo');

                var imgContainer = document.createElement('div');
                imgContainer.classList.add('col-4', 'mb-3', 'position-relative');
                imgContainer.id = 'imgContainer' + imageId++;  // Asigna un ID único al contenedor de la imagen

                var card = document.createElement('div');
                card.classList.add('card');
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'p-0', 'cardImagen');
                cardBody.appendChild(img);

                var deleteButton = document.createElement('img');
                deleteButton.src = '../assets/img/loadProduct/delete.svg';
                deleteButton.classList.add('botonEliminar', 'btn-light');
                deleteButton.addEventListener('click', createDeleteHandler(img.src, imgContainer.id));

                var rotateButton = document.createElement('img');
                rotateButton.src = '../assets/img/loadProduct/rotate.svg';
                rotateButton.classList.add('botonRotar', 'btn-light');
                // En el controlador de imágenes, pasa el contenedor de la imagen a createRotateHandler
                rotateButton.addEventListener('click', createRotateHandler(img));

                cardBody.appendChild(deleteButton);
                cardBody.appendChild(rotateButton);
                card.appendChild(cardBody);
                imgContainer.appendChild(card);

                imageContainer.appendChild(imgContainer);
            }
        }

        // Limpia el valor del input de tipo file
        this.value = '';
    });

// document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
// });
});


// check that the document is ready
$(function () {
    async function obtenerCoordenadas(nombreUbicacion) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${nombreUbicacion}`);
            const data = await response.json();
            if (data.length > 0) {
                const latitud = data[0].lat;
                const longitud = data[0].lon;
                console.log("Latitud:", latitud);
                console.log("Longitud:", longitud);
                return {latitud, longitud};
            } else {
                console.log("No se encontraron resultados para la dirección proporcionada.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener las coordenadas:", error);
            return null;
        }
    }

    async function initMap() {
        // setup a few vars
        var marker, i;

        const coordenadas = await obtenerCoordenadas('Cuenca, Ecuador');

        if (coordenadas) {
            // setup our map
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15, // Zoom level adjusted to 12 for a closer view
                center: new google.maps.LatLng(coordenadas.latitud, coordenadas.longitud), // Coordinates for Quito, Ecuador
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // setup the info window (the popup bubble that display the info
            var infowindow = new google.maps.InfoWindow();

            $.getJSON('http://api.burstn.com/1/timeline/global?limit=400&callback=?', function (data) {
                console.log(data);
                $.each(data['body']['data'], function (i, v) {
                    // setup some variables
                    var coords = data['body']['data'][i]['coordinates'],
                        imgsrc = data['body']['data'][i]['image'],
                        caption = data['body']['data'][i]['caption'];

                    // setup the image markers
                    var image = new google.maps.MarkerImage(imgsrc['square'],
                        new google.maps.Size(20, 32),
                        new google.maps.Point(0, 32)
                    );

                    // check if this image has a lat set, if not, we skip it.
                    if (coords.latitude) {

                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(coords.latitude, coords.longitude),
                            icon: image,
                            map: map
                        });

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infowindow.setContent('<div class="picture"> <span class="title">' + caption + '</span><img src="' + imgsrc['medium'] + '" alt="" /></div>');
                                infowindow.open(map, marker);
                            }
                        })(marker, i));

                    } // end if

                });

            });
        }
    }

    initMap();
});

//FIN CHONY NEW-ARTICLE
// Controlador categorias

/*Inicio chat*/
function selectUser(userId) {
    // Clear existing messages
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = '';

    // Update the contact name
    const contactNameElement = document.getElementById('contact-name');
    contactNameElement.style.display = 'block';
    if (userId === 'user1') {
        contactNameElement.textContent = 'User 1';
    } else if (userId === 'user2') {
        contactNameElement.textContent = 'User 2';
    }

    // Add the input container to the message container
    const inputContainer = document.querySelector('.input-container');
    inputContainer.style.display = 'block';

    // Dummy messages for demonstration
    let messages = [];

    if (userId === 'user1') {
        messages = [
            {sender: 'User 1', message: '¡Hola! ¿Cómo estás?', time: '10:00 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'},
            {sender: 'Yo', message: '¡Hola! Estoy bien, ¿y tú?', time: '10:01 AM'}
        ];
    } else if (userId === 'user2') {
        messages = [
            {sender: 'User 2', message: '¡Hola! ¿Qué tal?', time: '10:05 AM'},
            {sender: 'Yo', message: '¡Hola! Todo bien por aquí.', time: '10:06 AM'}
        ];
    }

    // Add messages to the message container
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (message.sender === 'Yo') {
            messageElement.classList.add('sent');
        } else {
            messageElement.classList.add('received');
        }
        messageElement.innerHTML = `
        <span class="sender">${message.sender}</span>
        <span class="time">${message.time}</span>
        <p>${message.message}</p>
    `;
        messageContainer.appendChild(messageElement);
    });

    messageContainer.scrollTop = messageContainer.scrollHeight;


    // Show the input container when a user is selected
    inputContainer.style.display = 'block';

    // Update active user in the user list
    const userList = document.getElementsByClassName('user');
    for (let i = 0; i < userList.length; i++) {
        userList[i].classList.remove('active');
    }
    document.querySelector(`#user-list .user[data-user="${userId}"]`).classList.add('active');
}

/*Fin chat*/


// JavaScript para hacer zoom en la imagen
// var imgContainer = document.querySelector('.img-zoom-container');
// var img = document.querySelector('#mainImage');
//
// imgContainer.addEventListener('mousemove', function(e) {
//   var x = e.clientX - img.offsetLeft;
//   var y = e.clientY - img.offsetTop;
//
//   img.style.transformOrigin = x + 'px ' + y + 'px';
//   img.style.transform = 'scale(1.5)';
// });
//
// imgContainer.addEventListener('mouseleave', function() {
//   img.style.transformOrigin = 'center center';
//   img.style.transform = 'scale(1)';
// });

/*zoom imagen*/
document.getElementById('zoomImage').addEventListener('mousemove', zoom);
document.getElementById('zoomImage').addEventListener('mouseout', resetZoom);

function zoom(e) {
    var zoomer = e.currentTarget;
    var x, y;
    e.offsetX ? x = e.offsetX : x = e.touches[0].pageX;
    e.offsetY ? y = e.offsetY : y = e.touches[0].pageY;
    x = x / zoomer.offsetWidth * 100;
    y = y / zoomer.offsetHeight * 100;
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
    zoomer.style.backgroundSize = '200%'; // Apply zoom effect
}

function resetZoom(e) {
    var zoomer = e.currentTarget;
    zoomer.style.backgroundPosition = '50% 50%';
    zoomer.style.backgroundSize = 'contain'; // Reset to initial state
}

// Obtén todas las imágenes
var images = document.querySelectorAll('.product-image');

// Agrega un controlador de eventos de clic a cada imagen
images.forEach(function (img) {
    img.addEventListener('click', function () {
        // Cambia el fondo de zoomImage a la imagen en la que se hizo clic
        document.getElementById('zoomImage').style.backgroundImage = 'url(' + this.src + ')';
    });
});
/*fin zoom imagen*/

/*Inicio sign-in */

// Toogle Password
function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var toggleButton = document.getElementById("togglePassword");
    var toggleIcon = toggleButton.querySelector('i');

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function togglePasswordConfirmationVisibility() {
    var passwordFieldConf = document.getElementById("passwordConfirm");
    var toggleButtonConf = document.getElementById("togglePasswordConfirm");
    var toggleIconConf = toggleButtonConf.querySelector('i');

    if (passwordFieldConf.type === "password") {
        passwordFieldConf.type = "text";
        toggleIconConf.classList.remove('fa-eye');
        toggleIconConf.classList.add('fa-eye-slash');
    } else {
        passwordFieldConf.type = "password";
        toggleIconConf.classList.remove('fa-eye-slash');
        toggleIconConf.classList.add('fa-eye');
    }
}

// Fin Toogle Password
/*Fin sign-in */
/*Selecionar marca*/

function checkOther(select) {
    var otherBrandInput = document.getElementById('otherBrand');
    if (select.value === 'other') {
        otherBrandInput.style.display = 'block';
    } else {
        otherBrandInput.style.display = 'none';
    }
}
/*Fin seleccionar marca*/