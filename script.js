const coordenadas = document.getElementById("coordenadas");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
var primeiraVez = true;

var map = L.map('mapId').setView([0, 0], 15);

var issIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [90,50],
    iconAnchor: [25, 16]
})

var marker = L.marker([0,0], {icon: issIcon}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url = "http://api.open-notify.org/iss-now.json";

function buscarDados() {

    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        latitude.textContent = dados.iss_position.latitude;
        longitude.textContent = dados.iss_position.longitude;

        marker.setLatLng([dados.iss_position.latitude, dados.iss_position.longitude]);

        if (primeiraVez) {
            map.setView([dados.iss_position.latitude, dados.iss_position.longitude], 3);
            primeiraVez = false;

            return;
        }
        
        map.setView([dados.iss_position.latitude, dados.iss_position.longitude]);

    })
}

buscarDados();

setInterval(function(){
    buscarDados();
}, 5000);