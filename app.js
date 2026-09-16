const resultStyles = document.createElement('link');
resultStyles.rel = 'stylesheet';
resultStyles.href = 'result.css';
document.head.appendChild(resultStyles);

const form = document.querySelector('#searchForm');
const out = document.querySelector('#resultBody');

const panels = {
  inscricao: `<div class="info-grid"><div class="info-item"><strong>DEFINITIVO (PRINCIPAL)</strong><span>TIPO DE INSCRIÇÃO</span></div><div class="info-item"><strong>15/03/2026</strong><span>DATA DE INSCRIÇÃO</span></div><div class="info-item"><strong>15/03/2026</strong><span>DATA DA SITUAÇÃO</span></div><div class="info-item"><strong>—</strong><span>DATA DE VALIDADE</span></div><div class="info-item"><strong>ATIVO | DADOS FICTÍCIOS</strong><span>SITUAÇÃO | DETALHE DA SITUAÇÃO</span></div></div>`,
  especialidades: `<div class="info-grid"><div class="info-item"><strong>Biomedicina Estética | Imagenologia</strong><span>ESPECIALIDADES — EXEMPLO FICTÍCIO</span></div></div>`,
  contatos: `<div class="info-grid"><div class="info-item"><strong>Informações de contato não exibidas nesta demonstração</strong><span>DADOS DE CONTATOS</span></div></div>`,
  responsabilidades: `<div class="info-grid"><div class="info-item"><strong>Não cadastrado</strong><span>TIPO RESPONSABILIDADE</span></div></div>`,
  areas: `<div class="info-grid"><div class="info-item"><strong>Exemplo de área de atuação</strong><span>ÁREAS DE ATUAÇÃO — DADOS FICTÍCIOS</span></div></div>`
};

function showPanel(key) {
  out.querySelectorAll('[role="tab"]').forEach(button => {
    const selected = button.dataset.panel === key;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', selected);
    button.tabIndex = selected ? 0 : -1;
  });
  const panel = out.querySelector('#tabPanel');
  panel.innerHTML = panels[key];
  panel.setAttribute('aria-labelledby', `tab-${key}`);
}

function renderResult() {
  out.innerHTML = `<article class="profile-card"><header class="profile-head"><strong>MARINA ALVES DEMONSTRAÇÃO</strong><span>NOME</span><div class="profile-meta"><b>BIOMÉDICO(A)</b><b>DEMO-0001</b></div><div class="profile-labels"><span>CATEGORIA</span><span>Nº INSCRIÇÃO NO CONSELHO</span></div></header><div class="tabs" role="tablist" aria-label="Informações do registro fictício"><button id="tab-inscricao" type="button" role="tab" data-panel="inscricao">DADOS DE INSCRIÇÃO</button><button id="tab-especialidades" type="button" role="tab" data-panel="especialidades">ESPECIALIDADES</button><button id="tab-contatos" type="button" role="tab" data-panel="contatos">DADOS DE CONTATOS</button><button id="tab-responsabilidades" type="button" role="tab" data-panel="responsabilidades">RESPONSABILIDADES</button><button id="tab-areas" type="button" role="tab" data-panel="areas">ÁREAS DE ATUAÇÃO</button></div><section id="tabPanel" class="tab-panel" role="tabpanel"></section><p class="fiction-note">Registro inteiramente fictício, exibido somente para demonstrar o funcionamento da interface.</p></article>`;
  out.querySelectorAll('[role="tab"]').forEach(button => {
    button.addEventListener('click', () => showPanel(button.dataset.panel));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...out.querySelectorAll('[role="tab"]')];
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(tabs.indexOf(button) + direction + tabs.length) % tabs.length];
      next.focus(); showPanel(next.dataset.panel);
    });
  });
  showPanel('inscricao');
  out.scrollIntoView({behavior:'smooth', block:'start'});
}

form.addEventListener('reset', () => { out.innerHTML = ''; });
form.addEventListener('submit', event => {
  event.preventDefault();
  const hasFilter = [...form.querySelectorAll('input')].some(input => input.value.trim());
  if (!hasFilter) { out.innerHTML = '<p class="message">Informe ao menos um filtro para realizar a consulta demonstrativa.</p>'; return; }
  renderResult();
});
