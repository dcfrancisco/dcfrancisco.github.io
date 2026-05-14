(function () {
  const recentKey = 'recentPronunciationWords';
  const maxRecent = 10;
  const knownWordLinks = {
    queue: 'words/queue.html',
    epitome: 'words/epitome.html',
    colonel: 'words/colonel.html',
    subtle: 'words/subtle.html',
    debt: 'words/debt.html',
    genre: 'words/genre.html',
    hyperbole: 'words/hyperbole.html',
    quinoa: 'words/quinoa.html',
    entrepreneur: 'words/entrepreneur.html',
    miscellaneous: 'words/miscellaneous.html'
  };

  function getAccent() {
    const accent = document.getElementById('accent-select');
    return accent ? accent.value : 'en-US';
  }

  function speakText(text) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      alert('Your browser does not support Web Speech API speech synthesis.');
      return;
    }

    const trimmed = (text || '').trim();
    if (!trimmed) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.lang = getAccent();
    window.speechSynthesis.speak(utterance);
  }

  function readRecent() {
    try {
      const parsed = JSON.parse(localStorage.getItem(recentKey) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeRecent(value) {
    localStorage.setItem(recentKey, JSON.stringify(value));
  }

  function saveRecentWord(word) {
    const normalized = word.trim().toLowerCase();
    if (!normalized) {
      return;
    }
    const recent = readRecent().filter((item) => item !== normalized);
    recent.unshift(normalized);
    writeRecent(recent.slice(0, maxRecent));
    renderRecent();
  }

  function renderRecent() {
    const container = document.getElementById('recent-words');
    if (!container) {
      return;
    }
    const recent = readRecent();
    container.innerHTML = '';
    if (!recent.length) {
      const item = document.createElement('li');
      item.textContent = 'No words yet. Practice a word to populate this list.';
      container.appendChild(item);
      return;
    }
    recent.forEach((word) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = knownWordLinks[word] || '#';
      link.setAttribute('data-recent-word', word);
      link.textContent = word;
      item.appendChild(link);
      container.appendChild(item);
    });
  }

  function setupInputTool() {
    const input = document.getElementById('word-input');
    const speakButton = document.getElementById('speak-button');
    const clearButton = document.getElementById('clear-button');

    if (!input || !speakButton || !clearButton) {
      return;
    }

    speakButton.addEventListener('click', function () {
      const value = input.value.trim();
      speakText(value);
      saveRecentWord(value);
    });

    clearButton.addEventListener('click', function () {
      input.value = '';
      input.focus();
    });

    renderRecent();

    const recentList = document.getElementById('recent-words');
    if (recentList) {
      recentList.addEventListener('click', function (event) {
        const target = event.target;
        if (!(target instanceof HTMLAnchorElement)) {
          return;
        }
        const word = target.getAttribute('data-recent-word');
        if (!word) {
          return;
        }
        event.preventDefault();
        input.value = word;
        speakText(word);
      });
    }
  }

  function setupHearButtons() {
    document.querySelectorAll('[data-pronunciation]').forEach((button) => {
      button.addEventListener('click', function () {
        speakText(button.getAttribute('data-pronunciation') || '');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupInputTool();
    setupHearButtons();
  });
})();
