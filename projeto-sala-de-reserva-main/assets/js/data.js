const STORAGE_KEYS = {
  users: 'sala360_users',
  responsaveis: 'sala360_responsaveis',
  reservations: 'sala360_reservations',
  currentUser: 'sala360_currentUser',
  theme: 'sala360_theme'
};

function getSlots() {
  return loadData(STORAGE_KEYS.slots, []);
}

function saveSlots(slots) {
  saveData(STORAGE_KEYS.slots, slots);
}

// ================= DADOS PADRÃO =================
const defaultUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'aluno@ifsuldeminas.edu.br',
    password: '1234',
    role: 'usuario'
  },
  {
    id: 2,
    name: 'Letícia Amaral',
    email: 'admin@ifsuldeminas.edu.br',
    password: 'admin123',
    role: 'admin'
  }
];

const defaultResponsaveis = [
  {
    id: 1,
    nome: 'Prof. Carlos Henrique',
    email: 'carlos.henrique@ifsuldeminas.edu.br',
    telefone: '(35) 99999-1111'
  },
  {
    id: 2,
    nome: 'Profa. Mariana Souza',
    email: 'mariana.souza@ifsuldeminas.edu.br',
    telefone: '(35) 99999-2222'
  }
];

const defaultReservations = [
  {
    id: 1,
    userEmail: 'aluno@ifsuldeminas.edu.br',
    userName: 'João Silva',
    responsavelId: 1,
    responsavelNome: 'Prof. Carlos Henrique',
    purpose: 'Estudo em grupo',
    notes: 'Apresentação do projeto',
    date: '2026-04-10',
    startTime: '10:00',
    endTime: '12:00',
    status: 'ativa',
    createdAt: new Date().toISOString(),
    cancelReason: '',
    cancelledBy: '',
    cancelledAt: ''
  }
];

// ================= BASE =================
function loadData(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================= INIT =================
if (!localStorage.getItem(STORAGE_KEYS.users)) {
  saveData(STORAGE_KEYS.users, defaultUsers);
}

if (!localStorage.getItem(STORAGE_KEYS.responsaveis)) {
  saveData(STORAGE_KEYS.responsaveis, defaultResponsaveis);
}

if (!localStorage.getItem(STORAGE_KEYS.reservations)) {
  saveData(STORAGE_KEYS.reservations, defaultReservations);
}

// ================= USERS =================
function getUsers() {
  return loadData(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  saveData(STORAGE_KEYS.users, users);
}

// ================= RESPONSÁVEIS =================
function getResponsaveis() {
  return loadData(STORAGE_KEYS.responsaveis, []);
}

function saveResponsaveis(responsaveis) {
  saveData(STORAGE_KEYS.responsaveis, responsaveis);
}

// ================= RESERVAS =================
function getReservations() {
  return loadData(STORAGE_KEYS.reservations, []);
}

function saveReservations(reservations) {
  saveData(STORAGE_KEYS.reservations, reservations);
}

// ================= AUTH =================
function getCurrentUser() {
  return loadData(STORAGE_KEYS.currentUser, null);
}

function setCurrentUser(user) {
  saveData(STORAGE_KEYS.currentUser, user);
}

function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}


