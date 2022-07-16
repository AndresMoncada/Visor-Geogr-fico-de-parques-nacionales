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
		div.innerHTML +='<h2>Parques naturales</h2>Colombia'; return div;
	};
title.addTo(map);