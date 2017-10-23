var rps = (function() {

    var playerScore = 0;
    var computerScore = 0;

    var gestures = ["rock", "paper", "scissors"];

    var welcomeMsg = "Welcome the good ol' fashion game of Rock, Paper, Scissors! Remember the rules are simple!\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\nClick cancel if you don\'t wanna play.";

    var rules = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    };

    function welcomeMessage(msg) {
        var ready = confirm(msg);
        if (ready == true) {
          playGame(3);
        }
        else {
          alert("sorry, maybe next time.");
        }
    }

    function playGame(numOfRounds) {
        do {
            var player = playerGuess();
            var computer = computerGuess();
            var result = compareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
            console.log(playerScore, computerScore)

        } while (playerScore + computerScore < 3)


        console.log(playerScore, computerScore)
        var winMsg = "The player has " + playerScore + " points compared to the computer's " + computerScore + " points. So the player wins!";
        var loseMsg = "The computer has " + computerScore + " points compared to the player's " + playerScore + " points. So the computer wins!";
        var tieMsg = "It's a tie!";

        if (playerScore > computerScore) {
            alert(winMsg);
        } else if (playerScore < computerScore) {
          alert(loseMsg);
        } else {
          alert(tieMsg);
        }

        clearScores();

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

        var choice = Math.random();

        switch (true) {
          case choice >= 0 && choice <= 0.33:
            return gestures[0];
            break;
          case choice <= 0.66 && choice > 0.33:
            return gestures[1];
            break;
          case choice > 0.66 && choice <= 1:
            return gestures[2]
            break;
        }
    }

    function compareGuesses(guess1, guess2, points) {
        //Create an alert message detailing the results
        var output = "Player chose: " + guess1.toLowerCase() + " and the computer chose: " + guess2.toLowerCase() + "! ";

        switch (true) {
          case guess1 === guess2:
            playerScore += 0;
            computerScore += 0;
            alert(output + "\nYou and the computer guessed the same thing! Go again, no score added! \n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            return 0;
            break;
          case rules[guess1] == guess2:
            playerScore += points;
            alert(output + "\nPlayer wins the round! \n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            return 1;
            break;
          case rules[guess2] == guess1:
            computerScore += points;
            alert(output + "\nComputer wins the round! \n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
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
            startMsg: welcomeMessage
            // playRPS: playGame
        };
    };
}());