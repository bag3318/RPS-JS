"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var RPS = (function () {
    function RPS(gameName, version, creator, status) {
        this.gameName = gameName;
        this.version = version;
        this.creator = creator;
        this.status = status;
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.welcomeMsg = trimIndentSpace(__makeTemplateObject(["\n    Welcome to the \"Rock, Paper, Scissors\" game!\n    \n\n    Remember, the rules are simple:\n    \n\n    Rock Beats Scissors,\n    Scissors Beats Paper,\n    Paper Beats Rock.\n    \n\n    Click cancel if you don't wanna play.\n    "], ["\n    Welcome to the \\\"Rock, Paper, Scissors\\\" game!\n    \\n\n    Remember, the rules are simple:\n    \\n\n    Rock Beats Scissors,\n    Scissors Beats Paper,\n    Paper Beats Rock.\n    \\n\n    Click cancel if you don\\'t wanna play.\n    "]));
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
        set: function (draw) {
            this.ties = draw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RPS.prototype, "WelcomeMsg", {
        get: function () {
            return this.welcomeMsg;
        },
        set: function (initMsg) {
            this.welcomeMsg = initMsg;
        },
        enumerable: true,
        configurable: true
    });
    RPS.prototype.Start = function () {
        var ready = confirm(this.welcomeMsg);
        var confirmReady = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
    };
    RPS.prototype.DetermineWinner = function () {
        var finalWinMsg = trimIndentSpace(__makeTemplateObject(["\n        The player has ", " point(s) compared to the computer's ", " point(s) (ties: ", ").\n        \n\n        The player wins the game!\n        "], ["\n        The player has ", " point(s) compared to the computer\\'s ", " point(s) (ties: ", ").\n        \\n\n        The player wins the game!\n        "]), this.playerScore, this.computerScore, this.ties);
        var finalLoseMsg = trimIndentSpace(__makeTemplateObject(["\n        The computer has ", " point(s) compared to the player's ", " point(s) (ties: ", ").\n        \n\n        The computer wins the game!\n        "], ["\n        The computer has ", " point(s) compared to the player\\'s ", " point(s) (ties: ", ").\n        \\n\n        The computer wins the game!\n        "]), this.computerScore, this.playerScore, this.ties);
        if (this.playerScore >= 2) {
            this.isPlayerWinner = true;
            alert(finalWinMsg);
        }
        if (this.computerScore >= 2) {
            this.isComputerWinner = true;
            alert(finalLoseMsg);
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
            var winRoundMsg = trimIndentSpace(__makeTemplateObject(["\n            ", "\n            \n\n            Player wins the round!\n            \n\n            Player Score: ", "; Computer Score: ", ".\n            "], ["\n            ", "\n            \\n\n            Player wins the round!\n            \\n\n            Player Score: ", "; Computer Score: ", ".\n            "]), output, this.playerScore, this.computerScore);
            alert(winRoundMsg);
            this.DetermineWinner();
            return 1;
        }
        else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            var lostRoundMsg = trimIndentSpace(__makeTemplateObject(["\n            ", "\n            \n\n            Computer wins the round!\n            \n\n            Player Score: ", "; Computer Score: ", ".\n            "], ["\n            ", "\n            \\n\n            Computer wins the round!\n            \\n\n            Player Score: ", "; Computer Score: ", ".\n            "]), output, this.playerScore, this.computerScore);
            alert(lostRoundMsg);
            this.DetermineWinner();
            return 2;
        }
        else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            var tieRoundMsg = trimIndentSpace(__makeTemplateObject(["\n            ", "\n            \n\n            It's a tie! Go again, no score added!\n            \n\n            Player Score: ", ", Computer Score: ", "\n            "], ["\n            ", "\n            \\n\n            It's a tie! Go again, no score added!\n            \\n\n            Player Score: ", ", Computer Score: ", "\n            "]), output, this.playerScore, this.computerScore);
            alert(tieRoundMsg);
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
