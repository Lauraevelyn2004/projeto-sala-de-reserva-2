// assets/js/minhas-reservas.js (Código Completo)
function renderMyReservations() {
  const myReservations = document.getElementById('myReservations');
  if (!myReservations) return;

  const currentUser = getCurrentUser();
  const reservations = getReservations().filter(r => r.userEmail === currentUser.email);
  myReservations.innerHTML = '';

  reservations.forEach(r => {
    const card = document.createElement('div');
    card.className = 'reservation-card';
    
    card.innerHTML = `
      <div>
        <strong>${r.purpose}</strong><br>
        Data: ${r.date} | Horário: ${r.startTime} às ${r.endTime} | Vaga: ${r.vaga}
        
        ${r.status === 'cancelada' ? `
          <div style="background: #fff5f5; color: #c92a2a; margin-top: 10px; padding: 10px; border-radius: 8px; border: 1px solid #c92a2a;">
            <strong>Cancelado pelo Administrador:</strong><br> ${r.cancelReason}
          </div>
        ` : ''}
      </div>
      ${r.status === 'ativa' ? `<button class="danger-btn" onclick="cancelar(${r.id})">Cancelar</button>` : ''}
    `;
    myReservations.appendChild(card);
  });
}

window.cancelar = (id) => {
  const res = getReservations();
  const index = res.findIndex(r => r.id === id);
  res[index].status = 'cancelada';
  res[index].cancelReason = 'Cancelado pelo usuário';
  saveReservations(res);
  renderMyReservations();
  showToast('Cancelado com sucesso.', 'success');
};

renderMyReservations();