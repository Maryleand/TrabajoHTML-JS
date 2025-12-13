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





