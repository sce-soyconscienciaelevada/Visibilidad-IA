import './style.css';

const urlField = document.getElementById('url-field');
const noNote   = document.getElementById('no-sitio-note');
const urlInput = document.getElementById('url-input');

document.getElementById('sitio-si').addEventListener('change', () => {
  urlField.style.display = 'block';
  noNote.classList.remove('visible');
  setTimeout(() => { urlField.classList.add('visible'); noNote.style.display = 'none'; }, 10);
  urlInput.required = true;
});

document.getElementById('sitio-no').addEventListener('change', () => {
  urlField.classList.remove('visible');
  noNote.style.display = 'block';
  setTimeout(() => noNote.classList.add('visible'), 10);
  urlInput.required = false;
  urlInput.value = '';
  setTimeout(() => { urlField.style.display = 'none'; }, 300);
});

document.getElementById('audit-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = this;
  const btn = form.querySelector('.btn-submit');
  const origHTML = btn.innerHTML;
  btn.innerHTML = 'Enviando<span style="opacity:.6">...</span>';
  btn.disabled = true;
  btn.style.opacity = '0.75';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)),
    });
    if (res.ok) {
      form.style.opacity = '0';
      form.style.transition = 'opacity .3s ease';
      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        success.style.display = 'flex';
        setTimeout(() => success.classList.add('visible'), 10);
      }, 300);
    } else {
      throw new Error('server');
    }
  } catch {
    btn.innerHTML = origHTML;
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg,#e53e3e,#c53030)';
    btn.textContent = 'Error — intentá de nuevo';
    setTimeout(() => {
      btn.style.background = '';
      btn.innerHTML = origHTML;
    }, 3000);
  }
});
