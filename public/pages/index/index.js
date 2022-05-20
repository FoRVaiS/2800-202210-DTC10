// const { append } = require("express/lib/response");

document.addEventListener("DOMContentLoaded", () => {
    createSalary();
})

function createSalary() {

    var id;

    fetch("/api/v1/user", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }).then(data => data.json()).then(data => {

          var users = data.users;
          
          users.forEach(element => {
            if (element.__id == localStorage.getItem("acc")) {
                id = localStorage.getItem("acc");
            }
        });
      })
      payRow(id);
}

function payRow(id) {

    var main = document.getElementById("Pay-Table");
    var currentUserJob;

    fetch("/api/v1/salary", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }).then(data => data.json()).then(data => {
        console.log(data)
        var users = data.data;
        console.log(users)
        users.forEach(element => {
            if (element.__id == id) {
                currentUserJob = element.position;
            }
        })
            users.forEach(element => {
            if(element.position == currentUserJob) {
                var tr = main.insertRow();
                tr.setAttribute("id", `${element.userId}`);
                var company = tr.insertCell();
                var gender = tr.insertCell();
                var age = tr.insertCell();
                var pay = tr.insertCell();
                company.appendChild(document.createTextNode(`${element.company}`));
                gender.appendChild(document.createTextNode(`${"temp"}`));
                age.appendChild(document.createTextNode(`${"temp"}`));
                pay.appendChild(document.createTextNode(`${element.salary}`));

                var r = document.createElement("a");

                r.innerHTML = "R";
                r.addEventListener("onclick", createReport(element.userId));

                var report = tr.insertCell();

                report.appendChild(r);
            }
        })
    });

}


function createReport(id) {
    fetch("/api/v1/report/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}),
      });
}