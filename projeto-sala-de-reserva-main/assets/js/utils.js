// assets/js/utils.js

// Monitoramento de Estado Offline
window.addEventListener('offline', () => document.body.classList.add('is-offline'));
window.addEventListener('online', () => document.body.classList.remove('is-offline'));

/** Exibe notificação com Ícone/Cor */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> ${message}`;
  
  // Forçar a reinicialização da animação do CSS
  toast.className = 'toast';
  void toast.offsetWidth; 
  toast.classList.add('show', type);

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');
}

function timeToMinutes(time) {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatDateTime(dateIso) {
  if (!dateIso) return '-';
  return new Date(dateIso).toLocaleString('pt-BR');
}

function generateTimeOptions(start = '07:00', end = '19:00', step = 60) {
  const times = [];
  let current = timeToMinutes(start);
  const limit = timeToMinutes(end);

  while (current <= limit) {
    const h = String(Math.floor(current / 60)).padStart(2, '0');
    const m = String(current % 60).padStart(2, '0');
    times.push(`${h}:${m}`);
    current += step;
  }
  return times;
}

function isReservationCancelled(reservation) {
  return reservation.status === 'cancelada' || !!reservation.cancelReason;
}

/** Nova regra de conflito: Verifica Data, Horário E a Vaga Específica */
function hasConflict(date, startTime, endTime, vagaId, ignoreReservationId = null) {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  return getReservations().some(reservation => {
    if (reservation.date !== date) return false;
    
    // Ignora o conflito se for noutra vaga
    if (reservation.vaga && String(reservation.vaga) !== String(vagaId)) return false; 
    
    if (isReservationCancelled(reservation)) return false;
    if (ignoreReservationId && reservation.id === ignoreReservationId) return false;

    const existingStart = timeToMinutes(reservation.startTime || reservation.time);
    const existingEnd = reservation.endTime 
      ? timeToMinutes(reservation.endTime) 
      : existingStart + 60;

    return start < existingEnd && end > existingStart;
  });
}

// ==========================================
// LÓGICA DE TEMAS E MUDANÇA DE LOGO (CORRIGIDA)
// ==========================================

function applyTheme() {
  // Usa string direta para evitar quebras de dependência com data.js
  const savedTheme = localStorage.getItem('sala360_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateLogoImage(savedTheme);
  updateThemeButtonLabel(savedTheme);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', next);
  localStorage.setItem('sala360_theme', next);
  updateLogoImage(next);
  updateThemeButtonLabel(next);
}

// Altera o texto do botão para dar feedback em tempo real
function updateThemeButtonLabel(theme) {
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  }
}

// Garante a substituição correta da imagem do logo
function updateLogoImage(theme) {
  const logos = document.querySelectorAll('.custom-logo');
  logos.forEach(logo => {
    if (theme === 'dark') {
      logo.src = 'assets/img/logodark.png';
    } else {
      logo.src = 'assets/img/logo.png';
    }
  });
}