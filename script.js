const mapId = document.getElementById("mapId");
const divErro = document.getElementById("divErro");
const issImg = document.getElementById("issImg");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const altitude = document.getElementById("altitude");
const velocidade = document.getElementById("velocidade");
const switchUnidade = document.getElementById("switchUnidade");
var primeiraVez = true;


try {
    var earth = new WE.map('mapId');

    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);

} catch {
    divErro.classList.remove("d-none");
    issImg.classList.add("d-none");
}



const url = "https://api.wheretheiss.at/v1/satellites/25544";

function buscarDados() {

    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        latitude.textContent = dados.latitude.toFixed(5);
        longitude.textContent = dados.longitude.toFixed(5);
        if (switchUnidade.checked) {
            altitude.textContent = Math.round(dados.altitude / 1.609)  + "mi";
            velocidade.textContent = Math.round(dados.velocity / 1.609)  + " mph";
        } else {
            altitude.textContent = Math.round(dados.altitude) + "km";
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
    .catch(error => console.error(`Error fetching data: ${error.message}`));
}

function alternarUnidade() {

    if (switchUnidade.checked) {
        altitude.textContent = Math.round(parseInt(altitude.textContent) / 1.609) + "mi";
        velocidade.textContent = Math.round(parseInt(velocidade.textContent) / 1.609) + " mph";
    } else {
        altitude.textContent = Math.round(parseInt(altitude.textContent) * 1.609) + "km";
        velocidade.textContent = Math.round(parseInt(velocidade.textContent) * 1.609) + " km/h";
    }

}

buscarDados();

setInterval(function(){
    buscarDados();
}, 5000);