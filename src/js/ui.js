export function renderFavorites(favoritesArray, listElement) {
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
      favoritesArray.splice(index, 1);
      renderFavorites(favoritesArray, listElement);
    });

    li.appendChild(text);
    li.appendChild(removeBtn);
    listElement.appendChild(li);
  });
}