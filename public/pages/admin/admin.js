window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');

  document.querySelector('#btnNav').addEventListener('click', () => {
    nav.classList.add('nav--open');
  });

  document.querySelector('.nav__overlay').addEventListener('click', () => {
    nav.classList.remove('nav--open');
  });
});

// jumbotron related items below
$('.jumbotron').css({ height: `${$(window).height()}px` });

$(window).on('resize', () => {
  $('.jumbotron').css({ height: `${$(window).height()}px` });
});

// fetch all posts from database and display id, company, position, salary in table
let userPay;
const salary = [];
const company = [];
const userData = [];
const id = localStorage.getItem('id');

async function salaryTable() {
  const main = document.getElementById('all-posts');

  const { data: salaryPosts } = await fetchJson('/api/v1/salary');

  const currentUserSalaryPost = salaryPosts
    .filter(salary => salary.userId === id)
    .pop();

  let currentUserJob = null;

  if (currentUserSalaryPost) {
    currentUserJob = currentUserSalaryPost.position;
    userPay = currentUserSalaryPost.salary;
  } else {
    const jobPositions = Array.from(new Set(salaryPosts.map(salary => salary.position)));

    // There might be a better way to pick a random element in an array?
    currentUserJob =
      jobPositions[Math.floor(Math.random() * jobPositions.length)];
  }

  const salaryPostsPromises = salaryPosts.map(async salaryPost => {
    const personalUser = await fetchJson(`/api/v1/user/id/${salaryPost.userId}`);

    const tr = main.insertRow();
    tr.setAttribute('id', `${salaryPost.postId}`);
    const id = tr.insertCell();
    const company = tr.insertCell();
    const location = tr.insertCell();
    const job = tr.insertCell();
    const gender = tr.insertCell();
    const age = tr.insertCell();
    const pay = tr.insertCell();
    const deleteBut = tr.insertCell();

    userData.push({
      salary: salaryPost.salary,
      companyName: salaryPost.company,
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.classList.add('btn-sm');

    deleteButton.addEventListener('click', () => {
      createDelete(salaryPost.postId);
    });
    deleteButton.innerHTML = 'Delete';
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

// fetch all users from database and display id, email, role in table
function userTable() {
  fetch('/api/v1/user', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(data => data.json())
    .then(data => {
      const table = document.getElementById('all-users');
      const { users } = data;
      users.forEach(element => {
        const tr = table.insertRow();
        tr.setAttribute('id', `${element.id}`);
        const id = tr.insertCell();
        const email = tr.insertCell();
        const role = tr.insertCell();

        id.appendChild(document.createTextNode(`${element._id}`));
        email.appendChild(document.createTextNode(`${element.email}`));
        role.appendChild(document.createTextNode(`${element.roles}`));
      });
    });
}
userTable();

// fetch all reported posts and console.log them
function reportPosts() {
  fetch('/api/v1/report', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(data => data.json())
    .then(data => {
      // for all reported posts append postid to an array
      const posts = data.reports;
      const reportedPostIds = [];
      posts.forEach(element => {
        reportedPostIds.push(element.postId);
      });
      console.log(reportedPostIds);
    });
}
reportPosts();

// fetch all posts from database and if the postId matches reportedPostIds, show the post in the table
function postTable() {
  fetch('/api/v1/report', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(data => data.json())
    .then(data => {
      // for all reported posts append postid to an array
      const posts = data.reports;
      const reportedPostIds = [];
      posts.forEach(element => {
        reportedPostIds.push(element.postId);
      });
      fetch('/api/v1/salary', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(data => data.json())
        .then(({ data: salaryPosts }) => {
          const table = document.getElementById('reported-posts');
          salaryPosts.forEach(element => {
            if (reportedPostIds.includes(element.postId)) {
              const reportId = posts.filter(({ postId }) => postId === element.postId).pop()._id;
              const tr = table.insertRow();
              tr.setAttribute('id', `${element.postId}`);
              const id = tr.insertCell();
              const company = tr.insertCell();
              const position = tr.insertCell();
              const salary = tr.insertCell();
              const deleteBut = tr.insertCell();
              const deleteButton = document.createElement('button');
              deleteButton.type = 'button';
              deleteButton.classList.add('btn');
              deleteButton.classList.add('btn-danger');
              deleteButton.classList.add('btn-sm');
              deleteButton.addEventListener('click', () => {
                createReportDelete(element.postId, reportId);
              });
              deleteButton.innerHTML = 'Delete';
              const passBut = tr.insertCell();
              const passButton = document.createElement('button');
              passButton.type = 'button';
              passButton.classList.add('btn');
              passButton.classList.add('btn-success');
              passButton.classList.add('btn-sm');
              passButton.addEventListener('click', () => {
                createPass(element.postId, reportId);
              });
              passButton.innerHTML = 'Pass';
              id.appendChild(document.createTextNode(`${element.postId}`));
              company.appendChild(document.createTextNode(`${element.company}`));
              position.appendChild(document.createTextNode(`${element.position}`));
              salary.appendChild(document.createTextNode(`${element.salary}`));
              deleteBut.appendChild(deleteButton);
              passBut.appendChild(passButton);
            }
          });
        });
    });
}
postTable();

// delete salary object from database
function createReportDelete(postId, reportId) {
  fetch('/api/v1/salary/delete', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      postId,
    }),
  });

  fetch('/api/v1/report/delete', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reportId,
    }),
  });

  const table = document.getElementById('reported-posts');
  const row = document.getElementById(postId);
  table.deleteRow(row.rowIndex);
}

// delete salary object from database
function createPass(postId, reportId) {
  fetch('/api/v1/report/delete', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reportId,
    }),
  });
  const table = document.getElementById('reported-posts');
  const row = document.getElementById(postId);
  table.deleteRow(row.rowIndex);
}

// delete report object from database
function createDelete(id) {
  fetch('/api/v1/salary/delete', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      postId: id,
    }),
  });
  const table = document.getElementById('all-posts');
  const row = document.getElementById(id);
  table.deleteRow(row.rowIndex);
}
