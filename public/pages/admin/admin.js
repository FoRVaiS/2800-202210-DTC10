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

//fetch all posts from database and display id, company, position, salary in table
var userPay;
var salary = [];
var company = [];
const userData = [];
var id = localStorage.getItem("id");

async function salaryTable() {
  var main = document.getElementById("all-posts");

  const { data: salaryPosts } = await fetchJson("/api/v1/salary");

  const currentUserSalaryPost = salaryPosts
    .filter((salary) => salary.userId === id)
    .pop();

  let currentUserJob = null;

  if (currentUserSalaryPost) {
    currentUserJob = currentUserSalaryPost.position;
    userPay = currentUserSalaryPost.salary;
  } else {
    const jobPositions = Array.from(
      new Set(salaryPosts.map((salary) => salary.position))
    );

    // There might be a better way to pick a random element in an array?
    currentUserJob =
      jobPositions[Math.floor(Math.random() * jobPositions.length)];
  }

  const salaryPostsPromises = salaryPosts.map(async (salaryPost) => {
    const personalUser = await fetchJson(
      `/api/v1/user/id/${salaryPost.userId}`
    );

    var tr = main.insertRow();
    tr.setAttribute("id", `${salaryPost.postId}`);
    var id = tr.insertCell();
    var company = tr.insertCell();
    var location = tr.insertCell();
    var job = tr.insertCell();
    var gender = tr.insertCell();
    var age = tr.insertCell();
    var pay = tr.insertCell();
    var deleteBut = tr.insertCell();

    userData.push({
      salary: salaryPost.salary,
      companyName: salaryPost.company,
    });

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");

    deleteButton.addEventListener("click", () => {
      createDelete(salaryPost.postId);
    });
    deleteButton.innerHTML = "Delete";
    id.appendChild(document.createTextNode(`${salaryPost.postId}`));
    company.appendChild(document.createTextNode(`${salaryPost.company}`));
    location.appendChild(document.createTextNode(`${salaryPost.location}`));
    job.appendChild(document.createTextNode(`${salaryPost.position}`));
    gender.appendChild(document.createTextNode(`${personalUser.data.gender}`));
    age.appendChild(document.createTextNode(`${personalUser.data.age}`));
    pay.appendChild(document.createTextNode(`${salaryPost.salary}`));
    deleteBut.appendChild(deleteButton);
  });

  await Promise.all(salaryPostsPromises);
  return userPay;
}
salaryTable();

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
                createReportDelete(element.postId);
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

//delete salary object from database
function createReportDelete(id) {
  fetch("/api/v1/salary/delete", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId: id,
    }),
  });
  var table = document.getElementById("reported-posts");
  var row = document.getElementById(id);
  table.deleteRow(row.rowIndex);
}

//delete report object from database
function createDelete(id) {
  fetch("/api/v1/salary/delete", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId: id,
    }),
  });
  var table = document.getElementById("all-posts");
  var row = document.getElementById(id);
  table.deleteRow(row.rowIndex);
}
