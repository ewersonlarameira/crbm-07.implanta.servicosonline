const resultStyles = document.createElement('link');
resultStyles.rel = 'stylesheet';
resultStyles.href = 'result.css';
document.head.appendChild(resultStyles);

const form = document.querySelector('#searchForm');
const out = document.querySelector('#resultBody');

const panels = {
  inscricao: `<div class="info-grid"><div class="info-item"><strong>DEFINITIVO (PRINCIPAL)</strong><span>TIPO DE INSCRIÇÃO</span></div><div class="info-item"><strong>30/09/2026</strong><span>DATA DE INSCRIÇÃO</span></div><div class="info-item"><strong>30/09/2026</strong><span>DATA DA SITUAÇÃO</span></div><div class="info-item"><strong>_</strong><span>DATA DE VALIDADE</span></div><div class="info-item"><strong>ATIVO | ATIVO</strong><span>SITUAÇÃO | DETALHE DA SITUAÇÃO</span></div></div>`,
  especialidades: `<div class="info-grid"><div class="info-item"><strong>Biomedicina Estética | Estética Avançada | Endolaser Facial-Corporal | Harmonização Facial-Corporal</strong><span>ESPECIALIDADES ATIVAS</span></div></div>`,
  contatos: `<div class="info-grid"><div class="info-item"><strong>Informações de contato não exibidas por segurança</strong><span>DADOS DE CONTATOS</span></div></div>`,
  responsabilidades: `<div class="info-grid"><div class="info-item"><strong>Não cadastrado</strong><span>TIPO RESPONSABILIDADE</span></div></div>`,
  areas: `<div class="info-grid"><div class="info-item"><strong>Área de Atuação | Estética Avançada</strong><span>ÁREAS DE ATUAÇÃO</span></div></div>`
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
  out.innerHTML = `<article class="profile-card"><header class="profile-head"><strong>LUDMILLA LARA MEIRA</strong><span>NOME</span><div class="profile-meta"><b>BIOMÉDICO(A)</b><b>15298</b></div><div class="profile-labels"><span>CATEGORIA</span><span>Nº INSCRIÇÃO NO CONSELHO</span></div></header><div class="tabs" role="tablist" aria-label="Informações do registro"><button id="tab-inscricao" type="button" role="tab" data-panel="inscricao">DADOS DE INSCRIÇÃO</button><button id="tab-especialidades" type="button" role="tab" data-panel="especialidades">ESPECIALIDADES</button><button id="tab-contatos" type="button" role="tab" data-panel="contatos">DADOS DE CONTATOS</button><button id="tab-responsabilidades" type="button" role="tab" data-panel="responsabilidades">RESPONSABILIDADES</button><button id="tab-areas" type="button" role="tab" data-panel="areas">ÁREAS DE ATUAÇÃO</button></div><section id="tabPanel" class="tab-panel" role="tabpanel"></section><p class="fiction-note"></p></article>`;
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

  const registro = form.querySelector('#registro').value.trim();
  const nome = form.querySelector('#nome').value.trim();
  const documento = form.querySelector('#documento').value.trim();

  if (!registro && !nome && !documento) {
    out.innerHTML = '<p class="message">Informe ao menos um filtro para realizar a consulta.</p>';
    return;
  }

  const consultaValida = registro === '15298' && !nome && !documento;

  if (!consultaValida) {
    out.innerHTML = '<p class="message" role="alert">Nenhum registro encontrado para os dados informados.</p>';
    return;
  }

  renderResult();
});
