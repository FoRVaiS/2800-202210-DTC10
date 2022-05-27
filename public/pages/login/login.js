(() => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9-]{1,63}.)+[a-zA-Z]{2,63}$/g;

  const inputLoginRef = document.querySelector("#login");

  const emailRef = document.querySelector("input[name='email']");
  const passwordRef = document.querySelector("input[name='password']");

  inputLoginRef.onclick = (e) => {
    e.preventDefault();

    const email = emailRef.value;
    const password = passwordRef.value;

    if (!email.match(EMAIL_REGEX)) return console.warn('Email format is incorrect');

    fetch("/api/v1/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("acc", `${email}`);
          localStorage.setItem("id", `${data.data.uid}`)
          return (window.location.href = "/");
        }
        const noticeRef = document.querySelector("form > .notice");
        noticeRef.classList.add("notice--alert");
        noticeRef.innerHTML = "";

        const alertText = document.createElement("p");
        alertText.textContent = data.msg;
        noticeRef.append(alertText);
      });
  };
})();
