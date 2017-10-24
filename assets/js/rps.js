var rps = (function() { // define a master function variable named `rps`

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
                // jump out
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
        // if player's choice is in the gestures array
        if (gestures.indexOf(playerChoice.toLowerCase()) >= 0) { 
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly please try again!");
            return playerGuess(); // return playerGuess function to run the prompt again
        }
    }

    function computerGuess() {
        // make 3 numbers for computer to randomly use (#'s are whole integers: 0, 1, & 2)
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
                // don't do anything with player & computer scores
                playerScore += 0;
                computerScore += 0;
                alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                return 0;
                break;
            case rules[guess1.toLowerCase()] == guess2.toLowerCase(): // if user wins
                playerScore += points; // add 1 point to the player (specified in the `playGames` function)
                alert(output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                determineWinner(); // call `determineWinner` function 
                return 1;
                break;
            case rules[guess2.toLowerCase()] == guess1.toLowerCase(): // if computer wins
                computerScore += points; // add 1 point to the cpu (specified in the `playGames` function)
                alert(output + "\nComputer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
                determineWinner(); // call `determineWinner` function
                return 2;
                break;
        }
    }

    // create functions to clear scores after game is completed
    function clearScores() {
        playerScore = 0;
        computerScore = 0;
    }

    function setup(rpsMsg) {
        
        /*
         * In this function we take a string (defined in the `init` function) and make it into an array list.
         * We do this by splitting the string at each space.
         * Then we push an `!` at the end of the array to avoid using a regex while splitting
         */
        
        var rpsStr = rpsMsg;
        var rpsArray = rpsStr.split(" ");
        rpsArray.push("!");

        console.log(typeof rpsArray);
        console.log(rpsArray);

        var btn = document.querySelector("#btn");

        var btnHTML = "";

        /*
         * Next, we need to loop through the `rpsArray` variable for each of the items in that list.
         * Then we need to add them to the `btnHTML` string,
         *  which will then be inserted into the `button` element with the `btn` ID.
         */
        var i;
        for (i = 0; i < rpsArray.length; i++) {
            switch (true) {
                 // since we don't want to add a space in between `scissors` and `!`, we do this
                 // and after `!`, we do this:
                case rpsArray[i] !== rpsArray[3] && rpsArray[i] !== rpsArray[4]:
                    btnHTML += rpsArray[i] + " "; 
                    break;
                default: // otherwise, the default option will not add a space
                    btnHTML += rpsArray[i];
                    break; 
            }
        }

        /*        
         * here we use the plugin `BetterInnerHTML` to insert HTML into the button element with the `btn` ID
         * documentation page: 
         * http://www.optimalworks.net/blog/2007/web-development/javascript/innerhtml-alternative
         * download page:
         * http://www.optimalworks.net/resources/betterinnerhtml/
         */
        BetterInnerHTML(btn, btnHTML, true);

    }

    function btnClick() {
        // this function will later be executed when the user clicks the rps button
        startGame(welcomeMsg);
        // we need to reload the page in order for the user to play rps again by clicking the button
        location.reload();
    }

    function init() {
        // this is our init function that will tell the what to do on each action (load and click)
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
    // this basically allows us to organize our function in an object and call them in the `init` function
    return function API() {
        return {
            initiate: init,
            load: setup,
            btnClick: btnClick
        };
    };

}());