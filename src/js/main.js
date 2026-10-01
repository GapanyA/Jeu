const cardsToPlay = [
  "LN",
  "OP",
  "GR",
  "KA",
  "MV",
  "IH",
  "CL",
  "LH",
  "CS",
  "AA",
  "LL",
  "AL",
  "FA",
  "LS",
  "EO",
  "OB",
  "NH",
  "GB",
  "PG",
  "FC",
  "VB",
  "SP",
];
const pilotImages = {
  LN: new URL("../img/svg/LN.svg", import.meta.url),
  OP: new URL("../img/svg/OP.svg", import.meta.url),
  GR: new URL("../img/svg/GR.svg", import.meta.url),
  KA: new URL("../img/svg/KA.svg", import.meta.url),
  MV: new URL("../img/svg/MV.svg", import.meta.url),
  IH: new URL("../img/svg/IH.svg", import.meta.url),
  CL: new URL("../img/svg/CL.svg", import.meta.url),
  LH: new URL("../img/svg/LH.svg", import.meta.url),
  CS: new URL("../img/svg/CS.svg", import.meta.url),
  AA: new URL("../img/svg/AA.svg", import.meta.url),
  LL: new URL("../img/svg/LL.svg", import.meta.url),
  AL: new URL("../img/svg/AL.svg", import.meta.url),
  FA: new URL("../img/svg/FA.svg", import.meta.url),
  LS: new URL("../img/svg/LS.svg", import.meta.url),
  EO: new URL("../img/svg/EO.svg", import.meta.url),
  OB: new URL("../img/svg/OB.svg", import.meta.url),
  NH: new URL("../img/svg/NH.svg", import.meta.url),
  GB: new URL("../img/svg/GB.svg", import.meta.url),
  PG: new URL("../img/svg/PG.svg", import.meta.url),
  FC: new URL("../img/svg/FC.svg", import.meta.url),
  VB: new URL("../img/svg/VB.svg", import.meta.url),
  SP: new URL("../img/svg/SP.svg", import.meta.url),
};

const pilotNames = {
  LN: "Lando Norris",
  OP: "Oscar Piastri",
  GR: "George Russell",
  KA: "Kimi Antonelli",
  MV: "Max Ver-stappen",
  IH: "Isack Hadjar",
  CL: "Charles Leclerc",
  LH: "Lewis Hamilton",
  CS: "Carlos Sainz",
  AA: "Alex Albon",
  LL: "Liam Lawson",
  AL: "Arvid Lindblad",
  FA: "Fernando Alonso",
  LS: "Lance Stroll",
  EO: "Esteban Ocon",
  OB: "Ollie Bearman",
  NH: "Nico Hülken-berg",
  GB: "Gabriel Bortoleto",
  PG: "Pierre Gasly",
  FC: "Franco Colapinto",
  VB: "Valtteri Bottas",
  SP: "Sergio Pérez",
};

const pilotColors = {
  LN: "linear-gradient(135deg, #864417, #d1702c)",
  OP: "linear-gradient(135deg, #864417, #d1702c)",
  GR: "linear-gradient(135deg, #204f45, #2cd1d1)",
  KA: "linear-gradient(135deg, #204f45, #2cd1d1)",
  MV: "linear-gradient(135deg, #151a74, #1f27c4)",
  IH: "linear-gradient(135deg, #151a74, #1f27c4)",
  CL: "linear-gradient(135deg, #660a0a, #de3f0a)",
  LH: "linear-gradient(135deg, #660a0a, #de3f0a)",
  CS: "linear-gradient(135deg, #1f27c4, #6b71e7)",
  AA: "linear-gradient(135deg, #1f27c4, #6b71e7)",
  LL: "linear-gradient(135deg, #1E2161, #4E5297)",
  AL: "linear-gradient(135deg, #1e2161, #4E5297)",
  FA: "linear-gradient(135deg, #2c553f, #2c9d50)",
  LS: "linear-gradient(135deg, #2c553f, #2c9d50)",
  EO: "linear-gradient(135deg, #531414, #AC3C3C)",
  OB: "linear-gradient(135deg, #531414, #AC3C3C)",
  NH: "linear-gradient(135deg, #2C2121, #671b1b)",
  GB: "linear-gradient(135deg, #2C2121, #671b1b)",
  PG: "linear-gradient(135deg, #1F4EC4, #4F90D9)",
  FC: "linear-gradient(135deg, #1F4EC4, #4F90D9)",
  VB: "linear-gradient(135deg, #212121, #55555F)",
  SP: "linear-gradient(135deg, #212121, #55555F)",
};
const pilotNumbers = {
  LN: "1",
  OP: "81",
  GR: "63",
  KA: "12",
  MV: "3",
  IH: "6",
  CL: "16",
  LH: "44",
  CS: "55",
  AA: "23",
  LL: "30",
  AL: "41",
  FA: "14",
  LS: "18",
  EO: "31",
  OB: "87",
  NH: "27",
  GB: "5",
  PG: "10",
  FC: "43",
  VB: "77",
  SP: "11",
};

const numbersButton = document.querySelector("#numbers-toggle");
const resetButton = document.querySelector("#restart-button");

function cardImageURL(pilot) {
  return pilotImages[pilot];
}

let firstChoice = null;
let secondChoice = null;
let cardsLeftToMatch = cardsToPlay.length;

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

const deck = [];
cardsToPlay.forEach((pilot) => {
  deck.push({ pilot, type: "image" }); // the picture card
  deck.push({ pilot, type: "name" }); // the name card
});
function startGame() {
  board.innerHTML = ""; // pick up all the old cards
  firstChoice = null; // forget what you were holding
  secondChoice = null;
  cardsLeftToMatch = cardsToPlay.length; // score back to zero
  shuffle(deck).forEach(({ pilot, type }) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.pilot = pilot;
    card.style.setProperty(
      "--img",
      type === "image" ? `url("${cardImageURL(pilot)}")` : "none",
    );
    card.style.setProperty(
      "--bg",
      pilotColors[pilot] ?? "linear-gradient(135deg, #ffffff, #dddddd)",
    );

    card.innerHTML = `
     <div class="card-inner">
     <div class="face back"></div>
     <div class="face front">
       ${type === "name" ? pilotNames[pilot] : ""}
       <span class="pilot-number">${pilotNumbers[pilot]}</span>
     </div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (!card.classList.contains("hidden")) return;

      if (firstChoice === null) {
        firstChoice = card;
        card.classList.remove("hidden");
      } else if (secondChoice === null) {
        secondChoice = card;
        card.classList.remove("hidden");

        if (firstChoice.dataset.pilot === secondChoice.dataset.pilot) {
          // Twins! Leave them face up.
          cardsLeftToMatch = cardsLeftToMatch - 1;
          if (cardsLeftToMatch === 0) {
            setTimeout(() => window.alert("Bravo !"), 600);
          }
          firstChoice = null;
          secondChoice = null;
        } else {
          // Not twins: flip them back after 1 second.
          setTimeout(() => {
            firstChoice.classList.add("hidden");
            secondChoice.classList.add("hidden");
            firstChoice = null;
            secondChoice = null;
          }, 1000);
        }
      }
    });

    board.appendChild(card);
  });
}

startGame(); // lay out the cards the first time
resetButton.addEventListener("click", startGame); // and again on restart

numbersButton.addEventListener("click", () => {
  const isOn = board.classList.toggle("show-numbers");
  // numbersButton.textContent = isOn ? "Hide numbers" : "Show numbers";
});
