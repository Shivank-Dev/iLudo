const playersDice = document.querySelectorAll(".dice-btn");
const spinSound = document.querySelector("#spin");
const players = {
  player1: document.querySelectorAll("[playerId='player1']"),
  player2: document.querySelectorAll("[playerId='player2']"),
  player3: document.querySelectorAll("[playerId='player3']"),
  player4: document.querySelectorAll("[playerId='player4']"),
};


export class UI {
  static diceClickListener(callback) {
    playersDice.forEach(dice => {
      dice.addEventListener("click", callback);
    })
  }

  static playerPieceListener(callback) {}

  static highlightPieces(player) {
    const currentPlayer = players[player];
    currentPlayer.forEach((cp) => {
      cp.children[0].classList.remove("hidden");
    });
  }

  static unhighlightPieces() {
    for (const p in players) {
      players[p].forEach((piece) => {
        piece.children[0].classList.add("hidden");
      });
    }
  }

  static updateDice(player, diceSrc) {
    const playerDice = document.querySelector(`[diceplayerid=${player}]`);
    playerDice.setAttribute("src", diceSrc);
  }

  static playDiceRollingSound() {
    spinSound.play();
  }

  static stopDiceRollingSound() {
    spinSound.pause();
    spinSound.currentTime = 0;
  }

  static hideAllDices() {
    console.log("playersdice", playersDice)
    playersDice.forEach((dice, index) => {
      if (index !== 0) {
      dice.classList.add('d-none');
      }
    })
  }

  static passDiceToNextPlayer(currentPlayer) {
    console.log("currentPlayer ", currentPlayer);
    const playerIndex = +currentPlayer[currentPlayer.length-1]
    const nextPlayerIndex = playerIndex === 4 ? 0 : playerIndex
    document.querySelector(`[diceplayerid=${currentPlayer}]`).classList.add('d-none');
    const playersDice = document.querySelectorAll('img.d-none');
    console.log("playersDice ", playersDice)
    playersDice[nextPlayerIndex].classList.remove('d-none');
  }
}
