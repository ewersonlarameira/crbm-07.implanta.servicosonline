const resultStyles = document.createElement('link');
resultStyles.rel = 'stylesheet';
resultStyles.href = 'result.css';
document.head.appendChild(resultStyles);

const form = document.querySelector('#searchForm');
const out = document.querySelector('#resultBody');

const records = [
  {
    nome: 'LUDMILLA LARA MEIRA',
    registro: '15298',
    cpf: '10794337759',
    categoria: 'BIOMÉDICO',
    dataInscricao: '30/09/2026',
    dataSituacao: '30/09/2026',
    especialidades: 'Biomedicina Estética',
    areas: 'Área de Atuação | Estética'
  },
  {
    nome: 'GRAZIELE SOUSA DOS SANTOS',
    registro: '10846',
    cpf: '41875935860',
    categoria: 'BIOMÉDICO',
    dataInscricao: '27/04/2026',
    dataSituacao: '27/04/2026',
    especialidades: 'Biomedicina Estética | Imagenologia',
    areas: 'Não cadastrado'
  }
];

function getPanels(record) {
  return {
    inscricao: `<div class="info-grid"><div class="info-item"><strong>DEFINITIVO (PRINCIPAL)</strong><span>TIPO DE INSCRIÇÃO</span></div><div class="info-item"><strong>${record.dataInscricao}</strong><span>DATA DE INSCRIÇÃO</span></div><div class="info-item"><strong>${record.dataSituacao}</strong><span>DATA DA SITUAÇÃO</span></div><div class="info-item"><strong>_</strong><span>DATA DE VALIDADE</span></div><div class="info-item"><strong>ATIVO | ATIVO</strong><span>SITUAÇÃO | DETALHE DA SITUAÇÃO</span></div></div>`,
    especialidades: `<div class="info-grid"><div class="info-item"><strong>${record.especialidades}</strong><span>ESPECIALIDADES ATIVAS</span></div></div>`,
    contatos: `<div class="info-grid"><div class="info-item"><strong>Informações de contato não exibidas por segurança</strong><span>DADOS DE CONTATOS</span></div></div>`,
    responsabilidades: `<div class="info-grid"><div class="info-item"><strong>Não cadastrado</strong><span>TIPO RESPONSABILIDADE</span></div></div>`,
    areas: `<div class="info-grid"><div class="info-item"><strong>${record.areas}</strong><span>ÁREAS DE ATUAÇÃO</span></div></div>`
  };
}

function showPanel(key, record) {
  out.querySelectorAll('[role="tab"]').forEach(button => {
    const selected = button.dataset.panel === key;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', selected);
    button.tabIndex = selected ? 0 : -1;
  });
  const panel = out.querySelector('#tabPanel');
  panel.innerHTML = getPanels(record)[key];
  panel.setAttribute('aria-labelledby', `tab-${key}`);
}

function renderResult(record) {
  out.innerHTML = `<article class="profile-card"><header class="profile-head"><strong>${record.nome}</strong><span>NOME</span><div class="profile-meta"><b>${record.categoria}</b><b>${record.registro}</b></div><div class="profile-labels"><span>CATEGORIA</span><span>Nº INSCRIÇÃO NO CONSELHO</span></div></header><div class="tabs" role="tablist" aria-label="Informações do registro"><button id="tab-inscricao" type="button" role="tab" data-panel="inscricao">DADOS DE INSCRIÇÃO</button><button id="tab-especialidades" type="button" role="tab" data-panel="especialidades">ESPECIALIDADES</button><button id="tab-contatos" type="button" role="tab" data-panel="contatos">DADOS DE CONTATOS</button><button id="tab-responsabilidades" type="button" role="tab" data-panel="responsabilidades">RESPONSABILIDADES</button><button id="tab-areas" type="button" role="tab" data-panel="areas">ÁREAS DE ATUAÇÃO</button></div><section id="tabPanel" class="tab-panel" role="tabpanel"></section><p class="fiction-note"></p></article>`;
  out.querySelectorAll('[role="tab"]').forEach(button => {
    button.addEventListener('click', () => showPanel(button.dataset.panel, record));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...out.querySelectorAll('[role="tab"]')];
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(tabs.indexOf(button) + direction + tabs.length) % tabs.length];
      next.focus(); showPanel(next.dataset.panel, record);
    });
  });
  showPanel('inscricao', record);
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

  const nomeNormalizado = nome.replace(/\s+/g, ' ').toUpperCase();
  const documentoNormalizado = documento.replace(/\D/g, '');
  const record = records.find(item =>
    (!registro || registro === item.registro) &&
    (!nome || nomeNormalizado === item.nome) &&
    (!documento || documentoNormalizado === item.cpf)
  );

  if (!record) {
    out.innerHTML = '<p class="message" role="alert">Nenhum registro encontrado para os dados informados.</p>';
    return;
  }

  renderResult(record);
});
