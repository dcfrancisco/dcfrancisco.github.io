document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("word-input");
  const accent = document.getElementById("accent-select");
  const speakBtn = document.getElementById("speak-button");
  const clearBtn = document.getElementById("clear-button");
  const warning = document.getElementById("support-warning");

  function supportsSpeech() {
    return (
      "speechSynthesis" in window &&
      typeof SpeechSynthesisUtterance === "function"
    );
  }

  if (!supportsSpeech()) {
    warning.style.display = "";
    warning.textContent = "Speech synthesis not supported in this browser.";
    speakBtn.disabled = true;
    return;
  }

  function chooseVoiceForLang(lang) {
    const voices = window.speechSynthesis.getVoices();
    // prefer exact match then startsWith
    let v = voices.find((v) => v.lang === lang);
    if (!v)
      v = voices.find((v) => v.lang && v.lang.startsWith(lang.split("-")[0]));
    return v;
  }

  // Some browsers load voices asynchronously
  let voicesLoaded = false;
  function ensureVoices(cb) {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      voicesLoaded = true;
      cb();
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
      cb();
    };
  }

  function speak() {
    const text = input.value.trim();
    if (!text) return;
    const lang = accent.value || "en-US";
    const utter = new SpeechSynthesisUtterance(text);
    const voice = chooseVoiceForLang(lang);
    if (voice) utter.voice = voice;
    utter.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  speakBtn.addEventListener("click", () => {
    ensureVoices(speak);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
  });
});
