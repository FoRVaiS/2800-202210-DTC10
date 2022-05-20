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

  var id = localStorage.getItem("id");
  payRow(id);
})();


function payRow(id) {

    var main = document.getElementById("Pay-Table");
    var currentUserJob;

    fetch("/api/v1/salary", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }).then(data => data.json()).then(data => {
        var users = data.data;
        users.forEach(element => {
            if ((element.userId).localeCompare( id)) {
                currentUserJob = element.position;
            }
        })
            users.forEach(element => {
            if(element.position == currentUserJob) {
                fetch(`/api/v1/user/id/${element.userId}`, {
                    method: "get",
                    headers: { "Content-Type": "application/json" },
                }).then(userPersonal => userPersonal.json()).then(userPersonal => {
                    var tr = main.insertRow();
                    tr.setAttribute("id", `${element.userId}`);
                    var company = tr.insertCell();
                    var gender = tr.insertCell();
                    var age = tr.insertCell();
                    var pay = tr.insertCell();
                    company.appendChild(document.createTextNode(`${element.company}`));
                    gender.appendChild(document.createTextNode(`${userPersonal.data.gender}`));
                    age.appendChild(document.createTextNode(`${userPersonal.data.age}`));
                    pay.appendChild(document.createTextNode(`${element.salary}`));
                })


                // tr.addEventListener("onclick", createReport(element.userId));
            }
        })
    });

}


// function createReport(id) {
//     fetch("/api/v1/report/post", {
//         method: "post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({id}),
//       });
// }

