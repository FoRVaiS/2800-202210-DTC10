document.addEventListener("DOMContentLoaded", () => {
  // createMap();

    var navSearch = document.getElementById("tags");
    var searchButton = document.getElementById("search-input");
    searchButton.remove();
    navSearch.remove();


  var id = localStorage.getItem("id");
  payRow(id);
  searchCompany();

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
  // map.locate({setView : true});
  var markersLayer = new L.LayerGroup();	//layer contain searched elements
  map.addLayer(markersLayer);
  var search = localStorage.getItem("search");
  var lastOption;
  
  for(i in data) {
    if (data[i].title === search) {
        var title = data[i].title,	//value searched
        loc = data[i].loc,		//position found
        marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
        marker.bindPopup('title: '+ title );
        markersLayer.addLayer(marker);
        lastOption = L.latLng(loc);
    }
  }
  L.tileLayer('/proxy/api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}/?access_token=pk.eyJ1Ijoic2hleWJhcnBhZ2dhIiwiYSI6ImNsM2M4OXBhejAxenMza2ttMG9sY2hmZWUifQ.gROseElh69DhGrFREjMSPg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token',
    center: lastOption
}).addTo(map);
map.setView(lastOption, 13)

})

$( function() {
    var availableTags = [
      "McDonald's",
      "No Frills",
      "Real Canadian Superstore",
      "Winners",
      "Shopper's Drug Mart"
    ];
    $( "#search" ).autocomplete({
      source: availableTags
    });
  } );

 
  function userInfo(data) {
    var jobBox = document.createElement("div");
    jobBox.classList.add("d-flex");
    jobBox.classList.add("align-items-start");
    jobBox.classList.add("flex-column");
    var userBox = document.getElementById("userInfo");
    var company = document.createElement("h3");
    var position = document.createElement("h4");
    var pay = document.createElement("h2");
    var payBox = document.createElement("div");
    payBox.classList.add("d-flex");
    payBox.classList.add("justify-content-center");
    payBox.appendChild(pay);
    company.textContent = `Company: ${data.company}`
    position.textContent = `Position: ${data.position}`
    pay.textContent = `$${data.salary}/hr`
    jobBox.appendChild(company);
    jobBox.appendChild(position);
    userBox.appendChild(jobBox);
    userBox.appendChild(payBox);
}

function payRow(id) {

    var main = document.getElementById("Pay-Table");
    var currentUserJob = localStorage.getItem("search");

    fetch("/api/v1/salary", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }).then(data => data.json()).then(data => {
        var users = data.data;
        users.forEach(element => {        
            if (element.userId === id) {
                userInfo(element);
            }
        })
            users.forEach(element => {
            if(element.company.toLowerCase() === currentUserJob.toLowerCase()) {
                fetch(`/api/v1/user/id/${element.userId}`, {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                }).then(userPersonal => userPersonal.json()).then(userPersonal => {
                    var tr = main.insertRow();
                    tr.setAttribute("id", `${element.postId}`);
                    var company = tr.insertCell();
                    var gender = tr.insertCell();
                    var age = tr.insertCell();
                    var pay = tr.insertCell();
                    var report = tr.insertCell();

                    var reportButton = document.createElement("button");
                    reportButton.type = "button";
                    reportButton.classList.add("btn");
                    reportButton.classList.add("btn-danger");
                    reportButton.classList.add("btn-sm");

                    reportButton.addEventListener("click", () => {
                        createReport(element.postId);
                    })
                    reportButton.innerHTML = "Report";
                    company.appendChild(document.createTextNode(`${element.company}`));
                    gender.appendChild(document.createTextNode(`${userPersonal.data.gender}`));
                    age.appendChild(document.createTextNode(`${userPersonal.data.age}`));
                    pay.appendChild(document.createTextNode(`${element.salary}`));
                    report.appendChild(reportButton);
                })


               
            }
        })
    });

}

function searchCompany() {    
    var searchButton = document.getElementById("search-input");
    searchButton.addEventListener("click", () => {
        var input = document.getElementById("search").value;
        localStorage.setItem("search", `${input}`);
        return window.location.href = "/search";
    });
}



  