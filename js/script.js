document.addEventListener('DOMContentLoaded', () => {
  /* Atualiza o ano no rodapé */
  const yearEl = document.getElementById('ano');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Elementos do formulário de contato (validação e status) */
  const form = document.getElementById('form-contato');
  const statusEl = document.getElementById('status-form');
  const nameEl = document.getElementById('nome-contato');
  const emailEl = document.getElementById('email-contato');
  const messageEl = document.getElementById('mensagem-contato');

  /* Atualiza a mensagem de status visível ao usuário */
  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.type = type;
  }

  /* Validação simples de formato de e-mail */
  function isValidEmail(value) {
    const email = String(value || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getValue(el) {
    return el && typeof el.value === 'string' ? el.value.trim() : '';
  }

  /* Tratador do envio do formulário */
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = getValue(nameEl);
      const email = getValue(emailEl);
      const message = getValue(messageEl);

      if (!name) {
        setStatus('Por favor, informe seu nome.', 'error');
        if (nameEl) nameEl.focus();
        return;
      }

      if (!email) {
        setStatus('Por favor, informe seu e-mail.', 'error');
        if (emailEl) emailEl.focus();
        return;
      }

      if (!isValidEmail(email)) {
        setStatus('Por favor, informe um e-mail válido.', 'error');
        if (emailEl) emailEl.focus();
        return;
      }

      if (!message) {
        setStatus('Por favor, escreva uma mensagem.', 'error');
        if (messageEl) messageEl.focus();
        return;
      }

      form.reset();
      setStatus('Mensagem enviada com sucesso!', 'success');
    });
  }

  /* Controle de tema */
  const toggle = document.getElementById('alternar-tema');
  const root = document.documentElement;

  const moonSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>';
  const sunSVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M6.76 4.84l-1.8-1.79L3.17 5.84l1.79 1.79 1.8-2.79zM1 13h3v-2H1v2zm10 8h2v-3h-2v3zm7.04-2.46l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM4.21 18.36L2.42 20.15l1.79 1.79 1.79-1.79-1.79-1.79zM20 13h3v-2h-3v2zm-7-9h2V1h-2v3z" fill="currentColor"/></svg>';

  /* Atualiza o ícone do botão */
  function updateIcon() {
    if (!toggle) return;

    const iconEl = toggle.querySelector('.icone-tema');
    const isDark = root.getAttribute('data-theme') === 'dark';

    if (iconEl) {
      iconEl.innerHTML = isDark ? sunSVG : moonSVG;
    }

    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  /* Carrega preferência de tema */
  const saved = localStorage.getItem('theme');

  if (saved) {
    root.setAttribute('data-theme', saved);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  updateIcon();

  /* Alternar tema */
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';

      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      updateIcon();
    });
  }
});