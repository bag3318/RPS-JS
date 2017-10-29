<!--
var rps = (function() { // define a master function variable named `rps`

    // create initial scores for player and computer
    var playerScore = 0;
    var computerScore = 0;
    var ties = 0;

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
        var winMsg = "The player has " + playerScore + " points compared to the computer\'s " + computerScore + " points (there were " + ties + " ties). So the player wins! ";
        var loseMsg = "The computer has " + computerScore + " points compared to the player\'s " + playerScore + " points (there were " + ties + " ties). So the computer wins!";
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
          ties += 1;
          alert(output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
          return 0;
        }
    }

    function setup(h5Msg) {
      var h5 = document.querySelector(".h5");
      var span = document.querySelector("#header5Contents");
      var regex = new RegExp(/\-\/|\+\*|\=\!|\_\^|\s\d\s/g, "i");
      var h5Array = h5Msg.split(regex);
      h5Array.push("!");
      var h5Txt = "";
      var i;
      for (i = 0; i < h5Array.length; i++) {
        switch(true) {
          case h5Array[i] != h5Array[5] && h5Array[i] != h5Array[6]:
            h5Txt += h5Array[i] + " ";
            break;
          default:
            h5Txt += h5Array[i];
            break;
         }
      }
      span.parentNode.replaceChild(document.createTextNode(h5Txt), span);
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
        window.addEventListener("load", function() {
          rpsScript.load("Click-/the+*button=!below_^to 8 play");
        }, false);
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

}());//
//-->
