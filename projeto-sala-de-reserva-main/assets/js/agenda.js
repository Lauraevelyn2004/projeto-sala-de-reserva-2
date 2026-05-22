function renderAgenda() {
  const agendaList = document.getElementById('agendaList');
  if (!agendaList) return;

  const reservationsAgenda = getReservations();

  // Limpa a lista antes de renderizar
  agendaList.innerHTML = ''; 

  // Filtra apenas reservas que NÃO estão canceladas
  const activeReservations = reservationsAgenda.filter(r => !isReservationCancelled(r));

  if (activeReservations.length === 0) {
    agendaList.innerHTML = '<p class="empty-state">Nenhuma reserva ativa encontrada na agenda.</p>';
    return;
  }

  // Ordena as reservas por data e depois por horário de início
  activeReservations.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    
    const timeA = timeToMinutes(a.startTime || a.time);
    const timeB = timeToMinutes(b.startTime || b.time);
    return timeA - timeB;
  });

  // Renderiza cada reserva diretamente na lista
  activeReservations.forEach(reservation => {
    const card = document.createElement('div');
    card.className = 'slot-card';
    
    // Define o texto do horário (suporte ao formato novo e antigo)
    const displayTime = reservation.startTime && reservation.endTime 
      ? `${reservation.startTime} às ${reservation.endTime}`
      : (reservation.time || 'Horário indefinido');

    card.innerHTML = `
      <div>
        <div class="slot-title">${formatDate(reservation.date)} • ${displayTime}</div>
        <div class="slot-meta">
          <strong>Solicitante:</strong> ${reservation.userName} <br>
          <strong>Finalidade:</strong> ${reservation.purpose}
        </div>
      </div>
      <span class="status occupied">Reservado</span>
    `;
    agendaList.appendChild(card);
  });
}

// Inicializa a agenda
renderAgenda();