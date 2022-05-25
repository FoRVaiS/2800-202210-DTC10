document.addEventListener("DOMContentLoaded", () => {
  // createMap();

 var data =[
   {"loc": [49.250889, -123.004410], "title": "BCIT"},
   {"loc": [49.218260, -123.077500], "title": "McDonald's"},
   {"loc": [49.206160, -123.125500], "title": "McDonald's"},
   {"loc": [49.198810, -122.981630], "title": "McDonald's"},
   {"loc": [49.227009, -123.000290], "title": "Winners"},
   {"loc": [49.2344482,-123.195723], "title": "Winners"},
   {"loc": [49.175152,-123.1322004], "title": "Winners"},
   {"loc": [49.2810216,-123.07462], "title": "No Frills"},
   {"loc": [49.2678023,-123.1428569], "title": "No Frills"},
   {"loc": [49.1647273,-122.797229], "title": "No Frills"},
   {"loc": [49.22694396972656,-123.09074401855469], "title": "Shoppers Drug Mart"},
   {"loc": [49.229635,-122.964486], "title": "Shoppers Drug Mart"},
   {"loc": [49.206356048583984,-123.0309829711914], "title": "Shoppers Drug Mart"},
   {"loc": [49.2735057,-122.7939624], "title": "Real Canadian Superstore"},
   {"loc": [49.2260065,-123.002356], "title": "Real Canadian Superstore"},
   {"loc": [49.1797165,-123.1392749], "title": "Real Canadian Superstore"}
  ];


  var map = L.map('map');
  map.locate({setView : true});
  var markersLayer = new L.LayerGroup();	//layer contain searched elements
  map.addLayer(markersLayer);

  L.tileLayer('/proxy/api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}/?access_token=pk.eyJ1Ijoic2hleWJhcnBhZ2dhIiwiYSI6ImNsM2M4OXBhejAxenMza2ttMG9sY2hmZWUifQ.gROseElh69DhGrFREjMSPg', {
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

 



  