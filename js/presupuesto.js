//Funciones para el formulario en presupuesto.html

//Focus primer input
presupuesto.nombre.focus()

//Array productos
let contenedor = []

//Elementos

const selectorproducto = document.getElementById("seleccionproducto")
const contenedorSeleccion = document.getElementById("productoSeleccionado")
const elementototalfinal = document.getElementById("total-final")

//Evento para agregar productos

selectorproducto.addEventListener('change', () => {
    const opcionselecionada = selectorproducto.options[selectorproducto.selectedIndex];
    const valorselecionado = opcionselecionada.value;

    if (!valorselecionado) {
        alert('Selecciona un producto válido');
        return;
    }

    const [nombreProducto, precioProducto] = valorselecionado.split(":");
    const precio = parseFloat(precioProducto);

    // Limpiar el carrito para asegurar solo un producto
    contenedor.length = 0;

    // Agregar el nuevo producto
    contenedor.push({ nombre: nombreProducto, precio });

    //Resetear el selector
    selectorproducto.selectedIndex = 0;

    actualizarContenedor();
});


//Actualizar contenedor de visualizacion seleccion

function actualizarContenedor(){
    //limpiar contenido anterior
    contenedorSeleccion.innerHTML=''

    let totalContenedor = 0

    //Mostrar productos

    contenedor.forEach((producto, index) =>{
        totalContenedor += producto.precio //cada objeto del array contenedor se llama producto, y se escoge el valor precio

        //Agrega producto + boton de eliminar
        const productoContenedor = document.createElement('div')
        productoContenedor.classList.add('articulo-contenedor')
        productoContenedor.innerHTML = `
        ${producto.nombre} - ${producto.precio.toFixed(2)}
        <button class='eliminararticulo' data-index='${index}'>Eliminar</button>
        `
        contenedorSeleccion.appendChild(productoContenedor)
    })

    //funcion para eliminar productos
    document.querySelectorAll('.eliminararticulo').forEach((boton)=> {
        boton.addEventListener('click', (e) => {
            const index = e.target.dataset.index
            eliminararticulo(index)
        })
    })

    actualizarTotalfinal()
}

//eliminar productos contenedor
function eliminararticulo(index){
contenedor.splice(index, 1)
//actualizar contenedor
actualizarContenedor()
}


//calcular y mostrar precio final

function actualizarTotalfinal(){
    let total = contenedor.reduce((suma, item) => suma + item.precio, 0)

    //sumar precio extras

    const extrasselecionados = document.querySelectorAll(".checkbox-extras:checked")
    extrasselecionados.forEach((checkbox) => {
        const [, precioExtra] = checkbox.value.split(':')
        total += parseFloat(precioExtra)
    })
    
    //sumar precio plazos 
    const tiempoPlazo = document.getElementById("Plazo")
    if(tiempoPlazo){
        const cantidadPlazo = parseFloat (tiempoPlazo.value)
        total = total / cantidadPlazo
    }

    //mostrar total
    elementototalfinal.textContent = `Total final: ${total.toFixed(2)} €`
}

//actualizar total cuando se selecione un extra

const checkoxextras = document.querySelectorAll(".checkbox-extras")
checkoxextras.forEach((checkbox) => {
    checkbox.addEventListener('change', actualizarTotalfinal)
})

//actualizar total cuando se selecione un plazo

const tiempoPlazo = document.getElementById("Plazo")
if (tiempoPlazo) {
    // Evento input para actualizar en tiempo real mientras se escribe
    tiempoPlazo.addEventListener('input', actualizarTotalfinal);
    
    // Llamada a la función para mostrar el total con el valor por defecto (1 mes)
    actualizarTotalfinal();
}

//Funcion validar        
function validar(presupuesto) {
    var valido = "s";
    var mensaje = "";
    if (presupuesto.nombre.value.trim() === "") {
        valido = "n";
        mensaje += "El campo nombre no puede estar vacio \n";
    }

    if (presupuesto.apellidos.value.trim() === "") {
        valido = "n";
        mensaje += "El campo apellidos no puede estar vacio \n";
    }

    var telefono = /^[0-9]{9}$/;
    if (!telefono.test(presupuesto.telefono.value)) {
        valido = "n";
        mensaje += "El telefono no es valido \n";
    }

    var email = /^(.+\@.+\..+)$/;
    if (!email.test(presupuesto.email.value)) {
        valido = "n";
        mensaje += "Email no valido \n";
    }

    if (!presupuesto.privacy.checked) {
        valido = "n";
        mensaje += "Debe aceptar las políticas de privacidad \n";
    }

    if (contenedor.length === 0 ){
        valido = "n";
        mensaje += "Debe seleccionar un producto \n";
    }

    if (valido === "n") {
        alert(mensaje);
        return false; // Evita el envío del formulario
    }
    return true; // Permite el envío del formulario si no hay errores

}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('presupuesto');
    form.addEventListener('submit', function(event) {
        if (!validar(form)) {
            event.preventDefault(); // Bloquea el envío si no es válido
        }
    });
})