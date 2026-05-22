// assets/js/minhas-reservas.js (Código Completo Atualizado)

let reservationToCancelId = null; // Guarda temporariamente o ID da reserva que o usuário quer cancelar

function renderMyReservations() {
  const myReservations = document.getElementById('myReservations');
  if (!myReservations) return;

  const currentUser = getCurrentUser();
  const reservations = getReservations().filter(r => r.userEmail === currentUser.email);
  myReservations.innerHTML = '';

  if (reservations.length === 0) {
    myReservations.innerHTML = '<p class="empty-state">Você não possui nenhuma reserva cadastrada.</p>';
    return;
  }

  reservations.forEach(r => {
    const card = document.createElement('div');
    card.className = 'reservation-card';
    
    card.innerHTML = `
      <div>
        <strong>${r.purpose}</strong><br>
        Data: ${formatDate(r.date)} | Horário: ${r.startTime} às ${r.endTime} | Vaga: ${r.vaga}
        
        ${r.status === 'cancelada' ? `
          <div style="background: #fff5f5; color: #c92a2a; margin-top: 10px; padding: 10px; border-radius: 8px; border: 1px solid #c92a2a;">
            <strong>Cancelado:</strong> ${r.cancelReason}
          </div>
        ` : ''}
      </div>
      ${r.status === 'ativa' ? `<button class="danger-btn" onclick="cancelar(${r.id})">Cancelar</button>` : ''}
    `;
    myReservations.appendChild(card);
  });
}

// Em vez de cancelar direto, esta função agora apenas abre o Modal de Confirmação
window.cancelar = (id) => {
  reservationToCancelId = id; // Memoriza qual reserva foi clicada
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.classList.remove('hidden'); // Exibe o modal na tela
  }
};

// Configura os escutadores dos botões do modal após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('confirmModal');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const confirmModalBtn = document.getElementById('confirmModalBtn');

  // Se clicar em "Voltar", fecha o modal e limpa o ID salvo
  cancelModalBtn?.addEventListener('click', () => {
    if (modal) modal.classList.add('hidden');
    reservationToCancelId = null;
  });

  // Se clicar em "Confirmar", realiza a ação de cancelamento no LocalStorage
  confirmModalBtn?.addEventListener('click', () => {
    if (reservationToCancelId === null) return;

    const res = getReservations();
    const index = res.findIndex(r => r.id === reservationToCancelId);
    
    if (index !== -1) {
      res[index].status = 'cancelada';
      res[index].cancelReason = 'Cancelado pelo usuário';
      
      saveReservations(res); // Salva no LocalStorage
      
      if (modal) modal.classList.add('hidden'); // Fecha o modal
      reservationToCancelId = null; // Reseta a variável de controle
      
      renderMyReservations(); // Atualiza a listagem na tela
      showToast('Cancelado com sucesso.', 'success');
    }
  });
});

renderMyReservations();