const adminUser = getCurrentUser();
if (!adminUser || adminUser.role !== 'admin') window.location.href = 'login.html';

const responsavelForm = document.getElementById('responsavelForm');
const adminCancelModal = document.getElementById('adminCancelModal');
const adminCancelForm = document.getElementById('adminCancelForm');
let reservationToCancel = null;

// Função de erro dinâmico
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

// --- CADASTRO DE ADMINS ---
responsavelForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  clearFormErrors('responsavelForm');
  let hasError = false;

  const name = document.getElementById('responsavelName').value.trim();
  const email = document.getElementById('responsavelEmail').value.trim();
  const password = document.getElementById('responsavelPassword').value.trim();
  const role = 'admin'; // Força sempre a ser admin

  if (!name) { showFieldError('responsavelName', 'O nome do administrador é obrigatório.'); hasError = true; }
  if (!email) { showFieldError('responsavelEmail', 'Informe o e-mail do administrador.'); hasError = true; }
  else if (!email.includes('@')) { showFieldError('responsavelEmail', 'Formato de e-mail inválido.'); hasError = true; }
  if (!password) { showFieldError('responsavelPassword', 'Defina uma senha provisória.'); hasError = true; }

  if (hasError) return;

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showFieldError('responsavelEmail', 'Este e-mail já está cadastrado no sistema.');
    return;
  }

  users.push({ id: Date.now(), name, email, password, role });
  saveUsers(users);
  responsavelForm.reset();
  renderAdminUsers();
  showToast('Administrador cadastrado com sucesso!', 'success');
});

// --- RENDERIZAÇÃO DE ADMINS ---
function renderAdminUsers() {
  const adminUsersList = document.getElementById('adminUsers');
  if (!adminUsersList) return;
  adminUsersList.innerHTML = '';
  getUsers().filter(u => u.role === 'admin').forEach(admin => {
    const item = document.createElement('div');
    item.className = 'slot-card';
    item.innerHTML = `<p><strong>Nome:</strong> ${admin.name}</p><p><strong>E-mail:</strong> ${admin.email}</p><p><strong>Perfil:</strong> Administrador</p>`;
    adminUsersList.appendChild(item);
  });
}

// --- CANCELAMENTO VIA MODAL ---
window.abrirModalCancelamento = (id) => {
  reservationToCancel = id;
  adminCancelModal.classList.remove('hidden');
  clearFormErrors('adminCancelForm');
  document.getElementById('cancelReason').value = '';
};

adminCancelForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  clearFormErrors('adminCancelForm');
  
  const reason = document.getElementById('cancelReason').value.trim();
  
  if (!reason) {
    showFieldError('cancelReason', 'É obrigatório justificar o cancelamento para informar o usuário.');
    return;
  }

  if (!reservationToCancel) return;

  const res = getReservations();
  const index = res.findIndex(r => r.id === reservationToCancel);
  
  if (index !== -1) {
    res[index].status = 'cancelada';
    res[index].cancelReason = reason;
    res[index].cancelledAt = new Date().toISOString();
    
    saveReservations(res);
    renderAdminReservations();
    adminCancelModal.classList.add('hidden');
    showToast('Reserva cancelada pelo administrador.', 'success');
  }
});

document.getElementById('closeAdminCancelModal')?.addEventListener('click', () => {
  adminCancelModal.classList.add('hidden');
});

// --- RENDERIZAÇÃO DE RESERVAS COM DATA E HORÁRIO COESOS ---
function renderAdminReservations() {
  const allReservations = document.getElementById('allReservations');
  if (!allReservations) return;
  allReservations.innerHTML = '';
  
  const reservas = getReservations();
  if(reservas.length === 0) {
    allReservations.innerHTML = '<p class="empty-state">Não há reservas registradas no sistema.</p>';
    return;
  }

  reservas.forEach(r => {
    const card = document.createElement('div');
    card.className = 'slot-card';
    card.innerHTML = `
      <p>
        <strong>Usuário:</strong> ${r.userName} | 
        <strong>Data:</strong> ${formatDate(r.date)} | 
        <strong>Horário:</strong> ${r.startTime} às ${r.endTime} | 
        <strong>Vaga:</strong> ${r.vaga}
      </p>
      ${r.status === 'cancelada' 
        ? `<p style="color:var(--danger); margin-top: 4px;"><strong>Cancelado:</strong> ${r.cancelReason}</p>` 
        : `<button class="danger-btn" onclick="abrirModalCancelamento(${r.id})" style="margin-top: 8px;">Cancelar Reserva</button>`
      }
    `;
    allReservations.appendChild(card);
  });
}

renderAdminUsers();
renderAdminReservations();