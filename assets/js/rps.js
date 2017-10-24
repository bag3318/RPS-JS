var rps = (function() {

    // create initial scores for player and computer
    var playerScore = 0;
    var computerScore = 0;

    // create new array (list) as object
    var gestures = new Array();
    gestures[0] = "rock";
    gestures[1] = "paper";
    gestures[2] = "scissors";
    // define new object (dictionary) as object
    var rules = new Object();
    rules.rock = gestures[2];
    rules.paper = gestures[0];
    rules.scissors = gestures[1];

    console.log(typeof gestures, typeof rules);
    console.log("gestures:", gestures);
    console.log("rules:", rules);

    // define booleans for winner 
    var isPlayerWinner = false;
    var isComputerWinner = false;

    var welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

    function startGame(msg) {
        // ask the use if they want to play
        var ready = confirm(msg);
        if (ready == true) { // if player chooses "OK"
            playGame(3);
        } else if (ready == false) { // else if player chooses "Cancel"
            alert("Sorry you don't wanna play, maybe next time! :)");
        } else { // else...
            return "error!";
        }
    }

    function determineWinner() {
        var winMsg = "The player has " + playerScore + " points compared to the computer's " + computerScore + " points. So the player wins!";
        var loseMsg = "The computer has " + computerScore + " points compared to the player's " + playerScore + " points. So the computer wins!";
        switch(true) {
            case playerScore >= 2:
                isPlayerWinner = true;
                alert(winMsg);
                break;
            case computerScore >= 2:
                isComputerWinner = true;
                alert(loseMsg);
                break;
            // there will never be a tie for the final outcome
        }
        console.log('d ' + isPlayerWinner, isComputerWinner);
    }

    function playGame(numOfRounds) {
        // create do while loop for game
        do {
            if (isPlayerWinner || isComputerWinner) {
                return;
            }
            console.log('b', isPlayerWinner, isComputerWinner);
            var player = playerGuess();
            var computer = computerGuess();
            var result = compareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!isPlayerWinner || !isComputerWinner));
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
        var output = "Player chose: " + guess1.toLowerCase() + " and the computer chose: " + guess2.toLowerCase() + "! \n";
        switch (true) {
            case guess1.toLowerCase() === guess2.toLowerCase(): // if tie
                playerScore += 0;
                computerScore += 0;
                alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                return 0;
                break;
            case rules[guess1.toLowerCase()] == guess2.toLowerCase(): // if user wins
                playerScore += points;
                alert(output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                determineWinner();
                return 1;
                break;
            case rules[guess2.toLowerCase()] == guess1.toLowerCase(): // if computer wins
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

    function setup(rpsMsg) {
        
        var rpsStr = rpsMsg;
        var rpsArray = rpsStr.split(" ");
        rpsArray.push("!");

        console.log(typeof rpsArray);
        console.log(rpsArray);

        var btn = document.querySelector("#btn");

        var btnHTML = "";

        var i;
        for (i = 0; i < rpsArray.length; i++) {
            switch (true) {
                case rpsArray[i] !== rpsArray[3] && rpsArray[i] !== rpsArray[4]:
                    btnHTML += rpsArray[i] + " "; 
                    break;
                default: 
                    btnHTML += rpsArray[i];
                    break; 
            }
            /*            
             * if (rpsArray[i] !== rpsArray[3] && rpsArray[i] !== rpsArray[4]) {
             *   btnHTML += rpsArray[i] + " "; 
             * } else {
             *   btnHTML += rpsArray[i];
             * }
             */
        }

        BetterInnerHTML(btn, btnHTML, true);

    }

    function btnClick() {
        startGame(welcomeMsg);
        location.reload();
    }

    function init() {
        var masterScript = rps();
        var element = window;
        element.addEventListener("load", function() {
            masterScript.load("Play Rock Paper Scissors");
        }, false);
        element = null;
        var element = document.querySelector("#btn");
        element.addEventListener("click", function() {
            masterScript.btnClick();
        }, false);
    }

    // define API for script
    return function API() {
        return {
            initiate: init,
            load: setup,
            btnClick: btnClick
        };
    };

}());