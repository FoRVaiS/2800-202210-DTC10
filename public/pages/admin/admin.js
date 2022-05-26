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

//fetch all reported posts and console.log them
function reportPosts() {
  fetch(`/api/v1/report`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      // for all reported posts append postid to an array
      var posts = data.reports;
      var reported_postID = [];
      posts.forEach((element) => {
        reported_postID.push(element.postId);
      });
      console.log(reported_postID);
    });
}
reportPosts();

// fetch all posts from database and if the postId matches reported_postID, show the post in the table
function postTable() {
  fetch(`/api/v1/report`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      // for all reported posts append postid to an array
      var posts = data.reports;
      var reported_postID = [];
      posts.forEach((element) => {
        reported_postID.push(element.postId);
      });
      fetch(`/api/v1/salary`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          var table = document.getElementById("reported-posts");
          var posts = data.data;
          posts.forEach((element) => {
            if (reported_postID.includes(element.postId)) {
              var tr = table.insertRow();
              tr.setAttribute("id", `${element.postId}`);
              var id = tr.insertCell();
              var company = tr.insertCell();
              var position = tr.insertCell();
              var salary = tr.insertCell();
              var deleteBut = tr.insertCell();
              var deleteButton = document.createElement("button");
              deleteButton.type = "button";
              deleteButton.classList.add("btn");
              deleteButton.classList.add("btn-danger");
              deleteButton.classList.add("btn-sm");
              deleteButton.addEventListener("click", () => {
                createDelete(element.id);
              });
              deleteButton.innerHTML = "Delete";
              var passBut = tr.insertCell();
              var passButton = document.createElement("button");
              passButton.type = "button";
              passButton.classList.add("btn");
              passButton.classList.add("btn-success");
              passButton.classList.add("btn-sm");
              passButton.addEventListener("click", () => {
                createPass(element.id);
              });
              passButton.innerHTML = "Pass";
              id.appendChild(document.createTextNode(`${element.postId}`));
              company.appendChild(
                document.createTextNode(`${element.company}`)
              );
              position.appendChild(
                document.createTextNode(`${element.position}`)
              );
              salary.appendChild(document.createTextNode(`${element.salary}`));
              deleteBut.appendChild(deleteButton);
              passBut.appendChild(passButton);
            }
          });
        });
    });
}

postTable();
