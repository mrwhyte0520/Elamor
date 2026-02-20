const REQUIRED_KEY = "0210";

const screenLetter = document.getElementById("screen-letter");
const screenForm = document.getElementById("screen-form");

const btnOpen = document.getElementById("btn-open");
const letter = document.getElementById("letter");

const unlockForm = document.getElementById("unlock-form");
const unlockName = document.getElementById("unlock-name");
const unlockHint = document.getElementById("unlock-hint");
const btnReset = document.getElementById("btn-reset");
const btnToggleVisibility = document.getElementById("btn-toggle-visibility");

const valentineForm = document.getElementById("valentine-form");
const btnBack = document.getElementById("btn-back");

const result = document.getElementById("result");
const resultBox = document.getElementById("result-box");
const btnCopy = document.getElementById("btn-copy");
const btnEdit = document.getElementById("btn-edit");
const fxLayer = document.getElementById("fx-layer");

const confirmModal = document.getElementById("confirm-modal");
const btnConfirmYes = document.getElementById("btn-confirm-yes");
const btnConfirmNo = document.getElementById("btn-confirm-no");

const reveal = document.getElementById("reveal");
const btnRevealContinue = document.getElementById("btn-reveal-continue");

const dateBadge = document.getElementById("date-badge");
const dateModal = document.getElementById("date-modal");
const btnDateModalOk = document.getElementById("btn-date-modal-ok");

const loveTyped = document.getElementById("love-typed");
const loveRotator = document.getElementById("love-rotator");
const bgAudio = document.getElementById("bg-audio");

const STORAGE_LETTER_OPEN = "valentine_letter_open";

let loveTypingStarted = false;
let loveRotateTimer = null;
let bgAudioStarted = false;

function startLoveNoteAnimation(){
  if(loveTypingStarted) return;
  if(!loveTyped || !loveRotator) return;
  loveTypingStarted = true;

  const baseText = "Antes de que leas esta carta, quiero que recuerdes algo muy importante: te amo con todo mi corazon. A pesar de cada dificultad, cada prueba y cada momento duro, aqui seguimos, firmes, luchando juntos y poniendole amor y ganas a todo. Porque cuando el amor es real, no se rinde. Y ahora si… leela con el mismo amor con el que la escribi.";
  const typeDelayMs = 42;

  loveTyped.textContent = "";
  let i = 0;
  const typeTick = () => {
    if(i >= baseText.length) return;
    loveTyped.textContent += baseText[i];
    i += 1;
    window.setTimeout(typeTick, typeDelayMs);
  };
  typeTick();

  const loveWords = [
    "mi amor",
    "mi vida",
    "mi rubia",
    "mi bombom",
    "mi princesa",
    "mi reina",
    "mi cielo",
    "mi corazon",
    "mi tesoro",
    "mi todo",
    "mi mundo",
    "mi alegria",
    "mi paz",
    "mi luz",
    "mi sonrisa",
    "mi lugar seguro",
    "mi milagro",
    "mi bendicion",
    "mi buena noticia",
    "mi destino bonito",
    "mi persona favorita",
    "mi compañera",
    "mi novia linda",
    "mi esposa en oracion",
    "mi mejor decision",
    "mi mejor parte",
    "mi debilidad",
    "mi fortaleza",
    "mi sueño",
    "mi motor",
    "mi inspiración",
    "mi motivacion",
    "mi consentida",
    "mi chiquita",
    "mi bonita",
    "mi preciosa",
    "mi hermosa",
    "mi divina",
    "mi niña",
    "mi nena",
    "mi bebita",
    "mi muñequita",
    "mi encanto",
    "mi magia",
    "mi corazoncito",
    "mi lucerito",
    "mi estrellita",
    "mi sol",
    "mi lunita",
    "mi universo",
    "mi galaxia",
    "mi primavera",
    "mi flor",
    "mi rosa",
    "mi tulipan",
    "mi mar",
    "mi calma",
    "mi hogar",
    "mi refugio",
    "mi anhelo",
    "mi deseo",
    "mi razón",
    "mi motivo",
    "mi esperanza",
    "mi fe",
    "mi promesa",
    "mi futuro",
    "mi para siempre",
    "mi eternidad",
    "mi valentia",
    "mi dulzura",
    "mi ternura",
    "mi encanto hermoso",
    "mi amorcito",
    "mi vidita",
    "mi cielito",
    "mi angel",
    "mi angelito",
    "mi joya",
    "mi diamante",
    "mi tesorito",
    "mi regalo",
    "mi regalo de Dios",
    "mi compañerita",
    "mi confidente",
    "mi mejor amiga",
    "mi pareja",
    "mi complemento",
    "mi mitad",
    "mi coincidencia bonita",
    "mi casualidad perfecta",
    "mi oración contestada",
    "mi victoria",
    "mi orgullo",
    "mi admiracion",
    "mi inspiración diaria",
    "mi emoción",
    "mi cancion favorita",
    "mi poema",
    "mi historia",
    "mi amor de la vida",
  ];

  let w = 0;
  const rotateDelayMs = 1600;
  loveRotator.textContent = loveWords[w];
  loveRotator.classList.add("love-note__rotator--visible");

  loveRotateTimer = window.setInterval(() => {
    w = (w + 1) % loveWords.length;

    loveRotator.classList.remove("love-note__rotator--visible");

    window.setTimeout(() => {
      loveRotator.textContent = loveWords[w];
      loveRotator.classList.add("love-note__rotator--visible");
    }, 180);
  }, rotateDelayMs);
}

function formatToday(){
  const now = new Date();
  const parts = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long" }).formatToParts(now);
  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  if(!day || !month) return "";
  return `${day} de ${month}`;
}

function updateDateBadge(){
  if(!dateBadge) return;
  dateBadge.textContent = "Presioname";
}

function openConfirmModal(){
  if(!confirmModal) return;
  confirmModal.hidden = false;
  document.body.style.overflow = "hidden";
  btnConfirmYes?.focus();
}

function closeConfirmModal(){
  if(!confirmModal) return;
  confirmModal.hidden = true;
  document.body.style.overflow = "";
  btnOpen?.focus();
}

function openLetter(){
  if(btnOpen) btnOpen.disabled = true;
  if(letter) letter.hidden = false;
  try{ localStorage.setItem(STORAGE_LETTER_OPEN, "1"); } catch {}
  unlockName.focus();
  startLoveNoteAnimation();
}

function openReveal(){
  if(!reveal) return;
  reveal.hidden = false;
  document.body.style.overflow = "hidden";
  btnRevealContinue?.focus();
}

function closeReveal(){
  if(!reveal) return;
  reveal.hidden = true;
  document.body.style.overflow = "";
}

function openDateModal(){
  if(!dateModal) return;
  dateModal.hidden = false;
  document.body.style.overflow = "hidden";
  btnDateModalOk?.focus();
}

function closeDateModal(){
  if(!dateModal) return;
  dateModal.hidden = true;
  document.body.style.overflow = "";
}

function setActiveScreen(which){
  if(screenLetter) screenLetter.dataset.active = which === "letter" ? "true" : "false";
  if(screenForm) screenForm.dataset.active = which === "form" ? "true" : "false";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeKey(value){
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function showHint(type, message){
  unlockHint.textContent = message;
  unlockHint.classList.remove("hint--error", "hint--ok");
  if(type) unlockHint.classList.add(type === "error" ? "hint--error" : "hint--ok");
}

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function spawnFx(kind, count, originEl){
  if(!fxLayer) return;

  const rect = originEl?.getBoundingClientRect?.();
  const ox = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const oy = rect ? rect.top + rect.height / 2 : window.innerHeight / 3;

  for(let i = 0; i < count; i++){
    const el = document.createElement("div");
    el.className = `fx ${kind === "heart" ? "fx--heart" : "fx--confetti"}`;
    el.style.setProperty("--x", `${ox + rand(-30, 30)}px`);
    el.style.setProperty("--y", `${oy + rand(-10, 10)}px`);
    el.style.setProperty("--dx", `${rand(-180, 180)}px`);
    el.style.setProperty("--dy", `${rand(-240, -90)}px`);
    el.style.setProperty("--r", `${rand(-260, 260)}deg`);
    el.style.setProperty("--d", `${rand(650, 1100)}ms`);

    if(kind === "heart"){
      el.textContent = Math.random() > 0.5 ? "❤" : "💜";
      el.style.setProperty("--s", `${rand(18, 34)}px`);
    } else {
      const colors = ["#ff4d8d", "#8b5cf6", "#ffd166", "#5eead4", "#a7f3d0"]; 
      el.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
      el.style.transform = `translate(-50%, -50%) rotate(${rand(0, 360)}deg)`;
    }

    fxLayer.appendChild(el);
    const duration = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 900;
    window.setTimeout(() => el.remove(), duration + 120);
  }
}

btnOpen?.addEventListener("click", () => {
  openConfirmModal();
});

btnConfirmYes?.addEventListener("click", () => {
  closeConfirmModal();
  openLetter();
});

btnConfirmNo?.addEventListener("click", () => {
  closeConfirmModal();
});

confirmModal?.addEventListener("click", (e) => {
  const target = e.target;
  if(target?.closest?.("[data-modal-close]")) closeConfirmModal();
});

dateModal?.addEventListener("click", (e) => {
  const target = e.target;
  if(target?.closest?.("[data-date-modal-close]")) closeDateModal();
});

window.addEventListener("keydown", (e) => {
  if(e.key !== "Escape") return;
  if(confirmModal && !confirmModal.hidden) closeConfirmModal();
  if(reveal && !reveal.hidden) closeReveal();
  if(dateModal && !dateModal.hidden) closeDateModal();
});

btnDateModalOk?.addEventListener("click", () => {
  closeDateModal();
});

dateBadge?.addEventListener("click", () => {
  spawnFx("heart", 10, dateBadge);
  openDateModal();
});

updateDateBadge();
setInterval(updateDateBadge, 60_000);

// Restore: if she opens the link again on the same device, keep the letter open
try{
  if(localStorage.getItem(STORAGE_LETTER_OPEN) === "1"){
    if(btnOpen) btnOpen.disabled = true;
    if(letter) letter.hidden = false;
    startLoveNoteAnimation();
  }
} catch {}

// --- Audio de fondo ---
async function ensureBgAudioPlaying(){
  if(!bgAudio) return;
  try{
    if(bgAudio.paused){
      await bgAudio.play();
    }
    bgAudioStarted = true;
  } catch {
    // Algunos navegadores requieren más interacción; ignoramos errores.
  }
}

if(bgAudio){
  // Intento inicial (por si el navegador lo permite).
  ensureBgAudioPlaying();

  // En la primera interacción del usuario, forzar play.
  ["click","keydown","touchstart"].forEach((evt) => {
    window.addEventListener(evt, () => {
      if(!bgAudioStarted) ensureBgAudioPlaying();
    }, { once:false });
  });

  // Si el audio se pausa por alguna razón, intentar reanudar en la siguiente interacción.
  bgAudio.addEventListener("pause", () => {
    bgAudioStarted = false;
  });
}

btnToggleVisibility?.addEventListener("click", () => {
  const isHidden = unlockName.type === "password";
  unlockName.type = isHidden ? "text" : "password";
  btnToggleVisibility.textContent = isHidden ? "Ocultar" : "Mostrar";
  unlockName.focus();
});

btnReset?.addEventListener("click", () => {
  unlockName.value = "";
  showHint(null, "");
  unlockName.focus();
});

unlockForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const key = normalizeKey(unlockName.value);

  if(key.length === 0){
    showHint("error", "Escribe tu nombre completo para entrar.");
    return;
  }

  if(key !== REQUIRED_KEY){
    showHint("error", "Clave incorrecta.");
    return;
  }

  showHint("ok", "Perfecto. Bienvenida, mi amor.");
  spawnFx("heart", 14, unlockForm);
  spawnFx("confetti", 22, unlockForm);
  setTimeout(() => openReveal(), 550);
});

btnRevealContinue?.addEventListener("click", () => {
  closeReveal();
});

btnBack?.addEventListener("click", () => {
  setActiveScreen("letter");
});

valentineForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(valentineForm);

  const payload = {
    "1) ¿Cómo te gustaría que te consienta hoy?": data.get("q1"),
    "2) Plan": data.get("q2"),
    "3) Canción": data.get("q3"),
    "4) Algo que quieras que mejore": data.get("q4"),
    "5) Fecha ideal": data.get("q5"),
  };

  resultBox.textContent = Object.entries(payload)
    .map(([k,v]) => `${k}\n${v}\n`)
    .join("\n");

  valentineForm.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
  spawnFx("confetti", 32, result);
  spawnFx("heart", 18, result);
});

btnEdit?.addEventListener("click", () => {
  result.hidden = true;
  valentineForm.hidden = false;
  valentineForm.scrollIntoView({ behavior: "smooth", block: "start" });
});

btnCopy?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(resultBox.textContent || "");
    btnCopy.textContent = "Copiado";
    setTimeout(() => (btnCopy.textContent = "Copiar"), 1200);
  } catch {
    btnCopy.textContent = "No se pudo copiar";
    setTimeout(() => (btnCopy.textContent = "Copiar"), 1400);
  }
});
