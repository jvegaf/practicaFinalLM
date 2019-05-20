const dir = "http://api.openweathermap.org/data/2.5/weather?q=Getafe&units=metric&mode=xml&APPID=6ec8ba41495f87e27a0ed9f86b17fff6";

/**
 * Obtiene un XML con el tiempo que hace en Getafe
 */

function getWeather() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            var response = request.responseXML;
            var temp = parseTemp(response);
            temp.value += " ºC";
            var _temp = document.getElementById('temperatura');
            _temp.innerHTML = temp.value;
            
        }
    }
    request.open("GET", dir, true);
    request.send();
}

function parseTemp(xml) {
    var x = xml.getElementsByTagName('temperature');
    var temp = x[0].attributes[0];
    //console.log(temp);
    return temp;
}


window.onload = function () {
    document.getElementById('ciudad').innerHTML = "Getafe";
    getWeather();
}

/**
 * esta es la funcion que se dispara con el metodo onsubmit del
 * formulario
 */

function buscaRuta(){
    var reqText = document.getElementById('busca_form').value;
    var consulta = sanitize(reqText);
    getSelfLocation(consulta);
}

/**
 * esta funcion transforma la cadena "calle moncloa madrid" en "calle+moncloa+madrid"
 * @param req 
 */

function sanitize(req){
    var reqArr = req.split(' ');
    var res = "";
    for (let index = 0; index < reqArr.length; index++) {
        const element = reqArr[index];
        res += element;
        if(index < (reqArr.length -1)){
            res+= "+";
        }
    }
    return res;
}

/**
 * obtener mi geolocalizacion a traves del API del navegador
 * @param {*} destino que se le pasamos por parametro
 */

function getSelfLocation(destino){
    /* mockeado para depuracion
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(peticion(destino));
    }else{
        alert('Tu navegador no es compatible con la geolocalizacion');
    }
    */
    peticion(destino);
}
/*
function peticion(destino, position){
    let origenLat = position.coords.latitude;
    let origenLon = position.coords.longitude;
    let req = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    req+= origenLat + "," + origenLon;
    req+= "&destination=" + destino;
    req+= "&mode=transit&language=es&key=AIzaSyBYsR-WKuJSziP1WysyPuc-bzyzQHESDxA";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = request.responseText;
            parseResponse(response);
        }        
    }
    request.open("POST", req, true);
    request.send();
}
mockeado para depuracion
*/

/**
 * el origen esta mockeado para depurar el codigo
 */
function peticion(destino){
    let req = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    req+= "calle+madrid+100+getafe";
    req+= "&destination=" + destino;
    req+= "&mode=transit&language=es&key=AIzaSyBYsR-WKuJSziP1WysyPuc-bzyzQHESDxA";
    let reqdos = new XMLHttpRequest();
    reqdos.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = request.responseText;
            console.log(response);
            parseResponse(response);
        }        
    }
    reqdos.open("GET", req, true);
    reqdos.send();
}

function parseResponse(response) {
    let resp = JSON.parse(response);
    console.log(resp);
}