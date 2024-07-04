let pedidos = [
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
];

// Ordenar los pedidos por fecha de más reciente a más antiguo
pedidos.sort((a, b) => b.fecha - a.fecha);

let filas = pedidos.map(pedido => {
    let fechaFormateada = pedido.fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
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

// Unir todas las filas en una sola cadena de texto
let htmlFilas = filas.join('');

// Agregar las filas al cuerpo de la tabla
document.getElementById('itemsTabla').innerHTML = htmlFilas;;