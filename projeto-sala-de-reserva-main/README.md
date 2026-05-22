# Projeto Sala de Reserva

Sistema web para **reserva e gerenciamento de salas de aula**, desenvolvido para a disciplina de **Interação Humano-Computador II** (Sistemas de Informação – 5º período).

## Sobre o projeto

O **Projeto Sala de Reserva** foi criado com o objetivo de facilitar o processo de agendamento e controle de salas, oferecendo uma interface simples e organizada para que usuários possam:

- realizar login no sistema;
- visualizar o painel principal;
- consultar a agenda de salas;
- criar novas reservas;
- acompanhar suas reservas;
- acessar funcionalidades administrativas (quando aplicável).

Além do desenvolvimento da interface, este projeto também contempla a **estruturação da experiência do usuário**, com foco em **arquitetura da informação**, **fluxos de navegação** e **especificação do diálogo**, conforme solicitado na **Entrega 2** da disciplina.

---

##  Acesso ao projeto

- **Repositório GitHub:**  
  [projeto-sala-de-reserva](https://github.com/Lauraevelyn2004/projeto-sala-de-reserva)

---

## Tecnologias utilizadas

O repositório indica uso principal de:

- **HTML**
- **CSS**
- **JavaScript**

Essas são as linguagens predominantes do projeto no GitHub. 

---

##  Estrutura principal do projeto

o sistema está organizado nas seguintes telas:

- `login.html` → Tela de autenticação do usuário
- `dashboard.html` → Painel principal do sistema
- `agenda.html` → Visualização da agenda/disponibilidade das salas
- `nova-reserva.html` → Criação de uma nova reserva
- `minhas-reservas.html` → Consulta e gerenciamento das reservas do usuário
- `admin.html` → Área administrativa
- `assets/` → Arquivos de apoio (imagens, estilos, scripts, ícones, etc.)

---

## Objetivo da Entrega 2

Nesta etapa, o foco é **estruturar a experiência do usuário como um produto completo**, definindo:

- fluxos de interação;
- organização da informação;
- hierarquia das telas;
- comportamentos do sistema;
- validações e feedbacks ao usuário.

---

# Entrega 2 — Projeto do Diálogo + Arquitetura da Informação

## 1. Mapa do sistema (Sitemap / Mapa de navegação)

Abaixo está a proposta de estrutura de navegação do sistema:

```text
Login
 └── Dashboard
      ├── Agenda de Salas
      │    ├── Visualizar disponibilidade
      │    └── Selecionar sala/horário
      ├── Nova Reserva
      │    ├── Escolher sala
      │    ├── Definir data e horário
      │    ├── Confirmar reserva
      │    └── Feedback de sucesso/erro
      ├── Minhas Reservas
      │    ├── Listar reservas
      │    ├── Visualizar detalhes
      │    ├── Editar (se permitido)
      │    └── Cancelar reserva
      └── Admin
           ├── Visualizar reservas gerais
           ├── Gerenciar usuários
           
