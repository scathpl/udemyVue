new Vue({
  el: "#app",
  data: {
    playerHP: 100,
    opponentHP: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHP = 100;
      this.opponentHP = 100;
      this.turns = [];
    },

    attack() {
      let dmg = this.calculateDmg(3, 10); //przedzial 3-10
      this.opponentHP -= dmg;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + dmg,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },

    specialAttack() {
      let dmg = this.calculateDmg(10, 20); //przedzial 10-20
      this.opponentHP -= dmg;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster hard for " + dmg,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    monsterAttack() {
      let dmg = this.calculateDmg(5, 12); //przedzial 5-12
      this.playerHP -= dmg;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + dmg,
      });
    },
    heal() {
      if (this.playerHP <= 90) this.playerHP += 10;
      else this.playerHP = 100;
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10",
      });
      this.monsterAttack();
    },
    giveUp() {
      this.gameIsRunning = false;
      this.turns = [];
    },
    calculateDmg(min, max) {
      return (dmg = Math.max(Math.floor(Math.random() * max) + 1, min));
    },
    checkWin() {
      if (this.opponentHP <= 0) {
        if (confirm("You won! New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHP <= 0) {
        if (confirm("You lost! :( New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
