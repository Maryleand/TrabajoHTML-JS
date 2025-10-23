//Aplicar clase a los botones del menu (cuando se encuentra en dicha pagina)
const pagactual = document.getElementById('pagactual')

pagactual.onmouseover = function(){
    pagactual.style.backgroundColor ='#073570';}

pagactual.onmouseout = function(){
    pagactual.style.backgroundColor ='#3D6EAD';}


//Funcion para cambiar position de la barra de navegacion al hacer scroll
const barnav = document.getElementById ('menu')

window.addEventListener('scroll', function() {
    const bannerHeight = document.getElementById('bannerlogo').offsetHeight;
    const barnav = document.getElementById ('menu');
        if (window.scrollY > bannerHeight) {
            barnav.style.position = 'fixed';
            barnav.style.top = '0%';
        } else {
            barnav.style.position = 'absolute';
            barnav.style.top = '30%'
        }});

        window.addEventListener('scroll', function() {
    const secciones = document.getElementsByClassName('sections');
    
    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        
        if (window.scrollY > seccion.offsetTop  - window.innerHeight / 2) {
            seccion.style.opacity = '1'; 
        }
    }
});

//Funcion para cargar conntenido XML
        function cargar() {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    mostrar(this);
                }
            };
            xhttp.open("GET", "assets/noticias.xml", true);
            xhttp.send();
        }
        function mostrar(xml) {
            let nom, i, objHttp, cadena;
            objHttp = xml.responseXML;
            cadena = "";
            const titulos = objHttp.getElementsByTagName('titulo');
            const descripciones = objHttp.getElementsByTagName('descripcion');
            const fechas = objHttp.getElementsByTagName('fecha');
            const imagenes = objHttp.getElementsByTagName('imagen');
            for (i = 0; i < titulos.length; i++) {
                cadena += "<div id='cuerpoNoticias'> <h4>" + titulos[i].childNodes[0].nodeValue + "</h4>";
                cadena += fechas[i].childNodes[0].nodeValue + "<br><br>";
                cadena += descripciones[i].childNodes[0].nodeValue + "</div>";
                cadena += "<div id='imgNoticias'><img src='" + imagenes[i].childNodes[0].nodeValue + "' alt='Portada de noticia' id='imgNoticias'></div><br/>";}
            document.getElementById("noticias").innerHTML = cadena;
        }


//Funciones para el formulario en presupuesto.html

//Focus primer input
presupuesto.nombre.focus()

//Array productos
let contenedor = []

//Elementos

const selectorproducto = document.getElementById("seleccionproducto")
const botonagregar = document.getElementById("agregar")
const contenedorSeleccion = document.getElementById("productoSeleccionado")
const elementototalfinal = document.getElementById("total-final")

//Evento para agregar productos

botonagregar.addEventListener('click', () => {
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