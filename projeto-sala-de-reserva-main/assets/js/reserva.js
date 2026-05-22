document.addEventListener('DOMContentLoaded', () => {
  const reserveForm = document.getElementById('reserveForm');
  if (!reserveForm) return;

  reserveForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const currentUser = getCurrentUser();
    const vaga = document.getElementById('reserveVaga').value;
    const name = document.getElementById('reserveName').value;
    const date = document.getElementById('reserveDate').value;
    const start = document.getElementById('reserveStartTime').value;
    const end = document.getElementById('reserveEndTime').value;
    const purpose = document.getElementById('reservePurpose').value;

    if (!vaga || !name || !date || !start || !end || !purpose) {
      showToast('Preencha todos os campos.', 'error');
      return;
    }

    if (timeToMinutes(start) >= timeToMinutes(end)) {
      showToast('Horário final deve ser maior que o inicial.', 'error');
      return;
    }

    // Validação de Conflito Crítica
    if (hasConflict(date, start, end, vaga)) {
      showToast('Esta vaga já está reservada neste horário!', 'error');
      return;
    }

    const reservations = getReservations();
    reservations.push({ 
        id: Date.now(), 
        userEmail: currentUser.email, 
        userName: name, 
        purpose: purpose,
        date: date, 
        startTime: start, 
        endTime: end, 
        vaga: vaga, 
        status: 'ativa',
        cancelReason: '', // Inicializado vazio
        cancelledBy: '',
        cancelledAt: ''
    });

    saveReservations(reservations);
    showToast('Reserva confirmada!', 'success');
    setTimeout(() => { window.location.href = 'minhas-reservas.html'; }, 1000);
  });
});