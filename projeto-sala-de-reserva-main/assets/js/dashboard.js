function updateDashboardCounter() {
  const reservedCountEl = document.getElementById('reservedCount');
  
  if (!reservedCountEl) return;

  // Busca todas as reservas cadastradas
  const allReservations = getReservations();

  // Filtra para contar apenas as que NÃO estão canceladas
  const activeReservations = allReservations.filter(r => !isReservationCancelled(r));

  // Atualiza o número no HTML
  reservedCountEl.textContent = activeReservations.length;
}

// Executa a atualização assim que o conteúdo for carregado
document.addEventListener('DOMContentLoaded', updateDashboardCounter);

function updateDashboardCounter() {
  const reservedCountEl = document.getElementById('reservedCount');
  
  if (!reservedCountEl) return;

  // Busca todas as reservas cadastradas
  const allReservations = getReservations();

  // Filtra para contar apenas as que NÃO estão canceladas
  const activeReservations = allReservations.filter(r => !isReservationCancelled(r));

  // Atualiza o número no HTML
  reservedCountEl.textContent = activeReservations.length;
}

// Executa a atualização assim que o conteúdo for carregado
document.addEventListener('DOMContentLoaded', updateDashboardCounter);