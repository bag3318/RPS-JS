var rps = (function() { // define a master function variable named `rps`

    // create initial scores for player and computer
    var playerScore = 0;
    var computerScore = 0;

    // create new array (list)
    var gestures = new Array();
    gestures[0] = "rock";
    gestures[1] = "paper";
    gestures[2] = "scissors";

    // define new object (dictionary)
    var rules = new Object();
    rules.rock = gestures[2];
    rules.paper = gestures[0];
    rules.scissors = gestures[1];


    console.log("gestures:", gestures, typeof gestures, gestures.length);
    console.log("rules:", rules, typeof rules);

    // define booleans for winner
    var isPlayerWinner = false;
    var isComputerWinner = false;

    var welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

    function startGame(msg) {
        // ask the user if they want to play
        var ready = confirm(msg);
        switch(ready) {
          case true:
            playGame(3);
            break;
          case false:
            alert("Sorry you don't wanna play, maybe next time! :)");
            break;
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
        var playerChoice = prompt("Choose rock, paper, or scissors:");

        Array.prototype.inArray = function inArray(value) {
          var i;
          for (i = 0; i < this.length; i++) {
            if (this[i] === value) {
              return true;
            }
          }
          return false;
        };

        // if player's choice is equal to anything in the gestures array
        if (gestures.inArray(playerChoice.toLowerCase()) || gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly please try again!");
            return playerGuess(); // return playerGuess function to run the prompt again
        }
    }

    function computerGuess() {
      // make 3 numbers for computer to randomly use (#'s are going to be integers: 1, 2, & 3)
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
        if (rules[guess1.toLowerCase()] == guess2.toLowerCase()) { // if user wins
          playerScore += points; // add 1 point to the player (specified in the `playGames` function)
          alert(output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
          determineWinner(); // call `determineWinner` function
          return 1;
        } else if (rules[guess2.toLowerCase()] == guess1.toLowerCase()) { // if computer wins
          computerScore += points; // add 1 point to the cpu (specified in the `playGames` function)
          alert(output + "\nComputer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
          determineWinner(); // call `determineWinner` function
          return 2;
        } else { // guess1.toLowerCase() === guess2.toLowerCase() // if tie...
          playerScore += 0;
          computerScore += 0;
          alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
          return 0;
        }
    }

    function setup(btnMsg, h5Msg) {
        /*
         * In this function we take a string (defined in the `init` function) and make it into an array list.
         * We do this by splitting the string at each space.
         * Then we push an `!` at the end of the array to avoid using a regex while splitting
         */
        var btn = document.querySelector("#btn");
        var btnArray = btnMsg.split(/\s/);
        btnArray.push("!");
        console.log("btnArray:", btnArray, typeof btnArray, btnArray.length);
        var btnText = "";
        /*
         * Next, we need to loop through the `btnArray` variable for each of the items in that list.
         * Then we need to add them to the `btnText` string,
         *  which will then be inserted into the `button` element with the `btn` ID.
         */
        // loop through the array
        var i;
        for (i = 0; i < btnArray.length; i++) {
            switch (true) {
                // since we don't want to add a space in between `scissors` and `!`, and a space after `!`, we do this:
                case btnArray[i] != btnArray[3] && btnArray[i] != btnArray[4]:
                    btnText += btnArray[i] + " ";
                    break;
                // otherwise, the default option will not add a space
                default:
                    btnText += btnArray[i];
                    break;
            }
        }
        // append the HTML text to the HTML button element with the id of `btn`
        btn.appendChild(document.createTextNode(btnText));

        // now we do the same thing for the h5Array
        var h5 = document.querySelector("h5");
        var h5Array = h5Msg.split(/\s/);
        h5Array.push("!");
        var h5Text = "";
        console.log("h5Array:", h5Array, typeof h5Array, h5Array.length);
        // set i = to null so we can use it again in the following for loop
        i = null;
        var i;
        for (i = 0; i < h5Array.length; i++) {
          if (h5Array[i] != h5Array[5] && h5Array[i] != h5Array[6]) {
            h5Text += h5Array[i] + " ";
          } else {
            h5Text += h5Array[i];
          }
        }
        h5TextNode = document.createTextNode(h5Text);
        h5.appendChild(h5TextNode);
    }

    function btnClick() {
        // this function will later be executed when the user clicks the rps button
        startGame(welcomeMsg);
        // we need to reload the page in order for the user to play rps again by clicking the button
        location.reload();
    }

    function init() {
        // this is our init function that will tell the what to do on each action (load and click)
        var rpsScript = rps();
        var element = window;
        element.addEventListener("load", function() {
          rpsScript.load("Play Rock Paper Scissors", "Click the button below to play");
        }, false);
        // we must set the `element` variable = to `null` in order to use it again
        element = null;
        var element = document.querySelector("#btn");
        element.addEventListener("click", function() {
            rpsScript.btnClick();
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
