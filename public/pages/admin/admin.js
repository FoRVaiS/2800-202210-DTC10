window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");

  document.querySelector("#btnNav").addEventListener("click", () => {
    nav.classList.add("nav--open");
  });

  document.querySelector(".nav__overlay").addEventListener("click", () => {
    nav.classList.remove("nav--open");
  });
});

//jumbotron related items below
$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function () {
  $(".jumbotron").css({ height: $(window).height() + "px" });
});

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
  company.textContent = `Company: ${data.company}`;
  position.textContent = `Position: ${data.position}`;
  pay.textContent = `$${data.salary}/hr`;
  jobBox.appendChild(company);
  jobBox.appendChild(position);
  userBox.appendChild(jobBox);
  userBox.appendChild(payBox);
}

function payRow(id) {
  var main = document.getElementById("Pay-Table");
  var currentUserJob;

  fetch("/api/v1/salary", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      var users = data.data;
      users.forEach((element) => {
        if (element.userId === id) {
          currentUserJob = element.position;
          userInfo(element);
        }
      });
      users.forEach((element) => {
        if (element.position == currentUserJob) {
          fetch(`/api/v1/user/id/${element.userId}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          })
            .then((userPersonal) => userPersonal.json())
            .then((userPersonal) => {
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
              });
              reportButton.innerHTML = "Report";
              company.appendChild(
                document.createTextNode(`${element.company}`)
              );
              gender.appendChild(
                document.createTextNode(`${userPersonal.data.gender}`)
              );
              age.appendChild(
                document.createTextNode(`${userPersonal.data.age}`)
              );
              pay.appendChild(document.createTextNode(`${element.salary}`));
              report.appendChild(reportButton);
            });
        }
      });
    });
}

//fetch all users from database and display id, email, role in table
function userTable() {
  fetch(`/api/v1/user`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      var table = document.getElementById("all-users");
      var users = data.users;
      users.forEach((element) => {
        var tr = table.insertRow();
        tr.setAttribute("id", `${element.id}`);
        var id = tr.insertCell();
        var email = tr.insertCell();
        var role = tr.insertCell();

        id.appendChild(document.createTextNode(`${element._id}`));
        email.appendChild(document.createTextNode(`${element.email}`));
        role.appendChild(document.createTextNode(`${element.roles}`));
      });
    });
}
userTable();
fetchUsers();

//fetch all posts from database with boolean reported = True and display them in the table
function fetchReports() {
  fetch("/api/v1/post", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      var posts = data.data;
      var main = document.getElementById("reported-posts");
      posts.forEach((element) => {
        if (element.reported == true) {
          var tr = main.insertRow();
          tr.setAttribute("id", `${element.id}`);
          var company = tr.insertCell();
        }
      });
    });
}
fetchReports();
