export function addFavorite(favorites, currentFact) {
  if (!currentFact) return favorites;
  if (favorites.includes(currentFact)) {
    return favorites;
  }

  return [...favorites, currentFact];
}