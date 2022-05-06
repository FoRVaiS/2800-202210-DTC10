(() => {
  const inputLoginRef = document.querySelector('#in-log-in');

  const usernameRef = document.querySelector("input[name='username']");
  const passwordRef = document.querySelector("input[name='password']");

  inputLoginRef.onclick = (e) => {
    e.preventDefault();

    const username = usernameRef.value;
    const password = passwordRef.value;

    fetch('/login', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(data => data.json()).then(data => {
      if (data.success) return window.location.href = '/';

      const noticeRef = document.querySelector('form > .notice');
      noticeRef.classList.add('notice--alert');

      const alertText = document.createElement('p');
      alertText.textContent = data.msg;
      noticeRef.append(alertText);
    });
  }
})();
