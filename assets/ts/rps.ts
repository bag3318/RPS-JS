class rps {

    playerScore: number = 0;
    computerScore: number = 0;
    ties: number = 0;

    gestures:string[] = new Array("rock", "paper", "scissors");

    rules:object = new Object({
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    });

    isPlayerWinner: boolean = false;
    isComputerWinner: boolean = false;

    welcomeMsg: string = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember, the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

    private _gameName: string;

    constructor(game: string) {
        this._gameName = game;
    }

    Game() {
        console.log(this._gameName);
    }
    get gameName(): string {
        return this._gameName;
    }
    set gameName(gameName: string) {
        this._gameName = gameName;
    }

    Start() {
        var ready: boolean = confirm(this.welcomeMsg);
        if (ready) {
            this.PlayGame(3);
        }
        else {
            alert("Sorry you don't wanna play, maybe next time! :)");
        }
    }


    DetermineWinner() {
        var msgW: string;
        var msgL: string;
        switch(true) {
          case this.playerScore == 2 && this.computerScore == 1:
            msgW = `The player has ${this.playerScore} points compared to the computer\'s ${this.computerScore} point (ties: ${this.ties}). So the player wins!`;
            break;
          case this.playerScore == 1 && this.computerScore == 2 :
            msgL = `The computer has ${this.computerScore} points compared to the player\'s ${this.playerScore} point (ties: ${this.ties}). So the computer wins!`;
            break;
          case this.playerScore == 2 && this.computerScore == 0:
            msgW = `The player has ${this.playerScore} points compared to the computer\'s ${this.computerScore} points (ties: ${this.ties}). So the player wins!`;
            break;
          case this.playerScore == 0 && this.computerScore == 2:
            msgL = `The computer has ${this.computerScore} points compared to the player\'s ${this.playerScore} points (ties: ${this.ties}). So the computer wins!`;
            break;
        }
        switch (true) {
            case this.playerScore >= 2:
                this.isPlayerWinner = true;
                alert(msgW);
                break;
            case this.computerScore >= 2:
                this.isComputerWinner = true;
                alert(msgL);
                break;
        }
    }

    PlayGame(numOfRounds) {
        do {
            if (this.isPlayerWinner || this.isComputerWinner) {
                return;
            }
            var player = this.PlayerGuess();
            var computer = this.ComputerGuess();
            var result = this.CompareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!this.isPlayerWinner || !this.isComputerWinner));
    }

    PlayerGuess() {
        var playerChoice: string = prompt("Choose rock, paper, or scissors:");
        if (this.gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly. Please try again!");
            return this.PlayerGuess();
        }
    }



    ComputerGuess() {
        var cpuChoice: number = Math.floor((Math.random() * 3) + 1);
        switch (cpuChoice) {
            case 1:
                return this.gestures[0];
            case 2:
                return this.gestures[1];
            case 3:
                return this.gestures[2];
        }
    }


    CompareGuesses(guess1, guess2, points) {
        var output: string = `Player chose: ${guess1.toLowerCase()}, and the computer chose: ${guess2.toLowerCase()}!\n`;
        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            alert(`${output}\nPlayer wins the round! \n\nPlayer Score: ${this.playerScore} Computer Score: ${this.computerScore}.`);
            this.DetermineWinner();
            return 1;
        } else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            alert(`${output}\nComputer wins the round! \n\nPlayer Score: ${this.playerScore}, Computer Score: ${this.computerScore}.`);
            this.DetermineWinner();
            return 2;
        } else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            alert(`${output}\nIt's a tie! Go again, no score added! \n\nPlayer Score: ${this.playerScore}, Computer Score: ${this.computerScore}`);
            this.DetermineWinner();
            return 0;
        }
    }

    BTNClick() {
        this.Start();
        // refresh page to play again
        location.reload(true); // true = reload page from server
    }

    Init() {
        let rpsScript: rps = new rps("Rock Paper Scissors");
        var element: HTMLElement = document.querySelector("button");
        element.addEventListener("click", () => {
            rpsScript.Game();
            rpsScript.BTNClick();
        }, false);
    }
}

function loadScript(RPS) {
  let script: rps = new rps(RPS);
  script.Init();
}
loadScript("Rock Paper Scissors");
