"use strict";
var RPS = (function () {
    function RPS(gameName, version, creator, status) {
        this.gameName = gameName;
        this.version = version;
        this.creator = creator;
        this.status = status;
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.welcomeMsg = "\n    Welcome to the \"Rock, Paper, Scissors\" game!\n\n    Remember, the rules are simple:\n\n    Rock Beats Scissors,\n    Scissors Beats Paper,\n    Paper Beats Rock.\n\n    Click cancel if you don't wanna play.\n    ";
        this.gestures = new Array("rock", "paper", "scissors");
        this.rules = new Object({
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        });
        this.isPlayerWinner = false;
        this.isComputerWinner = false;
        RPS._gameName = gameName;
        RPS._version = version;
        RPS._creator = creator;
        RPS._status = status;
        console.log("Game Name: " + gameName + ", Version: " + version + ", Creator: " + creator + ", Status OK: " + status + ".");
    }
    Object.defineProperty(RPS.prototype, "PlayerScore", {
        get: function () {
            return this.playerScore;
        },
        set: function (pScore) {
            this.playerScore = pScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RPS.prototype, "ComputerScore", {
        get: function () {
            return this.computerScore;
        },
        set: function (cScore) {
            this.computerScore = cScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RPS.prototype, "Ties", {
        get: function () {
            return this.ties;
        },
        set: function (tie) {
            this.ties = tie;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RPS.prototype, "WelcomeMsg", {
        get: function () {
            return this.welcomeMsg;
        },
        set: function (welcomeMessage) {
            this.welcomeMsg = welcomeMessage;
        },
        enumerable: true,
        configurable: true
    });
    RPS.prototype.Start = function () {
        var ready = confirm(this.welcomeMsg);
        var Confirm = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
    };
    RPS.prototype.DetermineWinner = function () {
        var msgW = "\n        The player has " + this.playerScore + " point(s) compared to the computer's " + this.computerScore + " point(s)\n        (ties: " + this.ties + ").\n\n        The player wins!\n        ";
        var msgL = "\n        The computer has " + this.computerScore + " point(s) compared to the player's " + this.playerScore + " point(s)\n        (ties: " + this.ties + ").\n\n        The computer wins!\n        ";
        if (this.playerScore >= 2) {
            this.isPlayerWinner = true;
            alert(msgW);
        }
        if (this.computerScore >= 2) {
            this.isComputerWinner = true;
            alert(msgL);
        }
    };
    RPS.prototype.PlayGame = function (numOfRounds) {
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
    RPS.prototype.PlayerGuess = function () {
        var playerChoice = prompt("Choose rock, paper, or scissors:");
        if (this.gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        }
        else {
            alert("You typed something else or did not spell your choice correctly. Please try again!");
            return this.PlayerGuess();
        }
    };
    RPS.prototype.ComputerGuess = function () {
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
        return "";
    };
    RPS.prototype.CompareGuesses = function (guess1, guess2, points) {
        var output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "!\n";
        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            var wMsg = "\n            " + output + "\n            Player wins the round!\n\n            Player Score: " + this.playerScore + "; Computer Score: " + this.computerScore + ".\n            ";
            alert(wMsg);
            this.DetermineWinner();
            return 1;
        }
        else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            var lMsg = "\n            " + output + "\n            Computer wins the round!\n\n            Player Score: " + this.playerScore + "; Computer Score: " + this.computerScore + ".\n            ";
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
    RPS.prototype.BTNClick = function () {
        this.Start();
        location.reload(true);
    };
    RPS.prototype.Init = function () {
        var rpsScript = new RPS($info.game_name, $info.version, $info.creator, $info.status_ok);
        var element = document.querySelector("#btn");
        element.addEventListener("click", function () {
            rpsScript.BTNClick();
        }, false);
    };
    return RPS;
}());
