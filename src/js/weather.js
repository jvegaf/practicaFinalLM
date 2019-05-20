const DIR = "http://www.aemet.es/xml/municipios/localidad_28065.xml";

function getWeather(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var ciudad = document.getElementById('ciudad');
        var temperatura = document.getElementById('temperatura');
        var icono = document.getElementById('icono');

        var response = request.responseText;
        parseTemp(response);
    }
}

function parseTemp(xml){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    var obj = parse(xmlDoc);
    console.log(obj);
}