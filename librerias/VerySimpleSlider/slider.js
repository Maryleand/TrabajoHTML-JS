jQuery(document).ready(function ($) {

  var slideWidth = $('#slider ul li').outerWidth(); // ancho del slide incluyendo padding y borde
    var slideCount = $('#slider ul li').length;
  var autoPlayInterval = null; // Variable para guardar el intervalo

  // Ajustar el ancho del ul para que contenga todos los slides en línea
  $('#slider ul').css('width', slideWidth * slideCount);
  // Opcional: posicionar el ul para mostrar el primer slide correctamente
$('#slider ul').css('left', 0);

function moveLeft() {
    $('#slider ul').animate({
    left: '+=' + slideWidth
    }, 200, function () {
    $('#slider ul li:last-child').prependTo('#slider ul');
    $('#slider ul').css('left', 0);
    });
};

function moveRight() {
    $('#slider ul').animate({
    left: '-=' + slideWidth
    }, 200, function () {
    $('#slider ul li:first-child').appendTo('#slider ul');
    $('#slider ul').css('left', 0);
    });
};

$('a.control_prev').click(function (e) {
    e.preventDefault();
    moveLeft();
});

$('a.control_next').click(function (e) {
    e.preventDefault();
    moveRight();
});

$(document).ready(function () {
    // Iniciar autoplay al cargar la página
    autoPlayInterval = setInterval(function () {
        moveRight();
    }, 8000);
});

});

/*
Este código utiliza elementos del proyecto "Very Simple Slider" creado por Zuraiz.
Se ha obtenido el consentimiento para utilizar y modificar partes de su código.
*/
