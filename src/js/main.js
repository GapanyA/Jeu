const emojis = [
  "👄",
  "🧚‍♀️",
  "🫧",
  "🐢",
  "🤡",
  "👁️",
  "🐤",
  "🙊",
  "🌽",
  "🌵",
  "🌻",
  "🐝",
  "👄",
  "🧚‍♀️",
  "🫧",
  "🐢",
  "🤡",
  "👁️",
  "🐤",
  "🙊",
  "🌽",
  "🌵",
  "🌻",
  "🐝",
];

let firstChoice = null;
let secondChoice = null;

const board = document.querySelector("#board");
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

shuffle(emojis).forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card", "hidden");
  card.dataset.emoji = emoji;

  card.addEventListener("click", () => {
    if (firstChoice === null) {
      firstChoice = card;
      card.classList.remove("hidden");
    } else if (secondChoice === null) {
      secondChoice = card;
      card.classList.remove("hidden");
    } else {
      // on ne fait rien
    }
  });

  board.appendChild(card);
});
