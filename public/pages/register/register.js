(() => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9-]{1,63}.)+[a-zA-Z]{2,63}$/g;

  const inputRegisterRef = document.querySelector("#signup");

  const emailRef = document.querySelector("input[name='email']");
  const passwordRef = document.querySelector("input[name='password']");

  inputRegisterRef.onclick = (e) => {
    e.preventDefault();

    const email = emailRef.value;
    const password = passwordRef.value;

    if (!email.match(EMAIL_REGEX)) return console.warn('Email format is incorrect');

    fetch("/api/v1/user/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => data.json())
      .then((data) => {
        return (window.location.href = "/login");
      });
  };
})();
