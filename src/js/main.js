import { getRandomFact } from "./api.js";

const factText = document.getElementById("fact-text");

const newFactBtn = document.getElementById("btn-new");

async function loadFact() {
    const fact = await getRandomFact();

    if (fact) {
        factText.textContent = fact;
    } else {
        factText.textContent = "Something went wrong. Try again.";
    }
}

newFactBtn.addEventListener("click", loadFact);