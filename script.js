const coordenadas = document.getElementById("coordenadas");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");
const velocidade = document.getElementById("velocidade");
var primeiraVez = true;


function initialize() {
    var earth = new WE.map('mapId');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
}



/*var map = L.map('mapId').setView([0, 0], 15);*/

/*var issIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [90,50],
    iconAnchor: [25, 16]
})*/

/*var marker = L.marker([0,0], {icon: issIcon}).addTo(map);*/

/*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/

const url = "https://api.wheretheiss.at/v1/satellites/25544";

function buscarDados() {

    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        latitude.textContent = dados.latitude.toFixed(5);
        longitude.textContent = dados.longitude.toFixed(5);
        altitude.textContent = parseInt(dados.altitude);
        velocidade.textContent = parseInt(dados.velocity);

        marker.setLatLng([dados.latitude, dados.longitude]);

        if (primeiraVez) { // se for a primeira vez que a função foi chamada, definir o zoom para 3
            map.setView([dados.latitude, dados.longitude], 3);
            primeiraVez = false;

            return;
        }
        
        map.setView([dados.latitude, dados.longitude]);

    })
}

buscarDados();

setInterval(function(){
    buscarDados();
}, 5000);