//Mapas base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        + 'contributors', maxZoom: 18

});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


//Capas adicionales
var departamentos = L.tileLayer.wms("http://localhost:8080/geoserver/proyectofinal/wms", {
    layers: 'departamentos',
    format: 'image/png',
    transparent: true,
    tiled: true,
    attribution: "Departamentos"

});
var municipios = L.tileLayer.wms("http://localhost:8080/geoserver/proyectofinal/wms", {
    layers: 'municipios',
    format: 'image/png',
    transparent: true,
    tiled: true,
    attribution: "Municipios"

});


//Mapa
const map = L.map('mapa', {
    center: [1.614433, -75.609455],
    zoom: 5,
    layers: [osm],
    scrollWheelZoom: true
});


//Titulo
var title = L.control();
title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<h2>Áreas protegidas</h2>Colombia'; return div;
};
//departamentos.addTo(map);
//title.addTo(map);


//Estilos áreas protegidas
function getColorareas(d) {
    return d == 'Distritos Regionales de Manejo Integrado' ? '#2605cb' :
        d == 'Belmira' ? '#0094ff' :
            d == 'Los Picachos' ? '#00ff00' :
                d == 'Santanderes' ? '#00571a' : '#76b5c5';
};
function styleareas(feature) {
    return {
        fillColor: getColorareas(feature.properties.categoria),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}


// Capa áreas WFS
var owsrootUrl = 'http://localhost:8080/geoserver/proyectofinal/wfs';

var defaultParametersPara = {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: 'areasprotegidas',
    outputFormat: 'application/json'
};

var parametersPara = L.Util.extend(defaultParametersPara);
var url = owsrootUrl + L.Util.getParamString(parametersPara);

var areas = new L.geoJson(null, {
    style: styleareas,
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`
        <form action="visita" class="login-container" method="POST">
        <p><h2>`+ feature.properties.nombre +`</h2></p>
        <p><img src="`+ feature.properties.imagen +`"/></p>
        <p><input id="correo" name="correo" type="email" placeholder="Correo"></p>
        <p><input id="contraseña" name="contraseña" type="password" placeholder="Contraseña"></p>
        <p><input type="submit" value="Registrar"></p>
      </form>
        
        <hr>
        <h3>Categoría: <h4>`+ feature.properties.categoria +`</h4></h3>
        <h3>Coordenadas: </h3><h4>`+ feature.properties.centroid_y +` `+ feature.properties.centroid_x +`</h4>
        <h3>Hectáreas: </h3><h4>`+ feature.properties.hectareas0 +`</h4>
        <hr>
        <h3>Para más información visita: </h3><h4><a href="`+ feature.properties.url +`">`+feature.properties.nombre+` RUNAP</a></h4>
        <hr>`);
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


//Control Search
var searchControl = new L.Control.Search({
    layer: areas,
    propertyName: 'nombre'
});
searchControl.on('search:locationfound', function (e) {
    e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
});

map.addControl(searchControl);


// Control de Capas
var baseMaps = [
    {
        groupName: "Mapas base",
        expanded: false,
        layers: {
            "<img src='https://cdn-icons.flaticon.com/png/512/1969/premium/1969118.png?token=exp=1658027820~hmac=f462db24254e7817422217fb75b4804e' height=15px, width=15px /> Satellite": googleSat,
            "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png' height=15px, width=15px /> OpenStreetMaps": osm,
            "<img src='https://cdn-icons-png.flaticon.com/512/854/854929.png' height=15px, width=15px /> Streets": googleStreets,
            "<img src='https://cdn-icons-png.flaticon.com/512/5987/5987080.png' height=15px, width=15px /> Terrain":googleTerrain
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
    exclusive: false,
    collapsed: true,
    position: 'topright'
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);
console.log(control.selectLayer)


//Minimapa
var googlesat2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        + 'contributors',
    maxZoom: 18
});

var miniMap = new L.Control.MiniMap(googlesat2,
{
    toggleDisplay: true,
    minimized: false,
    position: "bottomleft"
}).addTo(map);


//Control de Escala
L.control.scale({
    position: 'bottomleft',
    imperial: true
})
.addTo(map);    

//Leyenda
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<img src= " http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=leyenda" alt="legend" width="100" height="130">';
    return div;
};
legend.addTo(map);
