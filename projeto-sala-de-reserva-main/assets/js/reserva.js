document.addEventListener('DOMContentLoaded', () => {
  const reserveForm = document.getElementById('reserveForm');
  const reserveDate = document.getElementById('reserveDate');
  const schedulePreview = document.getElementById('schedulePreview');

  // ==========================================
  // 1. LÓGICA DE SUBMISSÃO E VALIDAÇÃO NO CONTEXTO
  // ==========================================
  if (reserveForm) {
    reserveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const currentUser = getCurrentUser();
      
      const vaga = document.getElementById('reserveVaga').value;
      const name = document.getElementById('reserveName').value.trim();
      const purpose = document.getElementById('reservePurpose').value.trim();
      const date = document.getElementById('reserveDate').value;
      const start = document.getElementById('reserveStartTime').value;
      const end = document.getElementById('reserveEndTime').value;

      // Limpa todos os erros visuais antes de validar novamente
      document.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
      let hasError = false;

      // Função auxiliar para marcar um campo com erro
      const showError = (fieldId, message) => {
        const fieldDiv = document.getElementById(fieldId);
        if (fieldDiv) {
          fieldDiv.classList.add('error');
          const errorText = fieldDiv.querySelector('.error-text');
          if (errorText) errorText.textContent = message;
        }
        hasError = true;
      };

      // Validação de campos vazios
      if (!vaga) showError('field-vaga', 'Selecione uma vaga.');
      if (!name) showError('field-name', 'Informe quem vai utilizar.');
      if (!purpose) showError('field-purpose', 'Qual a finalidade?');
      if (!date) showError('field-date', 'Escolha uma data.');
      if (!start) showError('field-start', 'Defina o início.');
      if (!end) showError('field-end', 'Defina o término.');

      if (hasError) return;

      // Validação lógica 1: Horário Comercial (07:00 às 19:00)
      const minTime = timeToMinutes('07:00');
      const maxTime = timeToMinutes('19:00');
      const startMins = timeToMinutes(start);
      const endMins = timeToMinutes(end);

      if (startMins < minTime || startMins > maxTime) {
        showError('field-start', 'Permitido apenas das 07:00 às 19:00.');
        hasError = true;
      }
      if (endMins < minTime || endMins > maxTime) {
        showError('field-end', 'Permitido apenas das 07:00 às 19:00.');
        hasError = true;
      }

      if (hasError) return;

      // Validação lógica 2: Fim antes do início
      if (startMins >= endMins) {
        showError('field-start', 'Verifique o horário.');
        showError('field-end', 'O término deve ser após o início.');
        return;
      }

      // Validação lógica 3: Conflito de ocupação
      if (hasConflict(date, start, end, vaga)) {
        showError('field-vaga', 'Vaga indisponível neste período.');
        showError('field-start', 'Horário em conflito.');
        showError('field-end', 'Horário em conflito.');
        return;
      }

      // Salvar a reserva (caso tudo esteja correto)
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
          cancelReason: '', 
          cancelledBy: '',
          cancelledAt: ''
      });

      saveReservations(reservations);
      
      showToast('Reserva confirmada!', 'success');
      setTimeout(() => { window.location.href = 'minhas-reservas.html'; }, 1000);
    });
  }

  // ==========================================
  // 2. LÓGICA DE PREVIEW DE OCUPAÇÃO DO DIA
  // ==========================================
  if (reserveDate && schedulePreview) {
    reserveDate.addEventListener('change', renderSchedulePreview);
    renderSchedulePreview();
  }

  function renderSchedulePreview() {
    const selectedDate = reserveDate.value;
    schedulePreview.innerHTML = ''; 

    if (!selectedDate) {
      schedulePreview.innerHTML = '<p class="empty-state">Selecione uma data para ver as ocupações.</p>';
      return;
    }

    const dayReservations = getReservations().filter(r => 
      r.date === selectedDate && !isReservationCancelled(r)
    );

    if (dayReservations.length === 0) {
      schedulePreview.innerHTML = '<p class="empty-state">Todas as vagas estão livres neste dia!</p>';
      return;
    }

    dayReservations.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    dayReservations.forEach(r => {
      const card = document.createElement('div');
      card.className = 'slot-card'; 
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="slot-title" style="font-weight: 600;">Vaga ${r.vaga} • ${r.startTime} às ${r.endTime}</div>
            <div class="slot-meta" style="font-size: 14px; color: var(--muted); margin-top: 4px;">
              <strong>Ocupado por:</strong> ${r.userName}
            </div>
          </div>
          <span class="status-badge active">Reservado</span>
        </div>
      `;
      schedulePreview.appendChild(card);
    });
  }
});