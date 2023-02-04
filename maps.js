// importar la biblioteca Leaflet
const L = require('leaflet');

// crear el mapa
const map = L.map('map').setView([0, 0], 13);

// agregar un fondo de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// escuchar el evento de clic en el botón de búsqueda
document.getElementById('search').addEventListener('click', function(e) {
    e.preventDefault;
  const address = document.getElementById('address').value;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
    .then(response => response.json())
    .then(data => {
      const lat = data[0].lat;
      const lng = data[0].lon;
      map.setView([lat, lng], 13);
      L.marker([lat, lng]).addTo(map);
    });
});















































let globalValue;


 function GetMap() {
        const map = new Microsoft.Maps.Map('#map', {
          credentials: 'ArFsMJZenTgrn67kKfZBw-p-7D6WEzZK3C6IsGLaS7IgQfgtj7cB4xH8ZF_34lt6'
        });
        document.getElementById('search').addEventListener('click', function(event) {
          event.preventDefault();
          const address = document.getElementById('address').value;
          const geocodeRequest = 'https://dev.virtualearth.net/REST/v1/Locations?query=' + encodeURIComponent(address) + '&key=ArFsMJZenTgrn67kKfZBw-p-7D6WEzZK3C6IsGLaS7IgQfgtj7cB4xH8ZF_34lt6';
          fetch(geocodeRequest)
            .then(response => response.json())
            .then(data => {
              if (data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
                const location = data.resourceSets[0].resources[0].point.coordinates;
                const lat = location[0]
                const lon = location[1]
                const ubication = {lat, lan}
                console.log(ubication)
                const center = new Microsoft.Maps.Location(location[0], location[1]);
                map.setView({ center: center, zoom: 10 });
                const pushpin = new Microsoft.Maps.Pushpin(center);
                map.entities.push(pushpin);
                const form = document.getElementById('product-form');
                const formData = new formData
                formData.append("lat",lat)
                formData.append("lon",lon)


          form.addEventListener('submit', async (event) => {
          event.preventDefault();

       
          const formData = new FormData(form);
             const lat = formData.append("lat", lat)
             const lon = formData.append("lon", lon)
     
             
     
    
  

        const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
    
          body: formData
                 });

        const product = await response.json();
         console.log(product);
  
       });
              }
            });


            
        });

        


      }