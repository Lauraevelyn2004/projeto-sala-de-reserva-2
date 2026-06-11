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

Além do desenvolvimento da interface, este projeto também contempla a **estruturação da experiência do usuário**, com foco em **arquitetura da informação**, **fluxos de navegação** e **especificação do diálogo**.

---

## Acesso ao projeto

- **Repositório GitHub:** [projeto-sala-de-reserva](https://github.com/Lauraevelyn2004/projeto-sala-de-reserva)

---

## Tecnologias utilizadas

- **HTML5** (Estrutura semântica)
- **CSS3** (Variáveis, Flexbox, Grid e Media Queries)
- **JavaScript Vanilla** (Lógica de validação e manipulação do DOM)
- **LocalStorage API** (Simulação de banco de dados no lado do cliente)

---

## Estrutura principal do projeto

O sistema está organizado nas seguintes telas funcionais:

- `login.html` → Tela de autenticação do usuário
- `dashboard.html` → Painel principal do sistema
- `agenda.html` → Visualização da agenda/disponibilidade das salas
- `nova-reserva.html` → Criação de uma nova reserva com validação de horários
- `minhas-reservas.html` → Consulta, histórico e cancelamento das reservas
- `admin.html` → Área administrativa (acessível apenas via perfil Admin)
- `assets/` → Arquivos de apoio (imagens, estilos globais, scripts segmentados).

---

## Entrega 5 — Recursos de Hardware, Software e Estados de Interface

Para atender aos critérios técnicos, o sistema conta com as seguintes decisões aplicadas ao contexto de uso:

* **Dispositivo-alvo e Responsividade:** A aplicação foi projetada para ser multiplataforma. Através de CSS puro com *Media Queries* (`max-width: 980px`), o sistema adapta automaticamente o menu lateral para o fluxo em cascata, reajusta os formulários (Grid passa de duas colunas para uma) e os botões de ação para preencher a tela, garantindo a ergonomia do *touch* em smartphones.
* **Funcionalidades Offline:** Implementamos um observador de rede (`window.addEventListener('offline')`). Caso o usuário perca a conexão, a interface reage dinamicamente ativando uma classe no `body` que exibe um alerta superior vermelho, alertando sobre a indisponibilidade de algumas ações. O `localStorage` garante que as informações visualizadas permaneçam em tela.
* **Estados da Interface (Feedback do Sistema):** * **Loading:** Adicionada tela de carregamento na transição entre o Login e o Dashboard (feedback de processamento).
  * **Sucesso/Erro:** Sistema de notificações por `Toast` (avisos flutuantes verdes/vermelhos) e campos de formulário que ficam com borda avermelhada alertando falha no preenchimento.
  * **Empty States:** Mensagens amigáveis para quando as listas (agenda ou reservas) estiverem vazias.
