// Substitua o listener do formulário de login no auth.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if (!email || !password || !role) {
    showToast('Preencha todos os campos.', 'error');
    return;
  }

  const users = getUsers();
  const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  // Heurística 2: Reconhecimento de Erros Específicos
  if (!userExists) {
    showToast('E-mail não cadastrado no sistema.', 'error');
    return;
  }

  if (userExists.password !== password) {
    showToast('Senha incorreta. Tente novamente.', 'error');
    return;
  }

  if (userExists.role !== role) {
    showToast('Perfil incorreto selecionado.', 'error');
    return;
  }

  setCurrentUser(userExists);
  document.body.classList.add('is-loading'); // Estado de loading
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
});