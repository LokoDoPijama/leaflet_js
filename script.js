const coordenadas = document.getElementById("coordenadas");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");
const velocidade = document.getElementById("velocidade");
const switchUnidade = document.getElementById("switchUnidade");
var primeiraVez = true;

var earth = new WE.map('mapId');
WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '© OpenStreetMap contributors'
}).addTo(earth);

const url = "https://api.wheretheiss.at/v1/satellites/25544";

function buscarDados() {

    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        latitude.textContent = dados.latitude.toFixed(5);
        longitude.textContent = dados.longitude.toFixed(5);
        if (switchUnidade.checked) {
            altitude.textContent = Math.round(dados.altitude / 3.281)  + "ft";
            velocidade.textContent = Math.round(dados.velocity / 1.609)  + " mph";
        } else {
            altitude.textContent = Math.round(dados.altitude) + "m";
            velocidade.textContent = Math.round(dados.velocity) + " km/h";
        }
        

        if (primeiraVez) {
            
            /* se for a primeira vez que a função foi chamada, definir o zoom para 2.1 nas coordenadas [0, 0]
            para padronizar o zoom (pois quanto mais extrema for a latitude, mais sensível é o zoom, levando a 
            inconsistências) */

            earth.setView([0,0], 2.1);
            primeiraVez = false;

        }
        
        earth.setView([dados.latitude, dados.longitude]);

    })
}

function alternarUnidade() {

    if (switchUnidade.checked) {
        
        altitude.textContent = Math.round(parseInt(altitude.textContent) / 3.281) + "ft";
        velocidade.textContent = Math.round(parseInt(velocidade.textContent) / 1.609) + " mph";
    } else {
        altitude.textContent = Math.round(parseInt(altitude.textContent) * 3.281) + "m";
        velocidade.textContent = Math.round(parseInt(velocidade.textContent) * 1.609) + " km/h";
    }

}

buscarDados();

setInterval(function(){
    buscarDados();
}, 5000);