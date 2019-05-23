const dir = "http://api.openweathermap.org/data/2.5/weather?q=Getafe&units=metric&mode=xml&APPID=6ec8ba41495f87e27a0ed9f86b17fff6";

/**
 * Obtiene un XML con el tiempo que hace en Getafe
 */

function getWeather() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = request.responseXML;
            var temp = parseTemp(response);
            temp.value += " ºC";
            var _temp = document.getElementById('temperatura');
            _temp.innerHTML = temp.value;

        }
    }
    request.open("POST", dir, true); /* he usado POST porque va la api-key */ 
    request.send();
}

function getMain(){
    return '<div class="title"><h1>Como llego a ...</h1></div><form action="" method="get" class="d-flex" onsubmit="return getResponse()"><input type="search" class="form-control form-control-lg" name="buscar" id="busca_form"><input type="submit" class="btn btn-primary btn-lg buscaBtn" value="Buscar"></form>';
}

function getFooter(){
    return '<div class="d-flex justify-content-center align-items-center"><p>Creado por Jose Vega con licencia Creative Commons w/ share alike</p></div>';
}

function parseTemp(xml) {
    var x = xml.getElementsByTagName('temperature');
    var temp = x[0].attributes[0];
    //console.log(temp);
    return temp;
}

function getJSON() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        let objeto = JSON.parse(this.responseText);
        let origen = objeto.routes[0].legs[0].start_address;
        let destino = objeto.routes[0].legs[0].end_address;
        let steps = objeto.routes[0].legs[0].steps;
        muestraOrigen(origen);
        muestraDestino(destino);
        muestraLosPasos(steps);
    }
    request.open("GET", "response-data-export.json", true);
    request.send();
}

function muestraOrigen(origen) {
    let card = '<div class="card w-75 border-primary"><div class="card-header bg-secondary text-white">Origen</div>';
    card += '<div class="card-body"><h5 class="card-title">'
    card += origen;
    card += '</h5></div></div>';
    document.getElementById('resultOrigen').innerHTML = card;
}

function muestraDestino(destino) {
    let card = '<div class="card w-75 border-primary"><div class="card-header bg-secondary text-white">Destino</div>';
    card += '<div class="card-body"><h5 class="card-title">'
    card += destino;
    card += '</h5></div></div>';
    document.getElementById('resultDestino').innerHTML = card;
}

function creaTarjetaDePaso(numero, paso){
    let card = '<div class="card border-primary mt-4 w-75"><div class="card-header bg-info text-white">Paso ';
    card += numero;
    card += '</div>';
    card += '<div class="card-body"><h5 class="card-title">';
    card += paso.html_instructions;
    card += '</h5></div></div>';
    return card;
}

function getResponse(){
    alert('no te enfades, pero te voy dar las indicaciones para ir al estadio Metropolitano como ejemplo');
    let detail = document.getElementById('main');
    detail.innerHTML = "";
    detail.innerHTML = scaffoldResponse();
    getJSON();
}

function scaffoldResponse(){
    return '<section class="results d-flex flex-column justify-content-center"><div id="resultOrigen" class="d-flex justify-content-center mt-4"></div><div id="resultDestino" class="d-flex justify-content-center mt-4 mb-4"></div><div id="resultPasos"></div></section';
}
 
function muestraLosPasos(steps) {
    let htmlCards = "";
    for (let j = 0; j < steps.length; j++) {
        htmlCards += creaTarjetaDePaso(j+1, steps[j]);
    }
    document.getElementById('resultPasos').innerHTML = htmlCards;
}

window.onload = function () {
    document.getElementById('ciudad').innerHTML = "Getafe";
    getWeather();
    document.getElementById('main').innerHTML = getMain();

    /*He tenido que quitar el footer porque para que el footer se quede en 
    su sitio dinamicamente debo cargar el contenido del padre dinamicamente (que en este caso seria body).
    He intentado cargarlo dinamicamente pero no se coloca en su sitio, y no me queda tiempo 
    para poder arreglarlo */

    //document.getElementById('footer').innerHTML = getFooter();
}


