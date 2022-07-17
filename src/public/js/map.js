var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'

        + 'contributors', maxZoom: 18

});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var departamentos = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'proyectofinal:departamento',
    format: 'image/png',
    transparent: true,
    tiled: true,
    attribution: "Natural Earth"

});
var municipios = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'proyectofinal:municipio',
    format: 'image/png',
    transparent: true,
    tiled: true,
    attribution: "Natural Earth"

});

const map = L.map('mapa', {
    center: [1.614433, -75.609455],
    zoom: 5,
    layers: [osm],
    scrollWheelZoom: true
});

var title = L.control();

title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<h2>Áreas protegidas</h2>Colombia'; return div;
};
departamentos.addTo(map);
title.addTo(map);


//Estilos paramos

function getColorParams(d) {
    return d == 'Distritos Regionales de Manejo Integrado' ? '#2605cb' :
        d == 'Belmira' ? '#0094ff' :
            d == 'Los Picachos' ? '#00ff00' :
                d == 'Santanderes' ? '#00571a' : '#76b5c5';
};

function styleParams(feature) {
    return {
        fillColor: getColorParams(feature.properties.categoria),
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
    typeName: 'proyectofinal:areaprotegida',
    outputFormat: 'application/json'
};
var parametersPara = L.Util.extend(defaultParametersPara);
var url = owsrootUrl + L.Util.getParamString(parametersPara);


var areas = new L.geoJson(null, {
    style: styleParams,
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Nombre: " + feature.properties.nombre);
    }
});

function loadGeojsonPara(data) {
    areas.addData(data);
    areas.addTo(map);
}

$.ajax({
    url: url,
    success: loadGeojsonPara
});

// Control de Capas
var baseMaps = [
    {
        groupName: "Mapas base",
        expanded: true,
        layers: {
            "Satellite": googleSat,
            "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png' height=15px, width=15px /> OpenStreetMaps": osm
        }
    }
];
var overlays = [{
    groupName: "General",
    expanded: true,
    layers: {
        "Municipos": municipios,
        "Departamentos": departamentos,
        "Áreas protegidas": areas,
    }
}];

var options = {
    container_width: "300px",
    group_maxHeight: "80px",
    exclusive: true,
    collapsed: true,
    position: 'topright'
};

//Esta función en el del repositorio, no la reconoce
var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);

//minimap
var googlesat2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        + 'contributors',
    maxZoom: 18
});

var miniMap = new L.Control.MiniMap(googlesat2,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomright"
    }).addTo(map);
