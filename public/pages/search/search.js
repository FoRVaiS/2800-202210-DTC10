document.addEventListener("DOMContentLoaded", () => {
  // createMap();

 var data =[{"loc": [49.250889, -123.004410], "title": "BCIT"}];


  var map = L.map('map');
  map.locate({setView : true});
  var markersLayer = new L.LayerGroup();	//layer contain searched elements
  map.addLayer(markersLayer);

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}/?access_token=pk.eyJ1Ijoic2hleWJhcnBhZ2dhIiwiYSI6ImNsM2M4OXBhejAxenMza2ttMG9sY2hmZWUifQ.gROseElh69DhGrFREjMSPg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);


  for(i in data) {
    var title = data[i].title,	//value searched
        loc = data[i].loc,		//position found
        marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
    marker.bindPopup('title: '+ title );
    markersLayer.addLayer(marker);
  }

})

$( function() {
    var availableTags = [
      "McDonald's",
      "No Frills",
      "Real Canadian Superstore"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );

 



  