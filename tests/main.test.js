import { test, expect } from "vitest";
import { addFavorite } from "../src/js/favorites.js";

test("Don't add anything when the currentFact is null", () => {
  const result = addFavorite([], null);
  expect(result).toEqual([]);
});

test("Add a new favorite", () => {
  const result = addFavorite([], "Patata");
  expect(result).toEqual(["Patata"]);
});

test("Don't duplicate favorites", () => {
  const original = ["Patata"];
  const result = addFavorite(original, "Patata");
  expect(result).toEqual(["Patata"]);
});
