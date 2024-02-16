const score = document.querySelector("#score");
let totalFlipedCard = [];
let totalCardsOpendAndMatched = 0;

const popCardFromTotalFilpedState = (card) => {
  totalFlipedCard = totalFlipedCard.filter((flipedCard) => flipedCard != card);
};

const pushCardInFlipedState = (card) => {
  totalFlipedCard.push(card);
};

const checkIsMatch = () => {
  if (totalFlipedCard[0].innerText === totalFlipedCard[1].innerText) {
    return true;
  }
  return false;
};

const handleCardClick = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.addEventListener("click", () => {
      const isMatched = card.classList.contains("matched");
      const isAlreadyRotated = card.classList.contains("rotate");
      if (isMatched) {
        return;
      }
      if (totalFlipedCard.length >= 2) {
        totalFlipedCard.forEach((flipedCard) => {
          flipedCard.classList.remove("rotate");
        });
        totalFlipedCard = [];
      }
      if (isAlreadyRotated) {
        card.classList.remove("rotate");
        popCardFromTotalFilpedState(card);
      } else {
        card.classList.add("rotate");
        pushCardInFlipedState(card);
      }

      if (totalFlipedCard.length === 2) {
        if (checkIsMatch()) {
          totalFlipedCard.forEach((card) => {
            card.classList.add("matched");
          });
          totalFlipedCard = [];
          totalCardsOpendAndMatched += 2;
        } else {
          const currScore = Number(score.innerText);
          score.innerText = currScore + 1;
        }
        if (totalCardsOpendAndMatched === 40) {
          alert(`You Won Total Defected Moves = ${score.innerText}`);
          resetGame();
        }
      }
    })
  );
};

const suffleArray = (arr) => {
  const dumpArr = [...arr];
  let length = arr.length,
    radnomIndex;
  while (length) {
    radnomIndex = Math.floor(Math.random() * length--);
    let num = dumpArr[length];
    dumpArr[length] = dumpArr[radnomIndex];
    dumpArr[radnomIndex] = num;
  }
  return dumpArr;
};

const generateRandomArrayWithDuplicates = () => {
  const randomNumArray = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 100)
  );
  const finalArray = randomNumArray.concat(randomNumArray);
  return suffleArray(finalArray);
};

const resetGame = () => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
  startGame();
};

const startGame = () => {
  const cardsContainer = document.querySelector(".cards-container");
  const radnomNum = generateRandomArrayWithDuplicates();
  for (let i = 0; i < 40; i++) {
    cardsContainer.innerHTML += `<div class="card"><span class="content">${radnomNum[i]}</span></div>`;
  }
  handleCardClick();
};

startGame();
