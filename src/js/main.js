// import { getRandomFact } from "./api.js";
// import {
//   renderFavorites,
//   showFactStatus,
//   clearFactStatus,
//   hideFactText,
//   revealFactText,
//   setButtonDisabled,
// } from "./ui.js";
// import { addFavorite as addFavoritePure } from "./favorites.js";
// import {
//   playNewFactSound,
//   playFavoriteSound,
//   startLoadingSound,
//   stopLoadingSound,
//   toggleSound,
//   isSoundEnabled,
// } from "./sound.js";

// const factText = document.getElementById("fact-text");
// const factStatus = document.getElementById("fact-status");
// const newFactBtn = document.getElementById("btn-new");
// const btnFav = document.getElementById("btn-fav");
// const favoritesList = document.getElementById("favorites-list");
// const soundBtn = document.getElementById("btn-sound");

// let currentFact = null;
// let favorites = [];

// function wait(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function loadFact() {
//   setButtonDisabled(newFactBtn, true);
//   setButtonDisabled(btnFav, true);

//   showFactStatus(factStatus, "Revealing a hidden truth…");
//   hideFactText(factText);
//   startLoadingSound();

//   try {
//     const minLoadingTime = wait(1500);
//     const factPromise = getRandomFact();

//     const [fact] = await Promise.all([factPromise, minLoadingTime]);

//     stopLoadingSound();

//     if (fact) {
//       currentFact = fact;
//       revealFactText(factText, fact);
//       clearFactStatus(factStatus);
//       setButtonDisabled(btnFav, false);
//       playNewFactSound();
//     } else {
//       currentFact = null;
//       revealFactText(factText, "Something went wrong. Try again.");
//       clearFactStatus(factStatus);
//     }
//   } catch (error) {
//     stopLoadingSound();
//     currentFact = null;
//     revealFactText(factText, "Something went wrong. Try again.");
//     clearFactStatus(factStatus);
//     console.error(error);
//   } finally {
//     setButtonDisabled(newFactBtn, false);
//   }
// }

// function addFavoriteDOM() {
//   if (!currentFact) return;

//   const oldLength = favorites.length;
//   const newList = addFavoritePure(favorites, currentFact);

//   favorites = newList;
//   renderFavorites(favorites, favoritesList, removeFavoriteDOM);

//   if (favorites.length > oldLength) {
//     playFavoriteSound();
//   }
// }

// function removeFavoriteDOM(index) {
//   favorites.splice(index, 1);
//   renderFavorites(favorites, favoritesList, removeFavoriteDOM);
// }

// function updateSoundButton() {
//   if (isSoundEnabled()) {
//     soundBtn.textContent = "🔊";
//   } else {
//     soundBtn.textContent = "🔇";
//   }
// }

// soundBtn.addEventListener("click", () => {
//   toggleSound();
//   updateSoundButton();
// });

// updateSoundButton();

// newFactBtn.addEventListener("click", loadFact);
// btnFav.addEventListener("click", addFavoriteDOM);

// renderFavorites(favorites, favoritesList, removeFavoriteDOM);

import { getRandomFact } from "./api.js";
import {
  renderFavorites,
  showFactStatus,
  clearFactStatus,
  hideFactText,
  revealFactText,
  setButtonDisabled,
} from "./ui.js";
import { addFavorite as addFavoritePure } from "./favorites.js";
import {
  playNewFactSound,
  playFavoriteSound,
  startLoadingSound,
  stopLoadingSound,
  toggleSound,
  isSoundEnabled,
} from "./sound.js";

const factText = document.getElementById("fact-text");
const factStatus = document.getElementById("fact-status");
const newFactBtn = document.getElementById("btn-new");
const btnFav = document.getElementById("btn-fav");
const favoritesList = document.getElementById("favorites-list");
const soundBtn = document.getElementById("btn-sound");
const crystalBall = document.getElementById("crystal-ball");

let currentFact = null;
let favorites = [];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function startOracleState() {
  showFactStatus(factStatus, "Revealing a hidden truth…");
  factStatus.classList.add("active");
  crystalBall.classList.add("loading");
  hideFactText(factText);
  startLoadingSound();
}

function stopOracleState() {
  clearFactStatus(factStatus);
  factStatus.classList.remove("active");
  crystalBall.classList.remove("loading");
  stopLoadingSound();
}

async function loadFact() {
  setButtonDisabled(newFactBtn, true);
  setButtonDisabled(btnFav, true);

  startOracleState();

  try {
    const minLoadingTime = wait(1500);
    const factPromise = getRandomFact();

    const [fact] = await Promise.all([factPromise, minLoadingTime]);

    stopOracleState();

    if (fact) {
      currentFact = fact;
      revealFactText(factText, fact);
      setButtonDisabled(btnFav, false);
      playNewFactSound();
    } else {
      currentFact = null;
      revealFactText(factText, "Something went wrong. Try again.");
    }
  } catch (error) {
    stopOracleState();
    currentFact = null;
    revealFactText(factText, "Something went wrong. Try again.");
    console.error(error);
  } finally {
    setButtonDisabled(newFactBtn, false);
  }
}

function addFavoriteDOM() {
  if (!currentFact) return;

  const oldLength = favorites.length;
  const newList = addFavoritePure(favorites, currentFact);

  favorites = newList;
  renderFavorites(favorites, favoritesList, removeFavoriteDOM);

  if (favorites.length > oldLength) {
    playFavoriteSound();
  }
}

function removeFavoriteDOM(index) {
  favorites.splice(index, 1);
  renderFavorites(favorites, favoritesList, removeFavoriteDOM);
}

function updateSoundButton() {
  soundBtn.textContent = isSoundEnabled() ? "🔊" : "🔇";
}

soundBtn.addEventListener("click", () => {
  toggleSound();
  updateSoundButton();
});

newFactBtn.addEventListener("click", loadFact);
btnFav.addEventListener("click", addFavoriteDOM);

updateSoundButton();
renderFavorites(favorites, favoritesList, removeFavoriteDOM);