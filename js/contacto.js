//Configuracion mapa
            // Direccion + zoom
            var mimapa = L.map("Mapa").setView([36.7213, -4.4214], 15);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 18, 
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            }).addTo(mimapa); 

            var destinoFijo = L.latLng(36.7215, -4.4198);

            function calcularRutaDesdeUsuario() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        // Obtiene las coordenadas del usuario
                        var ubicacionUsuario = L.latLng(position.coords.latitude, position.coords.longitude);
                        
                        // Agrega un marcador en la ubicación del usuario (opcional)
                        L.marker(destinoFijo).addTo(mimapa).bindPopup('Encuentranos aquí').openPopup();
                        
                        // Crea el control de ruta con waypoints dinámicos
                        L.Routing.control({
                            waypoints: [
                                ubicacionUsuario,  // Inicio: Ubicación del usuario
                                destinoFijo        // Destino: Fijo
                            ],
                            show: true,
                            addWaypoints: false
                        }).addTo(mimapa);
                        
                    });
                }
            }

calcularRutaDesdeUsuario(); 