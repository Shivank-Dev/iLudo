import { STEPS_COORDINATES, DICE_STATE } from "./constants.js";
import { UI } from "./UI.js";

export class Ludo {

  diceRollStatus = DICE_STATE.NOT_ROLLED;

  diceValue = null;

  currentPlayer = null;

  getDiceValue() {
    return this.diceValue;
  }

  setDiceValue(value, diceSrc) {
    this.diceValue = value;
    UI.updateDice(this.currentPlayer, value);
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(value) {
    this.currentPlayer = value;
  }

  constructor() {
    console.log("ludo js init");
    this.setCoordinates();
    this.listenDiceClick();
    UI.hideAllDices();
  }

  setCoordinates() {
    const steps = document.querySelectorAll(".step");
    for (let i = 0; i < steps.length; i++) {
      STEPS_COORDINATES[i] = [
        steps[i].getBoundingClientRect().x,
        steps[i].getBoundingClientRect().y,
      ];
      steps[i].innerHTML = i;
    }
  }

  listenDiceClick() {
    UI.diceClickListener((event) => this.onDiceClick(event));
  }

  onDiceClick(event) {
    this.setCurrentPlayer(event.target.getAttribute("diceplayerid"));
    UI.unhighlightPieces();
    this.rollDice();
  }

  rollDice() {
    // if (this.diceRollStatus === DICE_STATE.ROLLED) {
    //   return;
    // }
    this.diceRollStatus = DICE_STATE.ROLLED;
    UI.playDiceRollingSound();
    const dice = [
      "./assets/dice-1.png",
      "./assets/dice-6.png",
      "./assets/dice-3.png",
      "./assets/dice-4.png",
      "./assets/dice-5.png",
      "./assets/dice-2.png",
    ];
    let spinDiceInterval = null;
    let count = 0;
    spinDiceInterval = setInterval(() => {
      count++;
      let radomizeDice = Math.floor(Math.random() * (4 - 0) + 1);
      this.setDiceValue(dice[radomizeDice]);
      if (count === 10) {
        UI.stopDiceRollingSound();
        count = 0;
        clearInterval(spinDiceInterval);
        UI.passDiceToNextPlayer(this.getCurrentPlayer(), this.onDiceClick)
        this.validateDice()
      }
    }, 100);
  }

  validateDice() {
    if (
      this.getDiceValue().includes("1") ||
      this.getDiceValue().includes("6")
    ) {
      UI.highlightPieces(this.getCurrentPlayer());
    }
  }
}
