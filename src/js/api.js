export async function getRandomFact() {
  const url = "https://uselessfacts.jsph.pl/random.json?language=en";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("API ERROR:", error);

    return null;
  }
}