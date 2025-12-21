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
                cadena += "<h2>" + titulos[i].childNodes[0].nodeValue + "</h2><div id='noticiaeImg'><div id='cuerpoNoticias'>";
                cadena += fechas[i].childNodes[0].nodeValue + "<br><br>";
                cadena += descripciones[i].childNodes[0].nodeValue + "</div>";
                cadena += "<div><img src='" + imagenes[i].childNodes[0].nodeValue + "' alt='Portada de noticia' id='imgNoticias' width='640' height='360' ></div></div>";}
            document.getElementById("noticias").innerHTML = cadena;
        }

cargar();