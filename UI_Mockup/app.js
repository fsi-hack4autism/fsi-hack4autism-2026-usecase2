(function () {
  'use strict';

  const navLinks = document.querySelectorAll('[data-view]');
  const views = document.querySelectorAll('.view');
  const printAllScreens = new URLSearchParams(window.location.search).get('print') === 'all';

  if (printAllScreens) {
    document.body.classList.add('print-all');
    views.forEach(view => view.classList.add('active'));
    navLinks.forEach(link => link.classList.remove('active'));
  }

  function showView(viewId) {
    if (printAllScreens) return;
    views.forEach(view => view.classList.remove('active'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', event => {
    const goto = event.target.closest('[data-goto]');
    if (!goto) return;
    event.preventDefault();
    showView(goto.dataset.goto);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => showView(link.dataset.view));
  });

  const pathCards = document.querySelectorAll('[data-path-card]');
  const pathPreviewTitle = document.getElementById('pathPreviewTitle');
  const pathPreviewText = document.getElementById('pathPreviewText');
  const pathPreviewSteps = document.getElementById('pathPreviewSteps');
  const pathContent = {
    new: {
      title: 'New build workspace',
      text: 'Start with document management. The app extracts student strengths, current needs, goals, services, and source citations before advocacy and meeting prep.',
      steps: ['Document Management', 'IEP Advocate', 'Meeting Prep']
    },
    existing: {
      title: 'Existing IEP comparison',
      text: 'Start with IEP Advocate. The app compares prior and draft IEPs, flags reductions and missing goals, then prepares meeting questions from cited evidence.',
      steps: ['IEP Advocate', 'Meeting Prep', 'Document Management']
    }
  };

  function updatePathPreview(path) {
    const content = pathContent[path];
    if (!content || !pathPreviewTitle || !pathPreviewText || !pathPreviewSteps) return;
    pathPreviewTitle.textContent = content.title;
    pathPreviewText.textContent = content.text;
    pathPreviewSteps.innerHTML = content.steps.map((step, index) => (
      `<span class="${index === 0 ? 'active' : ''}">${step}</span>`
    )).join('');
  }

  pathCards.forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('[data-goto]')) return;
      updatePathPreview(card.dataset.pathCard);
    });
  });

  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const chooseFiles = document.getElementById('chooseFiles');
  const progressWrap = document.getElementById('progressWrap');
  const progressBar = document.getElementById('progressBar');
  const progressValue = document.getElementById('progressValue');
  const progressText = document.getElementById('progressText');
  const pipelineStatus = document.getElementById('pipelineStatus');
  const uploadError = document.getElementById('uploadError');

  function simulateUpload(files) {
    const count = files && files.length ? files.length : 2;
    let progress = 0;
    uploadError.hidden = true;
    progressWrap.hidden = false;
    progressText.textContent = `Processing ${count} document${count === 1 ? '' : 's'}`;
    pipelineStatus.textContent = 'Extracting text, tables, goals, and service minutes';

    const timer = setInterval(() => {
      progress += progress < 60 ? 13 : 8;
      const safeProgress = Math.min(progress, 100);
      progressBar.style.width = `${safeProgress}%`;
      progressValue.textContent = `${safeProgress}%`;

      if (safeProgress >= 100) {
        clearInterval(timer);
        progressText.textContent = 'Upload complete';
        pipelineStatus.textContent = 'Indexed with citations and ready for review';
      }
    }, 260);
  }

  if (dropzone && fileInput) {
    chooseFiles.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('click', event => {
      if (event.target !== chooseFiles) fileInput.click();
    });
    fileInput.addEventListener('change', () => simulateUpload(fileInput.files));

    ['dragenter', 'dragover'].forEach(type => {
      dropzone.addEventListener(type, event => {
        event.preventDefault();
        dropzone.classList.add('dragging');
      });
    });

    ['dragleave', 'drop'].forEach(type => {
      dropzone.addEventListener(type, event => {
        event.preventDefault();
        dropzone.classList.remove('dragging');
      });
    });

    dropzone.addEventListener('drop', event => {
      simulateUpload(event.dataTransfer.files);
    });
  }

  const sourcePopover = document.getElementById('sourcePopover');
  const sourceText = document.getElementById('sourceText');
  const sourceLink = document.getElementById('sourceLink');
  const closeSourcePopover = document.getElementById('closeSourcePopover');

  const sourceDocuments = [
    { pattern: /Draft IEP|Draft/i, file: 'AK_IEP_Draft_2025-2026_Redacted.pdf' },
    { pattern: /IEP 2024/i, file: 'AK_IEP_2024_Redacted.pdf' },
    { pattern: /IEP 2023|IEP 2025|Eval|Evaluation|Teacher|RBT|Progress/i, file: 'MZ_IEP_6_7_2024_Redacted.pdf' }
  ];

  function sourceHref(source) {
    const pageMatch = source.match(/p\.(\d+)/i);
    const page = pageMatch ? pageMatch[1] : '1';
    const doc = sourceDocuments.find(item => item.pattern.test(source));
    const file = doc ? doc.file : 'MZ_IEP_6_7_2024_Redacted.pdf';
    return `https://github.com/fsi-hack4autism/fsi-hack4autism-2026-usecase2/blob/main/Sample_IEP_docs/${file}#page=${page}`;
  }

  if (closeSourcePopover) {
    closeSourcePopover.addEventListener('click', () => {
      sourcePopover.hidden = true;
    });
  }

  document.addEventListener('click', event => {
    const chip = event.target.closest('.source-chip');
    if (!chip || !sourcePopover || !sourceText) {
      if (!event.target.closest('.source-popover')) sourcePopover.hidden = true;
      return;
    }

    event.stopPropagation();
    const source = chip.dataset.source || chip.textContent.trim();
    sourceText.textContent = source;
    if (sourceLink) sourceLink.href = sourceHref(source);
    const rect = chip.getBoundingClientRect();
    sourcePopover.style.left = `${Math.min(rect.left, window.innerWidth - 340)}px`;
    sourcePopover.style.top = `${rect.bottom + 8}px`;
    sourcePopover.hidden = false;
  });

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatThread = document.getElementById('chatThread');
  const citationPanel = document.getElementById('citationPanel');

  const responseText = 'I would raise the direct-instruction reduction first. The draft moves Functional Life Skills/Vocational instruction from 1,800 minutes weekly to 360 minutes weekly. Then ask about direct OT being removed and speech therapy dropping from 60 to 30 minutes weekly.';

  function addMessage(role, text) {
    const message = document.createElement('article');
    message.className = `message ${role}`;
    message.innerHTML = `<span>${role === 'user' ? 'Parent' : 'Assistant'}</span><p>${text}</p>`;
    chatThread.appendChild(message);
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  function refreshCitations() {
    citationPanel.innerHTML = `
      <div class="panel-title">
        <h2>Citations</h2>
        <span class="count-pill">Updated</span>
      </div>
      <div class="citation-card">
        <strong>Direct instruction changed</strong>
        <span>IEP 2024 · p.12 · 1,800 min/week</span>
        <span>Draft IEP 2026 · p.11 · 360 min/week</span>
      </div>
      <div class="citation-card">
        <strong>Related services reduced</strong>
        <span>Speech: 60 to 30 min/week</span>
        <span>Direct OT: 30 to 0 min/week</span>
      </div>
      <div class="citation-card">
        <strong>Suggested meeting question</strong>
        <span>Ask whether the 80% reduction is a typo or supported by data.</span>
      </div>
    `;
  }

  document.querySelectorAll('[data-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      chatInput.value = button.dataset.prompt;
      chatInput.focus();
    });
  });

  if (chatForm) {
    chatForm.addEventListener('submit', event => {
      event.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage('user', text);
      chatInput.value = '';
      window.setTimeout(() => {
        addMessage('assistant', responseText);
        refreshCitations();
      }, 420);
    });
  }

  document.querySelectorAll('.flag-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      document.querySelectorAll('.flag-filter').forEach(item => item.classList.remove('active'));
      filter.classList.add('active');
    });
  });

  const summaryYearFrom = document.getElementById('summaryYearFrom');
  const summaryYearTo = document.getElementById('summaryYearTo');
  const generateYearSummary = document.getElementById('generateYearSummary');
  const yearSummaryOutput = document.getElementById('yearSummaryOutput');
  const compareYearABadge = document.getElementById('compareYearABadge');
  const compareYearBBadge = document.getElementById('compareYearBBadge');

  function comparisonSummary(fromYear, toYear) {
    if (fromYear === toYear) {
      return `Both sides are set to ${fromYear}. Choose two different IEP years to compare goals, services, concerns, and supports.`;
    }

    const from = Number(fromYear);
    const to = Number(toYear);
    const direction = from < to ? 'forward' : 'backward';

    if ((fromYear === '2024' && toYear === '2026') || (fromYear === '2026' && toYear === '2024')) {
      return `${fromYear} → ${toYear}: direct instruction drops from 1,800 to 360 min/week, direct OT is removed, and speech services are cut from 60 to 30 min/week.`;
    }

    if (fromYear === '2023' || toYear === '2023') {
      return `${fromYear} → ${toYear}: check whether earlier transition, community safety, and independence concerns carry into measurable goals and services.`;
    }

    if (fromYear === '2025' || toYear === '2025') {
      return `${fromYear} → ${toYear}: review whether evaluation findings and boundary-intervention data became goals, accommodations, or service minutes.`;
    }

    return `${fromYear} → ${toYear}: compare ${direction} across goals, present levels, services, accommodations, parent concerns, and behavior data.`;
  }

  function summaryMarkup(summary) {
    const separator = summary.indexOf(':');
    if (separator === -1) return summary;
    const prefix = summary.slice(0, separator + 1);
    const detail = summary.slice(separator + 1);
    return `<strong>${prefix}</strong>${detail}`;
  }

  function updateYearSummary() {
    if (!yearSummaryOutput || !summaryYearFrom || !summaryYearTo) return;
    yearSummaryOutput.innerHTML = summaryMarkup(comparisonSummary(summaryYearFrom.value, summaryYearTo.value));
    if (compareYearABadge) compareYearABadge.textContent = summaryYearFrom.value;
    if (compareYearBBadge) compareYearBBadge.textContent = summaryYearTo.value;
  }

  if (summaryYearFrom) summaryYearFrom.addEventListener('change', updateYearSummary);
  if (summaryYearTo) summaryYearTo.addEventListener('change', updateYearSummary);

  if (generateYearSummary) {
    generateYearSummary.addEventListener('click', updateYearSummary);
  }
})();
