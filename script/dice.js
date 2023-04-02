let isPlayerActive = false;

const spinDice = (requestedPlayer) => {
  if (isPlayerActive) {
    return;
  }
  let count = 0;
  let spinDiceInterval;
  console.log("spin dice func called");
  const player = document.getElementsByClassName(
    `piece-outer ${requestedPlayer}`
  );
  const playerFour = document.getElementById("player4");
  const spinSound = document.getElementById("spin");
  const imgs = [
    "./assets/dice-1.png",
    "./assets/dice-6.png",
    "./assets/dice-3.png",
    "./assets/dice-4.png",
    "./assets/dice-5.png",
    "./assets/dice-2.png",
  ];
  for (let p of player) {
    p.classList.remove("animate-player-piece");
  }
  spinDiceInterval = setInterval(() => {
    spinSound.play();
    count++;
    let radomizeDice = Math.floor(Math.random() * (4 - 0) + 1);
    playerFour.setAttribute("src", imgs[radomizeDice]);
    if (count === 10) {
      count = 0;
      clearInterval(spinDiceInterval);
      spinSound.pause();
      spinSound.currentTime = 0;
      if (
        imgs[radomizeDice].includes("1") ||
        imgs[radomizeDice].includes("6")
      ) {
        isPlayerActive = true;
        console.log("player ", typeof player);
        for (let p of player) {
          console.log("p ", p.children[0].children[0]);
          p.children[0].children[0].classList.remove("hidden");
        }
      }
    }
  }, 100);
};

const gotiJeevatKaro = (requestedPiece) => {
    if (!isPlayerActive) {
        return;
    }
    isPlayerActive = false;
    console.log("requestedPiece ", requestedPiece)
  const pieceParent = document.getElementsByClassName("piece-outer yellow");
  const elem = pieceParent[0].children[0];
  const rect = elem.getBoundingClientRect();
  console.log(rect.top, rect.right, rect.bottom, rect.left);
  elem.style.position = "absolute";
  elem.style.bottom = "13.3vmin";
  elem.style.right = "-12vmin";
  console.log("elem ", elem);
  // console.log("pieceParent ", pieceParent)
};
