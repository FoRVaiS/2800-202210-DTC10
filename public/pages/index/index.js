// // const { append } = require("express/lib/response");

// document.addEventListener("DOMContentLoaded", () => {
//     createSalary();
// })

// function createSalary() {


//     //Change classes to Bootstrap containers 
//     var container = document.createElement("div");
//     container.classList.add("salary-box");

//     var location = document.createElement("p");
//     location.classList.add("location");

//     var title = document.createElement("h3");
//     title.classList.add("job-title");

//     var salary = document.createElement("h3");

//     var company = document.createElement("p");
//     company.classList.add("company-title");

//     var age = document.createElement("p");
//     var gender = document.createElement("p");
//     age.classList.add("small-info");
//     gender.classList.add("small-info");

//     let main = document.getElementById("salary-container");

//     fetch("/api/v1/user", {
//         method: "get",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({__id}),
//       }).then(data => data.json()).then(data => {
//             var id = data.uid;    
//             var report = document.createElement("a");
//             report.innerHTML = "R";
//             report.addEventListener("onClick", createReport(id));
//             main.appendChild(report);
//       })

// }

// function createReport(id) {
//     fetch("/api/v1/report/post", {
//         method: "post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
// }


document.addEventListener("DOMContentLoaded", () => {

var map = L.map('map');
map.locate({setView : true});
var markersLayer = new L.LayerGroup();	//layer contain searched elements
map.addLayer(markersLayer);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hleWJhcnBhZ2dhIiwiYSI6ImNsM2M4YXB0NzAxYWszbG9rMTNiN3poNDEifQ.d1_I76W_smy83ImELB7N4w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);


data =[{"loc": [49.250889, -123.004410], "title": "BCIT"}];

})