// const { append } = require("express/lib/response");

document.addEventListener("DOMContentLoaded", () => {
    createSalary();
})

function createSalary() {

    var id;

    fetch("/api/v1/user", {
        method: "get",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({users}),
      }).then(data => data.json()).then(data => {
        data.array.forEach(element => {
            if (element.__id == localStorage.getItem("acc")) {
                id = localStorage.getItem("acc");
            }
        });
      })
      payRow(id);
}

function payRow(id) {

    var main = document.getElementById("Pay-Table");
    var tr = main.insertRow();
    var currentUserJob;

    fetch("/api/v1/salary", {
        method: "get",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data}),
      }).then(data => data.json()).then(data => {
        data.forEach(element => {
            if (element.__id == id) {
                currentUserJob = element.position;
            }
        }).then(
            data.forEach(element => {
            if(element.position == currentUserJob) {
                var company = tr.insertCell();
                var gender = tr.insertCell();
                var age = tr.insertCell();
                var pay = tr.insertCell();
                company.appendChild(document.createTextNode(`${element.company}`));
                gender.appendChild(document.createTextNode(`${"temp"}`));
                age.appendChild(document.createTextNode(`${"temp"}`));
                pay.appendChild(document.createTextNode(`${element.salary}`));
            }
        }))
    });

}


function createReport(id) {
    fetch("/api/v1/report/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
}