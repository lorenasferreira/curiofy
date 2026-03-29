const newFactSound = new Audio("../src/sounds/mystic-bell.mp3");
const favoriteSound = new Audio("../src/sounds/soft-pop.mp3");
const loadingSound = new Audio("../src/sounds/ambient-magic.mp3");

newFactSound.volume = 0.35;
favoriteSound.volume = 0.25;
loadingSound.volume = 0.2;
loadingSound.loop = true;

// estado global
let soundEnabled = JSON.parse(localStorage.getItem("soundEnabled")) ?? true;

function safePlay(sound) {
  if (!soundEnabled) return;

  sound.currentTime = 0;
  sound.play().catch((error) => {
    console.error("Sound error:", error);
  });
}

export function playNewFactSound() {
  safePlay(newFactSound);
}

export function playFavoriteSound() {
  safePlay(favoriteSound);
}

export function startLoadingSound() {
  if (!soundEnabled) return;

  loadingSound.currentTime = 0;
  loadingSound.play().catch((error) => {
    console.error("Loading sound error:", error);
  });
}

export function stopLoadingSound() {
  loadingSound.pause();
  loadingSound.currentTime = 0;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;

  localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));

  if (!soundEnabled) {
    stopLoadingSound();
  }

  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}
