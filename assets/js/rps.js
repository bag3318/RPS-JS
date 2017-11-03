var rps = /** @class */ (function () {
    function rps(game) {
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.gestures = new Array("rock", "paper", "scissors");
        this.rules = new Object({
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        });
        this.isPlayerWinner = false;
        this.isComputerWinner = false;
        this.welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember, the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";
        this._gameName = game;
    }
    rps.prototype.Game = function () {
        console.log(this._gameName);
    };
    Object.defineProperty(rps.prototype, "gameName", {
        get: function () {
            return this._gameName;
        },
        set: function (gameName) {
            this._gameName = gameName;
        },
        enumerable: true,
        configurable: true
    });
    rps.prototype.Start = function () {
        var ready = confirm(this.welcomeMsg);
        if (ready) {
            this.PlayGame(3);
        }
        else {
            alert("Sorry you don't wanna play, maybe next time! :)");
        }
    };
    rps.prototype.DetermineWinner = function () {
        var msgW = "The player has " + this.playerScore + " points compared to the computer\'s " + this.computerScore + " points (ties: " + this.ties + "). So the player wins!";
        var msgL = "The computer has " + this.computerScore + " points compared to the player\'s " + this.playerScore + " points (ties: " + this.ties + "). So the computer wins!";
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
    };
    rps.prototype.PlayGame = function (numOfRounds) {
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
    };
    rps.prototype.PlayerGuess = function () {
        var playerChoice = prompt("Choose rock, paper, or scissors:");
        if (this.gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        }
        else {
            alert("You typed something else or did not spell your choice correctly. Please try again!");
            return this.PlayerGuess();
        }
    };
    rps.prototype.ComputerGuess = function () {
        var cpuChoice = Math.floor((Math.random() * 3) + 1);
        switch (cpuChoice) {
            case 1:
                return this.gestures[0];
            case 2:
                return this.gestures[1];
            case 3:
                return this.gestures[2];
        }
    };
    rps.prototype.CompareGuesses = function (guess1, guess2, points) {
        var output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "! \n";
        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            alert(output + "\nPlayer wins the round! \n\n" + "Player Score: " + this.playerScore + ", Computer Score: " + this.computerScore + ".");
            this.DetermineWinner();
            return 1;
        }
        else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            alert(output + "\nComputer wins the round! \n\n" + "Player Score: " + this.playerScore + ", Computer Score: " + this.computerScore + ".");
            this.DetermineWinner();
            return 2;
        }
        else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + this.playerScore + ", Computer Score: " + this.computerScore + ".");
            this.DetermineWinner();
            return 0;
        }
    };
    rps.prototype.BTNClick = function () {
        this.Start();
        // refresh page to play again
        location.reload(true); // true = reload page from server
    };
    rps.prototype.Init = function () {
        var rpsScript = new rps("Rock Paper Scissors");
        var element = document.querySelector("button");
        element.addEventListener("click", function () {
            rpsScript.Game();
            rpsScript.BTNClick();
        }, false);
    };
    return rps;
}());
var script = new rps("Rock Paper Scissors");
script.Init();
