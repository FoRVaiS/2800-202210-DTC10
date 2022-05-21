(() => {
  const inputRegisterRef = document.querySelector("#signup");

  const emailRef = document.querySelector("input[name='email']");
  const passwordRef = document.querySelector("input[name='password']");

  inputRegisterRef.onclick = (e) => {
    e.preventDefault();

    const email = emailRef.value;
    const password = passwordRef.value;

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
