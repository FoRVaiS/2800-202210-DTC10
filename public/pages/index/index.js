(() => {
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

  var id = localStorage.getItem("id");
  payRow(id);
  searchCompany();

  document.getElementById("sort").addEventListener("click", () => {
    sortTable();
  })
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

    company.textContent = `Company: `
    company.appendChild(companyName);
    position.textContent = `Position: `
    position.appendChild(positionName);
    pay.textContent = `$${data.salary}/hr`

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
      }).then(data => data.json()).then(data => {
        var users = data.data;
        users.forEach(element => {        

            if (element.userId === id) {
                currentUserJob = element.position;
                userInfo(element);
            }
        })
            users.forEach(element => {
            if(element.position == currentUserJob) {
                fetch(`/api/v1/user/id/${element.userId}`, {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                }).then(userPersonal => userPersonal.json()).then(userPersonal => {
                    var tr = main.insertRow();
                    tr.setAttribute("id", `${element.postId}`);
                    var company = tr.insertCell();
                    var location = tr.insertCell();
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
                    location.appendChild(document.createTextNode(`${element.location}`));
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
        var input = document.getElementById("tags").value;
        localStorage.setItem("search", `${input}`);
        return window.location.href = "/search";
    });
}

$( function() {
    var companies = [
        "McDonald's",
        "No Frills",
        "Real Canadian Superstore",
        "Winners",
        "Shopper's Drug Mart"
    ];
    $( "#tags" ).autocomplete({
      source: companies
    });
  } );



function createReport(postId) {
  document.getElementById(postId).remove();
  $('#report-modal').modal('show')
    fetch("/api/v1/report/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
}


function sortTable() {
  myTable = document.getElementById("Pay-Table");
  swap = true;
  rows = myTable.rows;
  while(swap) {
    swap = false;
    for(var x = 1; x < (rows.length - 1); x++) {
      curRow = rows[x].getElementsByTagName("td")[3];
      nextRow = rows[(x + 1)].getElementsByTagName("td")[3];
      if(Number(curRow.innerHTML) > Number(nextRow.innerHTML)) {
        rows[x].parentNode.insertBefore(rows[x + 1], rows[x]);
        swap = true;
        break;
      }
    }
  }
}
