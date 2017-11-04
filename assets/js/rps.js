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
        // make getter/setter
        this.welcomeMsg = "\n    Welcome to the \"Rock, Paper, Scissors\" game!\n\n    Remember, the rules are simple:\n\n    Rock Beats Scissors,\n    Scissors Beats Paper,\n    Paper Beats Rock.\n\n    Click cancel if you don't wanna play.\n    ";
        this._gameName = game;
    }
    Object.defineProperty(rps.prototype, "PlayerScore", {
        get: function () {
            return this.playerScore;
        },
        set: function (pScore) {
            this.playerScore = pScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(rps.prototype, "ComputerScore", {
        get: function () {
            return this.computerScore;
        },
        set: function (cScore) {
            this.computerScore = cScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(rps.prototype, "Ties", {
        get: function () {
            return this.ties;
        },
        set: function (tie) {
            this.ties = tie;
        },
        enumerable: true,
        configurable: true
    });
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
        var msgW;
        var msgL;
        switch (true) {
            case (this.playerScore == 2 && this.computerScore == 1) || (this.playerScore == 1 && this.computerScore == 2): {
                msgW = "\n            The player has " + this.playerScore + " points compared to the computer's " + this.computerScore + " point (ties: " + this.ties + ").\n            So the player wins!\n            ";
                msgL = "\n            The computer has " + this.computerScore + " points compared to the player's " + this.playerScore + " point (ties: " + this.ties + "). So the computer wins!\n            ";
                break;
            }
            case (this.playerScore == 2 && this.computerScore == 0) || (this.playerScore == 0 && this.computerScore == 2): {
                msgW = "\n            The player has " + this.playerScore + " points compared to the computer's " + this.computerScore + " points (ties: " + this.ties + ").\n            So the player wins!\n            ";
                msgL = "\n            The computer has " + this.computerScore + " points compared to the player's " + this.playerScore + " points (ties: " + this.ties + ").\n            So the computer wins!\n            ";
                break;
            }
        }
        if (this.playerScore >= 2) {
            this.isPlayerWinner = true;
            alert(msgW);
        }
        if (this.computerScore >= 2) {
            this.isComputerWinner = true;
            alert(msgL);
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
            case 1: {
                return this.gestures[0];
            }
            case 2: {
                return this.gestures[1];
            }
            case 3: {
                return this.gestures[2];
            }
        }
    };
    rps.prototype.CompareGuesses = function (guess1, guess2, points) {
        var output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "!\n";
        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            var wMsg = "\n            " + output + "\n            Player wins the round!\n\n            Player Score: " + this.playerScore + " Computer Score: " + this.computerScore + ".\n            ";
            alert(wMsg);
            this.DetermineWinner();
            return 1;
        }
        else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            var lMsg = "\n            " + output + "\n            Computer wins the round!\n\n            Player Score: " + this.playerScore + ", Computer Score: " + this.computerScore + ".\n            ";
            alert(lMsg);
            this.DetermineWinner();
            return 2;
        }
        else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            var tMsg = "\n            " + output + "\n            It's a tie! Go again, no score added!\n\n            Player Score: " + this.playerScore + ", Computer Score: " + this.computerScore + "\n            ";
            alert(tMsg);
            this.DetermineWinner();
            return 0;
        }
    };
    rps.prototype.BTNClick = function () {
        this.Start();
        location.reload(true);
    };
    rps.prototype.Init = function () {
        var rpsScript = new rps("Rock Paper Scissors");
        window.addEventListener("load", function () {
            rpsScript.Game();
        }, true);
        var element = document.querySelector("#btn");
        element.addEventListener("click", function () {
            rpsScript.BTNClick();
        }, false);
    };
    return rps;
}());
function loadScript(RPS) {
    var script = new rps(RPS);
    script.Init();
}
loadScript("Rock Paper Scissors");
