var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'

        + 'contributors', maxZoom: 18

});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const map = L.map('mapa', {
    center: [1.614433, -75.609455],
    zoom: 5,
    layers: [googleSat],
    scrollWheelZoom: true
});

var title = L.control();

title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<h2>Áreas protegidas</h2>Colombia'; return div;
};
title.addTo(map);


//Estilos paramos

function getColorParams(d) {
    return d == 'Altiplano' ? '#2605cb' :
        d == 'Belmira' ? '#0094ff' :
            d == 'Los Picachos' ? '#00ff00' :
                d == 'Santanderes' ? '#00571a' : '#cb7300';
};

function styleParams(feature) {
    return {
        fillColor: getColorParams(feature.properties.distrito),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}

// Capa Paramos WFS
var owsrootUrl = 'http://localhost:8080/geoserver/ows';

var defaultParametersPara = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: 'MoncadaParcialleaflet:paramos',
    outputFormat: 'application/json'
};
var parametersPara = L.Util.extend(defaultParametersPara);
var url = owsrootUrl + L.Util.getParamString(parametersPara);

console.log(url);


var paramos = new L.geoJson(null, {
    style: styleParams,
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Nombre: " + feature.properties.complejo);
    }
});

function loadGeojsonPara(data) {
    paramos.addData(data);
    paramos.addTo(map);
}

$.ajax({
    url: url,
    success: loadGeojsonPara
});