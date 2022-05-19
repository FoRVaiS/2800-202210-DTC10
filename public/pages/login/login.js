(() => {
  const inputLoginRef = document.querySelector("#in-log-in");

  const emailRef = document.querySelector("input[name='email']");
  const passwordRef = document.querySelector("input[name='password']");

  inputLoginRef.onclick = (e) => {
    e.preventDefault();

    const email = emailRef.value;
    const password = passwordRef.value;
    localStorage.setItem("acc", email);

    fetch('/api/v1/user/login', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(data => data.json()).then(data => {
      if (data.success) return window.location.href = '/';

        const noticeRef = document.querySelector("form > .notice");
        noticeRef.classList.add("notice--alert");

        const alertText = document.createElement("p");
        alertText.textContent = data.msg;
        noticeRef.append(alertText);
      });
  };
})();
