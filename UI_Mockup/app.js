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
    progressText.textContent = `Processing ${count} PDF${count === 1 ? '' : 's'}`;
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

  document.addEventListener('click', event => {
    const chip = event.target.closest('.source-chip');
    if (!chip || !sourcePopover || !sourceText) {
      if (!event.target.closest('.source-popover')) sourcePopover.hidden = true;
      return;
    }

    event.stopPropagation();
    sourceText.textContent = chip.dataset.source || chip.textContent.trim();
    const rect = chip.getBoundingClientRect();
    sourcePopover.style.left = `${Math.min(rect.left, window.innerWidth - 340)}px`;
    sourcePopover.style.top = `${rect.bottom + 8}px`;
    sourcePopover.hidden = false;
  });

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatThread = document.getElementById('chatThread');
  const citationPanel = document.getElementById('citationPanel');

  const responseText = 'I would raise the service reduction first. The draft reduces speech therapy from 60 minutes weekly to 30 minutes weekly, but the uploaded documents do not show mastery data supporting that change.';

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
        <strong>Speech minutes changed</strong>
        <span>IEP 2024 · p.12 · 60 min/week</span>
        <span>Draft IEP 2026 · p.11 · 30 min/week</span>
      </div>
      <div class="citation-card">
        <strong>No mastery statement found</strong>
        <span>Progress Report 2026 · p.3</span>
      </div>
      <div class="citation-card">
        <strong>Suggested meeting question</strong>
        <span>Generated from cited service data</span>
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
})();
