const adminUser = getCurrentUser();
if (!adminUser || adminUser.role !== 'admin') window.location.href = 'login.html';

const responsavelForm = document.getElementById('responsavelForm');
const adminCancelModal = document.getElementById('adminCancelModal');
const adminCancelForm = document.getElementById('adminCancelForm');
let reservationToCancel = null;

// --- CADASTRO DE ADMINS ---
responsavelForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('responsavelName').value.trim();
  const email = document.getElementById('responsavelEmail').value.trim();
  const password = document.getElementById('responsavelPassword').value.trim();
  const role = document.getElementById('responsavelPerfil').value;

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showToast('E-mail já cadastrado.', 'error');
    return;
  }

  users.push({ id: Date.now(), name, email, password, role });
  saveUsers(users);
  responsavelForm.reset();
  renderAdminUsers();
  showToast('Usuário cadastrado com sucesso!', 'success');
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

// --- CANCELAMENTO VIA MODAL (CORRIGIDO) ---
window.abrirModalCancelamento = (id) => {
  reservationToCancel = id;
  adminCancelModal.classList.remove('hidden');
};

adminCancelForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const reason = document.getElementById('cancelReason').value.trim();
  
  if (!reservationToCancel || !reason) return;

  const res = getReservations();
  const index = res.findIndex(r => r.id === reservationToCancel);
  
  if (index !== -1) {
    res[index].status = 'cancelada';
    res[index].cancelReason = reason;
    res[index].cancelledAt = new Date().toISOString();
    
    saveReservations(res);
    renderAdminReservations();
    adminCancelModal.classList.add('hidden');
    adminCancelForm.reset();
    showToast('Reserva cancelada com sucesso.', 'success');
  }
});

document.getElementById('closeAdminCancelModal')?.addEventListener('click', () => {
  adminCancelModal.classList.add('hidden');
});

// --- RENDERIZAÇÃO DE RESERVAS (CORRIGIDO) ---
function renderAdminReservations() {
  const allReservations = document.getElementById('allReservations');
  if (!allReservations) return;
  allReservations.innerHTML = '';
  
  getReservations().forEach(r => {
    const card = document.createElement('div');
    card.className = 'slot-card';
    card.innerHTML = `
      <p><strong>Usuário:</strong> ${r.userName} | <strong>Data:</strong> ${r.date} | <strong>Vaga:</strong> ${r.vaga}</p>
      ${r.status === 'cancelada' 
        ? `<p style="color:var(--danger)"><strong>Cancelado:</strong> ${r.cancelReason}</p>` 
        : `<button class="danger-btn" onclick="abrirModalCancelamento(${r.id})">Cancelar Reserva</button>`
      }
    `;
    allReservations.appendChild(card);
  });
}

renderAdminUsers();
renderAdminReservations();