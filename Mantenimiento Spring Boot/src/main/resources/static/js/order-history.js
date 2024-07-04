let pedidos = [
    { id: '#100', fecha: new Date('2020/01/01'), total: '$100.00', estado: 'Entregado' },
    { id: '#700', fecha: new Date('2022/09/01'), total: '$100.00', estado: 'Entregado' },
    { id: '#701', fecha: new Date('2022/10/08'), total: '$150.00', estado: 'Entregado' },
    { id: '#702', fecha: new Date('2022/11/15'), total: '$200.00', estado: 'Entregado' },
    { id: '#703', fecha: new Date('2022/12/22'), total: '$250.00', estado: 'Entregado' },
    { id: '#704', fecha: new Date('2023/01/29'), total: '$300.00', estado: 'Entregado' },
    { id: '#705', fecha: new Date('2023/02/05'), total: '$350.00', estado: 'Entregado' },
    { id: '#706', fecha: new Date('2023/03/12'), total: '$400.00', estado: 'Entregado' },
    { id: '#707', fecha: new Date('2023/04/19'), total: '$450.00', estado: 'Entregado' },
    { id: '#735', fecha: new Date('2023/06/01'), total: '$120.00', estado: 'Entregado' },
    { id: '#736', fecha: new Date('2023/07/08'), total: '$180.00', estado: 'Entregado' },
    { id: '#737', fecha: new Date('2023/08/15'), total: '$250.00', estado: 'Entregado' },
    { id: '#738', fecha: new Date('2023/09/08'), total: '$135.00', estado: 'Entregado' },
    { id: '#739', fecha: new Date('2023/10/15'), total: '$100.00', estado: 'Entregado' },
    { id: '#740', fecha: new Date('2023/11/22'), total: '$224.00', estado: 'Entregado' },
    { id: '#741', fecha: new Date('2023/12/30'), total: '$150.00', estado: 'Entregado' },
    { id: '#742', fecha: new Date('2024/01/07'), total: '$200.00', estado: 'Entregado' },
    { id: '#743', fecha: new Date('2024/02/14'), total: '$300.00', estado: 'Entregado' },
    { id: '#744', fecha: new Date('2024/03/21'), total: '$250.00', estado: 'Enviado' },
    { id: '#745', fecha: new Date('2024/04/28'), total: '$180.00', estado: 'Enviado' },
    { id: '#746', fecha: new Date('2024/05/05'), total: '$210.00', estado: 'Procesando' },
    { id: '#747', fecha: new Date('2024/05/13'), total: '$260.00', estado: 'Procesando' },
    { id: '#748', fecha: new Date('2024/06/20'), total: '$190.00', estado: 'Procesando' },
    { id: '#749', fecha: new Date('2024/07/27'), total: '$220.00', estado: 'Procesando' },
    { id: '#750', fecha: new Date('2024/08/03'), total: '$170.00', estado: 'Procesando' },
    { id: '#751', fecha: new Date('2024/09/10'), total: '$230.00', estado: 'Procesando' },
    { id: '#752', fecha: new Date('2024/10/17'), total: '$240.00', estado: 'Procesando' },
];

// Ordenar los pedidos por fecha de más reciente a más antiguo
pedidos.sort((a, b) => b.fecha - a.fecha);

let pedidosPorPagina = 10; // Número de pedidos por página
let paginaActual = 1; // Página actual

// Calcular el número total de páginas
let totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

// Generar los elementos de la paginación
function generarPaginacion() {
    let paginacion = document.querySelector('.pagination');

    // Crear el botón de la página anterior
    let pagAnterior = document.createElement('li');
    pagAnterior.id = 'pagAnterior';
    pagAnterior.classList.add('page-item');
    pagAnterior.innerHTML = '<a class="page-link" href="#"><span>&lsaquo;</span></a>';
    paginacion.appendChild(pagAnterior);

    // Crear un elemento de la lista para cada página
    for (let i = 1; i <= totalPaginas; i++) {
        let pagina = document.createElement('li');
        pagina.classList.add('page-item');
        pagina.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        paginacion.appendChild(pagina);
    }

    // Crear el botón de la página siguiente
    let pagSiguiente = document.createElement('li');
    pagSiguiente.id = 'pagSiguiente';
    pagSiguiente.classList.add('page-item');
    pagSiguiente.innerHTML = '<a class="page-link" href="#"><span>&rsaquo;</span></a>';
    paginacion.appendChild(pagSiguiente);

    // Agregar el manejador de eventos a los nuevos elementos de la paginación
    document.querySelectorAll('.page-link').forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            if (index === 0 && paginaActual > 1) {
                paginaActual--;
            } else if (index === totalPaginas + 1 && paginaActual < totalPaginas) {
                paginaActual++;
            } else if (index > 0 && index <= totalPaginas) {
                paginaActual = index;
            }

            generarPedidos();
            actualizarControles();
        });
    });
}

// Llamar a la función para generar los elementos de la paginación cuando se carga la página
generarPaginacion();

// Generar los pedidos para la página actual
function generarPedidos() {
    let inicio = (paginaActual - 1) * pedidosPorPagina;
    let fin = inicio + pedidosPorPagina;
    let pedidosPagina = pedidos.slice(inicio, fin);

    let filas = pedidosPagina.map(pedido => {
        let fechaFormateada = pedido.fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
        return `
          <tr>
            <td>${pedido.id}</td>
            <td>${fechaFormateada}</td>
            <td>${pedido.total}</td>
            <td>${pedido.estado}</td>
            <td><a href="order-details.html"> Ver detalles</a></td>
          </tr>
        `;
    });

    // Si no se tienen 10 filas, agregar filas de placeholders
    while (filas.length < 10) {
        filas.push(`
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
        `);
    }

    // Unir todas las filas en una sola cadena de texto
    let htmlFilas = filas.join('');

    // Agregar las filas al cuerpo de la tabla
    document.getElementById('itemsTabla').innerHTML = htmlFilas;
}

// Actualizar los controles de paginación
function actualizarControles() {
    document.querySelectorAll('.page-item.disabled').forEach(item => item.classList.remove('disabled'));
    document.querySelectorAll('.page-item.active').forEach(item => item.classList.remove('active'));

    if (paginaActual === 1) {
        document.getElementById('pagAnterior').classList.add('disabled');
    }

    if (paginaActual === totalPaginas) {
        document.getElementById('pagSiguiente').classList.add('disabled');
    }

    document.querySelector(`.page-item:nth-child(${paginaActual + 1})`).classList.add('active');
}

// Generar los pedidos y actualizar los controles cuando se carga la página
generarPedidos();
actualizarControles();