var userPay;

const fetchJson = async (url, opts = {}) => {
  const { body, headers, ...fetchOpts } = opts;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body),
    ...fetchOpts,
  });

  return response.json();
};

(() => {
  const userData = [];
  // const userPay = 0;
  // Stores a reference to a function that tracks of the number of clicks in a given timeframe.
  let activeTriggerState = null;

  // The amount of clicks to activate the easter egg
  const EASTER_EGG_MAX_CLICKS = 7;

  // The time in milliseconds the user has to spam the action element to activate the easter egg.
  const EASTER_EGG_TIMEFRAME_MS = 3000;

  function createTriggerState(timeout) {
    const startTime = new Date().getTime();
    let endTime = startTime + timeout;

    return {
      clicks: 0,
      click() {
        if (new Date().getTime() > endTime) activeTriggerState = null;

        this.clicks++;
      },
    };
  }

  // easter egg action trigger event script below
  const logoRef = document.querySelector("#logo");

  if (logoRef) {
    logoRef.onclick = () => {
      if (!activeTriggerState) {
        activeTriggerState = createTriggerState(EASTER_EGG_TIMEFRAME_MS);
      }

      activeTriggerState.click();

      if (
        activeTriggerState &&
        activeTriggerState.clicks > EASTER_EGG_MAX_CLICKS
      ) {
        activeTriggerState = null;

        window.location.href = "/easter-egg";
      }
    };
  }

  // Create listener to redirect to form submission
  const addToSalaryBtn = document.querySelector('#in-add-to-salary');

  if (addToSalaryBtn) {
    addToSalaryBtn.onclick = () => window.location.href = '/form/salary';
  }

  var salary = []
  var company = []
  var id = localStorage.getItem("id");

  payRow(id, userData).then(() => {
    userData.sort((a, b) => a.salary - b.salary);

    for (var x = 0; x < userData.length; x++) {
      salary[x] = userData[x].salary;
      company[x] = userData[x].companyName;
    }

    new Chart("info-chart", {
      type: "line",
      data: {
        labels: company,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: salary
        }]
      },
      options: {
        legend: {
          display: false
        },
      },
      elements: {
        point: {
          radius: highLight,
          display: true
        }
      }
    });
  });

  searchCompany();

  document.getElementById("sort").addEventListener("click", () => {
    sortTable();
  });
})();

function userInfo(data) {
  var jobBox = document.createElement("div");
  jobBox.classList.add("d-flex");
  jobBox.classList.add("align-items-start");
  jobBox.classList.add("flex-column");

  var userBox = document.getElementById("userInfo");
  var company = document.createElement("h3");
  var companyName = document.createElement("small");
  var positionName = document.createElement("small");

  companyName.textContent = `${data.company}`;
  companyName.classList.add("text-muted");
  positionName.textContent = `${data.position}`;
  positionName.classList.add("text-muted");

  var position = document.createElement("h4");
  var pay = document.createElement("h2");
  var payBox = document.createElement("div");

  payBox.classList.add("d-flex");
  payBox.classList.add("justify-content-center");
  payBox.appendChild(pay);

  company.textContent = `Company: `;
  company.appendChild(companyName);
  position.textContent = `Position: `;
  position.appendChild(positionName);
  pay.textContent = `$${data.salary}/hr`;

  jobBox.appendChild(company);
  jobBox.appendChild(position);
  userBox.appendChild(jobBox);
  userBox.appendChild(payBox);
}

async function payRow(id, userData) {
  var main = document.getElementById("Pay-Table");
  
  const { data: salaryPosts } = await fetchJson("/api/v1/salary");
  
  const currentUserSalaryPost = salaryPosts.filter(salary => salary.userId === id).pop();
  
  let currentUserJob = null;
  
  if (currentUserSalaryPost) {
    currentUserJob = currentUserSalaryPost.position;
    userPay = currentUserSalaryPost.salary;
    
    userInfo(currentUserSalaryPost);
  } else {
    const jobPositions = Array.from(new Set(salaryPosts.map(salary => salary.position)));

    // There might be a better way to pick a random element in an array?
    currentUserJob = jobPositions[Math.floor(Math.random() * jobPositions.length)];
  }
  
  const salaryPostsPromises = salaryPosts
    .filter(salaryPost => salaryPost.position.toLowerCase() === currentUserJob.toLowerCase())
    .map(async salaryPost => {
      const personalUser = await fetchJson(`/api/v1/user/id/${salaryPost.userId}`);

      var tr = main.insertRow();
      tr.setAttribute("id", `${salaryPost.postId}`);
      var company = tr.insertCell();
      var location = tr.insertCell();
      var gender = tr.insertCell();
      var age = tr.insertCell();
      var pay = tr.insertCell();
      var report = tr.insertCell();

      userData.push({
        salary: (salaryPost.salary),
        companyName: (salaryPost.company)
      });

      var reportButton = document.createElement("button");
      reportButton.type = "button";
      reportButton.classList.add("btn");
      reportButton.classList.add("btn-danger");
      reportButton.classList.add("btn-sm");

      reportButton.addEventListener("click", () => {
        createReport(salaryPost.postId);
      })
      reportButton.innerHTML = "Report";
      company.appendChild(document.createTextNode(`${salaryPost.company}`));
      location.appendChild(document.createTextNode(`${salaryPost.location}`));
      gender.appendChild(document.createTextNode(`${personalUser.data.gender}`));
      age.appendChild(document.createTextNode(`${personalUser.data.age}`));
      pay.appendChild(document.createTextNode(`${salaryPost.salary}`));
      report.appendChild(reportButton);
    });

  await Promise.all(salaryPostsPromises);

  userData.sort((a, b) => a.salary - b.salary);
  return userPay;
}

function searchCompany() {
  var searchButton = document.getElementById("search-input");
  searchButton.addEventListener("click", () => {
    var input = document.getElementById("tags").value;
    localStorage.setItem("search", `${input}`);
    return window.location.href = "/search";
  });
}

$(function() {
  var companies = [
    "McDonald's",
    "No Frills",
    "Real Canadian Superstore",
    "Winners",
    "Shopper's Drug Mart"
  ];
  $("#tags").autocomplete({
    source: companies
  });
});

function createReport(postId) {
  document.getElementById(postId).remove();
  $('#report-modal').modal('show')
  fetch("/api/v1/report/post", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      postId
    }),
  });
}

function sortTable() {
  myTable = document.getElementById("Pay-Table");
  swap = true;
  rows = myTable.rows;
  while (swap) {
    swap = false;
    for (var x = 1; x < (rows.length - 1); x++) {
      curRow = rows[x].getElementsByTagName("td")[4];
      nextRow = rows[(x + 1)].getElementsByTagName("td")[4];
      if (Number(curRow.innerHTML) > Number(nextRow.innerHTML)) {
        rows[x].parentNode.insertBefore(rows[x + 1], rows[x]);
        swap = true;
        break;
      }
    }
  }
}

function highLight(context) {
  let index = context.dataIndex;
  let value = context.dataset.data[index];
  return value == userPay ? 10 : 2;
}
