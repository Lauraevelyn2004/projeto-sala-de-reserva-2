applyTheme();

const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = 'login.html';
}

const userChip = document.getElementById('userChip');
if (userChip && currentUser) {
  userChip.textContent = `${currentUser.name} • ${currentUser.role === 'admin' ? 'Administrador' : 'Usuário'}`;
}

document.querySelectorAll('.admin-only').forEach(item => {
  if (currentUser?.role === 'admin') item.classList.remove('hidden');
  else item.classList.add('hidden');
});

const adminPage = window.location.pathname.endsWith('admin.html');
if (adminPage && currentUser?.role !== 'admin') {
  window.location.href = 'dashboard.html';
}

const themeBtn = document.getElementById('themeToggle');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    clearCurrentUser();
    window.location.href = 'login.html';
  });
}
