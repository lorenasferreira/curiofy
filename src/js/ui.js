// export function renderFavorites(favoritesArray, listElement, onRemoveFavorite) {
//   listElement.innerHTML = "";

//   if (favoritesArray.length === 0) {
//     const li = document.createElement("li");
//     li.textContent = "No favorites yet";
//     listElement.appendChild(li);
//     return;
//   }

//   favoritesArray.forEach((fact, index) => {
//     const li = document.createElement("li");

//     const text = document.createElement("span");
//     text.textContent = fact;

//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "✖";
//     removeBtn.classList.add("remove-btn");
//     removeBtn.addEventListener("click", () => {
//       onRemoveFavorite(index);
//     });

//     li.appendChild(text);
//     li.appendChild(removeBtn);
//     listElement.appendChild(li);
//   });
// }

// export function showFactStatus(statusElement, message) {
//   statusElement.textContent = message;
//   statusElement.classList.add("active");
// }

// export function clearFactStatus(statusElement) {
//   statusElement.textContent = "";
//   statusElement.classList.remove("active");
// }

// export function hideFactText(factElement) {
//   factElement.classList.remove("show");
//   factElement.classList.add("hidden");
// }

// export function revealFactText(factElement, text) {
//   factElement.textContent = text;
//   factElement.classList.remove("hidden");
//   factElement.classList.add("show");
// }

// export function setButtonDisabled(buttonElement, isDisabled) {
//   buttonElement.disabled = isDisabled;
// }

export function renderFavorites(favoritesArray, listElement, onRemoveFavorite) {
  listElement.innerHTML = "";

  if (favoritesArray.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No favorites yet";
    listElement.appendChild(li);
    return;
  }

  favoritesArray.forEach((fact, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = fact;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      onRemoveFavorite(index);
    });

    li.appendChild(text);
    li.appendChild(removeBtn);
    listElement.appendChild(li);
  });
}

export function showFactStatus(statusElement, message) {
  statusElement.textContent = message;
  statusElement.classList.add("active");
}

export function clearFactStatus(statusElement) {
  statusElement.textContent = "";
  statusElement.classList.remove("active");
}

export function hideFactText(factElement) {
  factElement.classList.remove("show", "revealing");
  factElement.classList.add("hidden");
}

export function revealFactText(factElement, text) {
  factElement.classList.remove("hidden", "show");
  factElement.classList.add("revealing");
  factElement.textContent = text;

  requestAnimationFrame(() => {
    factElement.classList.remove("revealing");
    factElement.classList.add("show");
  });
}

export function setButtonDisabled(buttonElement, isDisabled) {
  buttonElement.disabled = isDisabled;
}