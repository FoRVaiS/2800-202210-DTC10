(async () => {
  const fetchJson = async (url, opts) => {
    const { body, headers, ...fetchOpts } = opts;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      ...fetchOpts,
    });

    return response.json();
  };

  const redirectToPathFromRoot = (path) => {
    console.log(
      [new URL(window.location.href).origin, path.replace("/", "")].join("/")
    );
    return (window.location.href = [
      new URL(window.location.href).origin,
      path.replace("/", ""),
    ].join("/"));
  };

  const sendSalarySubmission = async () => {
    const titleField = document.querySelector("#inputTitle");
    const addressField = document.querySelector("#inputAddress");
    const wageField = document.querySelector("#inputWage");
    const ageField = document.querySelector("#inputAge");
    const genderField = document.querySelector("#inlineFormCustomSelect");

    if (!titleField) console.warn("Could not find the job title field");
    if (!addressField) console.warn("Could not find the address field");
    if (!wageField) console.warn("Could not find the wage field");
    if (!ageField) console.warn("Could not find the age field");
    if (!genderField) console.warn("Could not find the gender field");

    if (
      !titleField ||
      !addressField ||
      !wageField ||
      !ageField ||
      !genderField
    ) {
      console.warn("Please resolve the warnings above");
      return null;
    }

    const title = titleField.value.trim();
    const address = addressField.value.trim();
    const wage = Number(wageField.value);
    const age = Number(ageField.value);
    const gender = genderField.value.trim();

    const { success } = await fetchJson("/api/v1/salary/submit", {
      method: "post",
      body: {
        position: title,
        location: address,
        salary: wage,
        age,
        gender,
      },
    });

    const redirectUrl = new URL(window.location.href).searchParams.get(
      "redirectUrl"
    );

    if (!success) {
      console.warn("Form submission failed");
      return null;
    }

    redirectToPathFromRoot(redirectUrl || "/");
  };

  const { data: salaries } = await fetchJson("/api/v1/salary", {});

  const locations = Array.from(
    new Set(salaries.map((salary) => salary.location))
  );

  $("#inputAddress").autocomplete({
    source: locations,
  });

  const submitBtn = document.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();

      sendSalarySubmission();
    };
  } else {
    console.warn("Could not find submit button.");
  }
})();
