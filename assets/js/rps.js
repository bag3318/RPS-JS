var rps = (function() { // define a master function variable named `rps`

    // create initial scores for player and computer
    var playerScore = 0;
    var computerScore = 0;

    // create new array (list)
    var gestures = [
      "rock",
      "paper",
      "scissors"
    ];
    /*
     * var gestures = new Array();
     * gestures[0] = "rock";
     * gestures[1] = "paper";
     * gestures[2] = "scissors";
     */

    // define new object (dictionary)
    var rules = {
      "rock": gestures[2],
      "paper": gestures[0],
      "scissors": gestures[1]
    };
    /*
     * var rules = new Object();
     * rules.rock = gestures[2];
     * rules.paper = gestures[0];
     * rules.scissors = gestures[1];
     */

    console.log("gestures:", gestures, typeof gestures);
    console.log("rules:", rules, typeof rules);

    // define booleans for winner
    var isPlayerWinner = false;
    var isComputerWinner = false;

    var welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

    function startGame(msg) {
        // ask the user if they want to play
        var ready = confirm(msg);
        if (ready == true) { // if player chooses "OK"
            playGame(3);
        } else if (ready == false) { // else if player chooses "Cancel"
            alert("Sorry you don't wanna play, maybe next time! :)");
        } else { // else...
            return alert("error!");
        }
    }

    // define a function to determine the grand winner of the rps game
    function determineWinner() {
        var winMsg = "The player has " + playerScore + " points compared to the computer\'s " + computerScore + " points. So the player wins!";
        var loseMsg = "The computer has " + computerScore + " points compared to the player\'s " + playerScore + " points. So the computer wins!";
        // var tieMsg = "It\'s a tie!";
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
            /*
             * case playerScore === computerScore:
             *  alert(tieMsg);
             *  break;
             */
        }
        console.log('d ' + isPlayerWinner, isComputerWinner);
    }

    function playGame(numOfRounds) {
        // create do while loop for playing game
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
      // make 3 numbers for computer to randomly use (#'s are whole integers: 1, 2, & 3)
      var cpuChoice = Math.floor((Math.random() * 3) + 1);
      switch (cpuChoice) {
        case 1:
          return gestures[0]; // rock
          break;
        case 2:
          return gestures[1]; // paper
          break;
        case 3:
          return gestures[2]; // scissors
          break;
      }
    }

    function compareGuesses(guess1, guess2, points) {
        var output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "! \n";
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

    function setup(rpsMsg) {

        /*
         * In this function we take a string (defined in the `init` function) and make it into an array list.
         * We do this by splitting the string at each space.
         * Then we push an `!` at the end of the array to avoid using a regex while splitting
         */
        var btn = document.querySelector("#btn");

        var btnStr = rpsMsg;
        var rpsArray = btnStr.split(" ");
        rpsArray.push("!");

        console.log("rpsArray:", rpsArray, typeof rpsArray, rpsArray.length);

        var btnText = "";

        /*
         * Next, we need to loop through the `rpsArray` variable for each of the items in that list.
         * Then we need to add them to the `btnHTML` string,
         *  which will then be inserted into the `button` element with the `btn` ID.
         */

        // loop through the array
        var i;
        for (i = 0; i < rpsArray.length; i++) {
            switch (true) {
                // since we don't want to add a space in between `scissors` and `!`, and a space after `!`, we do this:
                case rpsArray[i] !== rpsArray[3] && rpsArray[i] !== rpsArray[4]:
                    btnText += rpsArray[i] + " ";
                    break;
                // otherwise, the default option will not add a space
                default:
                    btnText += rpsArray[i];
                    break;
            }
        }

        // append the HTML text to the HTML button element with the id of `btn`
        btn.appendChild(document.createTextNode(btnText));
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
        // we must set the `element` variable = to null to reuse it again
        element = null;
        var element = document.querySelector("#btn");
        element.addEventListener("click", function() {
            masterScript.btnClick();
        }, false);
    }

    // define API for script
    // this basically allows us to organize all our functions in an object and call them in the `init` function
    return function API() {
        return {
            initiate: init,
            load: setup,
            btnClick: btnClick
        };
    };

}());
