var rps = (function() {

    var playerScore = 0;
    var computerScore = 0;

    var gestures = ["rock", "paper", "scissors"];
    var rules = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    };

    var isPlayerWinner = false;
    var isComputerWinner = false;

    var welcomeMsg = "Welcome the good ol' fashion game of Rock, Paper, Scissors! Remember the rules are simple!\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\nClick cancel if you don\'t wanna play.";

    function startGame(msg) {
        var ready = confirm(msg);
        if (ready == true) {
            playGame(3);
        } else {
            alert("sorry, maybe next time.");
        }
    }

    function determineWinner() {
        switch(true) {
            case playerScore >= 2:
                isPlayerWinner = true
                var winMsg = "The player has " + playerScore + " points compared to the computer's " + computerScore + " points. So the player wins!";
                alert(winMsg);
                break;
            case computerScore >= 2:
                isComputerWinner = true
                var loseMsg = "The computer has " + computerScore + " points compared to the player's " + playerScore + " points. So the computer wins!";
                alert(loseMsg)
                break;
        }
        console.log('d ' + isPlayerWinner, isComputerWinner)
    }

    function playGame(numOfRounds) {
        do {
            if (isPlayerWinner || isComputerWinner) {
                return;
            }
            console.log('b ' + isPlayerWinner, isComputerWinner)
            var player = playerGuess();
            var computer = computerGuess();
            var result = compareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!isPlayerWinner || !isComputerWinner))
    }

    function playerGuess() {
        var playerChoice = prompt("Choose rock, paper, or scissors.");
        if (gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly please try again!");
            return playerGuess();
        }
    }

    function computerGuess() {

        /*      
         * var choice = Math.random();
         * switch (true) {
         * case choice >= 0 && choice <= 0.33:
         *   return gestures[0];
         *   break;
         * case choice <= 0.66 && choice > 0.33:
         *   return gestures[1];
         *   break;
         * case choice > 0.66 && choice <= 1:
         *   return gestures[2]
         *   break;
         * }
         */

        var cpuChoice = Math.floor(Math.random() * 3);

        switch (cpuChoice) {
            case 0:
                return gestures[0];
                break;
            case 1:
                return gestures[1];
                break;
            case 2:
                return gestures[2];
                break;
        }
    }

    function compareGuesses(guess1, guess2, points) {
        // Create an alert message detailing the results
        var output = "Player chose: " + guess1.toLowerCase() + " and the computer chose: " + guess2.toLowerCase() + "! \n";
        switch (true) {
            case guess1 === guess2: // if tie
                playerScore += 0;
                computerScore += 0;
                alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                return 0;
                break;
            case rules[guess1] == guess2: // if user wins
                playerScore += points;
                alert(output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                determineWinner();
                return 1;
                break;
            case rules[guess2] == guess1: // if computer wins
                computerScore += points;
                alert(output + "\nComputer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                determineWinner();
                return 2;
                break;
        }
    }

    function clearScores() {
        playerScore = 0;
        computerScore = 0;
    }

    function init() {
        var element = window;
        element.addEventListener("load", function() {
            var masterScript = rps();
            masterScript.startMsg(welcomeMsg);
        });
    }

    return function returnAPI(api) {
        return {
            initiate: init,
            startMsg: startGame
        };
    };
}());