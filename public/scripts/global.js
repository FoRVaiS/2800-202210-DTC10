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

(async () => {
  const id = localStorage.getItem('id');
  const adminDashboardBtn = document.querySelector('#admin-input');

  if (adminDashboardBtn && id) {
    const { success, data: user } = await fetchJson(`/api/v1/user/id/${id}`);

    if (!success) {
      console.warn('User is not logged in or could not be found');
    } else if (user && user.roles && user.roles.includes('admin')) {
      adminDashboardBtn.onclick = () => window.location.href = '/admin';
    } else {
      adminDashboardBtn.remove();
    }
  }
})();