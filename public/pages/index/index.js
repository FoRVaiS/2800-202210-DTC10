// const { append } = require("express/lib/response");

document.addEventListener("DOMContentLoaded", () => {
    createSalary();
})

function createSalary() {

    var container = document.createElement("div");
    container.classList.add("salary-box");

    var location = document.createElement("p");
    location.classList.add("location");

    var title = document.createElement("h3");
    title.classList.add("job-title");

    var salary = document.createElement("h3");

    var company = document.createElement("p");
    company.classList.add("company-title");

    var age = document.createElement("p");
    var gender = document.createElement("p");
    age.classList.add("small-info");
    gender.classList.add("small-info");

    let main = document.getElementById("salary-container");

    fetch("/accounts", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      }).then(data => {
          var id = data.uid;
      })

    var report = document.createElement("a");
    report.innerHTML = "R";
    report.onclick = createReport(id);
    main.appendChild(report);
}

function createReport(id) {
    fetch("/reports", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
}