// ==========================================
// INICIALIZAÇÃO IMEDIATA DO TEMA
// ==========================================
if (typeof applyTheme === 'function') {
  applyTheme();
}

// Aguarda o HTML carregar completamente antes de ligar os botões
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. LIGAR O BOTÃO DO TEMA NA TELA DE LOGIN
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // ==========================================
  // FUNÇÕES DE FEEDBACK DE ERRO
  // ==========================================
  function showFieldError(inputId, message) {
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return;
    const fieldDiv = inputEl.parentElement;
    fieldDiv.classList.add('error');
    
    let errorSpan = fieldDiv.querySelector('.error-text');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-text';
      fieldDiv.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
  }

  function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
  }

  // ==========================================
  // LÓGICA DAS ABAS (NAVEGAÇÃO)
  // ==========================================
  const tabLogin = document.getElementById('tab-login');
  const tabCadastro = document.getElementById('tab-cadastro');
  const tabSenha = document.getElementById('tab-senha');

  const openRegisterBtn = document.getElementById('openRegisterBtn');
  if (openRegisterBtn) {
    openRegisterBtn.addEventListener('click', () => {
      tabLogin.classList.remove('active');
      tabCadastro.classList.add('active');
    });
  }

  const backToLoginFromRegister = document.getElementById('backToLoginFromRegister');
  if (backToLoginFromRegister) {
    backToLoginFromRegister.addEventListener('click', () => {
      tabCadastro.classList.remove('active');
      tabLogin.classList.add('active');
    });
  }

  const openForgotBtn = document.getElementById('openForgotBtn');
  if (openForgotBtn) {
    openForgotBtn.addEventListener('click', () => {
      tabLogin.classList.remove('active');
      tabSenha.classList.add('active');
    });
  }

  const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
  if (backToLoginFromForgot) {
    backToLoginFromForgot.addEventListener('click', () => {
      tabSenha.classList.remove('active');
      tabLogin.classList.add('active');
    });
  }

  // ==========================================
  // 1. FLUXO DE LOGIN
  // ==========================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearFormErrors('loginForm');
      let hasError = false;

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const role = document.getElementById('role').value;

      if (!email) { showFieldError('email', 'Informe o seu e-mail.'); hasError = true; }
      if (!password) { showFieldError('password', 'Informe a sua senha.'); hasError = true; }
      if (!role) { showFieldError('role', 'Selecione o seu perfil.'); hasError = true; }

      if (hasError) return;

      const users = getUsers();
      const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!userExists) {
        showFieldError('email', 'E-mail não encontrado no sistema.');
        showToast('Utilizador não cadastrado.', 'error');
        return;
      }

      if (userExists.password !== password) {
        showFieldError('password', 'A senha está incorreta.');
        showToast('Senha inválida.', 'error');
        return;
      }

      if (userExists.role !== role) {
        showFieldError('role', 'O perfil selecionado não corresponde a este utilizador.');
        showToast('Perfil incorreto.', 'error');
        return;
      }

      setCurrentUser(userExists);
      document.body.classList.add('is-loading');
      showToast('Login efetuado com sucesso!', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
    });
  }

  // ==========================================
  // 2. FLUXO DE CADASTRO DE NOVO UTILIZADOR
  // ==========================================
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearFormErrors('registerForm');
      let hasError = false;

      const name = document.getElementById('registerName').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();

      if (!name) { showFieldError('registerName', 'Preencha o seu nome completo.'); hasError = true; }
      if (!email) { showFieldError('registerEmail', 'O e-mail é obrigatório.'); hasError = true; }
      else if (!email.includes('@')) { showFieldError('registerEmail', 'Insira um e-mail válido.'); hasError = true; }
      if (!password) { showFieldError('registerPassword', 'Crie uma senha.'); hasError = true; }
      else if (password.length < 4) { showFieldError('registerPassword', 'A senha deve ter no mínimo 4 caracteres.'); hasError = true; }

      if (hasError) return;

      const users = getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showFieldError('registerEmail', 'Este e-mail já está em uso.');
        showToast('E-mail já cadastrado.', 'error');
        return;
      }

      users.push({ id: Date.now(), name, email, password, role: 'usuario' });
      saveUsers(users);
      
      showToast('Registo realizado! Já pode fazer login.', 'success');
      document.getElementById('registerForm').reset();
      document.getElementById('backToLoginFromRegister').click();
    });
  }

  // ==========================================
  // 3. FLUXO DE RECUPERAÇÃO DE SENHA
  // ==========================================
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearFormErrors('forgotForm');
      
      const email = document.getElementById('forgotEmail').value.trim();
      
      if (!email) {
        showFieldError('forgotEmail', 'Informe o seu e-mail para recuperar a senha.');
        return;
      }

      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        showFieldError('forgotEmail', 'Não encontramos nenhuma conta com este e-mail.');
        return;
      }

      showToast(`Sistema local: A sua senha é "${user.password}"`, 'success');
    });
  }
});