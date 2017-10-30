<!--
var rps = (function() { // define a master function variable named `rps`

   // create Initial scores for player and computer
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

   var welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember, the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

   function StartGame(msg) {
      // ask the user if they want to play
      this.ready = confirm(msg); // confirm(welcomeMsg)
   }
   StartGame.prototype.confirm = function confirm() {
      switch (this.ready) {
         case true:
            var playG = new PlayGame(3);
            playG.play();
            break;
         case false:
            alert("Sorry you don't wanna play, maybe next time! :)");
            break;
      }
   };

   // define a function to determine the grand winner of the rps game
   function determineWinner(pl, co) {
      this.winMsg = "The player has " + pl + " points compared to the computer\'s " + co + " points (ties: " + ties + "). So the player wins!";
      this.loseMsg = "The computer has " + co + " points compared to the player\'s " + pl + " points (ties: " + ties + "). So the computer wins!";
      console.log('d ' + isPlayerWinner, isComputerWinner);
   }
   determineWinner.prototype.determineW = function determineW(expression) {
      switch (expression) {
         case playerScore >= 2:
            isPlayerWinner = true;
            alert(this.winMsg);
            break;
         case computerScore >= 2:
            isComputerWinner = true;
            alert(this.loseMsg);
            break;
      }
   };

   function PlayGame(numOfRounds) {
      // create do while loop for playing game
      this.play = function play() {
         do {
            if (isPlayerWinner || isComputerWinner) {
               // jump out
               return;
            }
            console.log('b', isPlayerWinner, isComputerWinner);
            var player = new PlayerGuess("Choose rock, paper, or scissors:");
            var computer = new ComputerGuess(Math.floor((Math.random() * 3) + 1));
            var result = new CompareGuesses(player.PGuess(), computer.CGuess(), 1);
            if (result.compare() !== 0) {
               numOfRounds--;
            }
         } while (numOfRounds > 0 && (!isPlayerWinner || !isComputerWinner));
      };
   }

   function PlayerGuess(Prompt) {
     this.playerChoice = prompt(Prompt);
     Array.prototype.inArray = function inArray(value) {
         var i;
         for (i = 0; i < this.length; i++) {
            if (this[i] === value) {
               return true;
            }
         }
         return false;
      };

   }

   PlayerGuess.prototype.PGuess = function PGuess() {
      // if player's choice is equal to anything in the gestures array
      if (gestures.inArray(this.playerChoice.toLowerCase()) || gestures.indexOf(this.playerChoice.toLowerCase()) >= 0) {
         return this.playerChoice;
      } else {
         alert("You typed something else or did not spell your choice correctly. Please try again!");
         var pG = new PlayerGuess("Choose rock, paper, or scissors:");
         return pG.PGuess(); // return PlayerGuess function to run the prompt again
      }
   };

   function ComputerGuess(formula) {
      // make 3 numbers for computer to randomly use (#'s are going to be integers: 1, 2, & 3)
      this.cpuChoice = formula;
      this.CGuess = function CGuess() {
         switch (this.cpuChoice) {
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
      };
   }



   function CompareGuesses(guess1, guess2, points) {
      this.output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "! \n";
      this.compare = function compare() {
         if (rules[guess1.toLowerCase()] == guess2.toLowerCase()) { // if user wins
            playerScore += points; // add 1 point to the player (specified in the `PlayGames` function)
            alert(this.output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var w = new determineWinner(playerScore, computerScore); // call `determineWinner` function
            w.determineW(true);
            return 1;
         } else if (rules[guess2.toLowerCase()] == guess1.toLowerCase()) { // if computer wins
            computerScore += points; // add 1 point to the cpu (specified in the `PlayGames` function)
            alert(this.output + "\nComputer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var l = new determineWinner(playerScore, computerScore); // call `determineWinner` function
            l.determineW(true);
            return 2;
         } else { // guess1.toLowerCase() === guess2.toLowerCase() // if tie...
            playerScore += 0;
            computerScore += 0;
            ties += 1;
            alert(this.output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var t = new determineWinner(playerScore, computerScore);
            t.determineW(true);
            return 0;
         }
      }
   }

   function BTNClick() {
      // this function will later be executed when the user clicks the rps button
      var start = new StartGame(welcomeMsg);
      start.confirm();
      // we need to reload the page in order for the user to play rps again by clicking the button
      location.reload();
   }

   function Setup(h5Msg) {
      // **NEED TO OBJECT ORIENT THIS FUNCTION!!**
      var h5 = document.querySelector(".h5");
      var span = document.querySelector("#header5Contents");
      var regex = new RegExp(/(?:(?:[\-+\/]{2})|(?:[\++\*]{2})|(?:[\=+\!+\?]{3})|(?:[\x5F+\x5E]{2})|(?:[\s+\d+\s]{3}))/, "g");
      var h5Array = h5Msg.split(regex);
      h5Array.push("!");
      console.log(h5Array);
      console.log(h5Array.indexOf("play"), h5Array.indexOf("!"));
      var h5Txt = "";
      var i;
      for (i = 0; i < h5Array.length; i++) {
         switch (true) {
            case h5Array[i] !== h5Array[5] && h5Array[i] !== h5Array[6]:
               h5Txt += h5Array[i] + " ";
               break;
            default:
               h5Txt += h5Array[i];
               break;
         }
      }
      console.log(h5Txt);
      span.parentNode.replaceChild(document.createTextNode(h5Txt), span);
   }

   function Init() {
      // this is our Init function that will tell the what to do on each action (load and click)
      var rpsScript = rps();
      var element = document.querySelector("body");
      window.addEventListener("load", function() {
         rpsScript.load("Click-/the+*button=!?below_^to 8 play");
      }, true);
      element = null;
      var element = document.querySelector("#btn");
      element.addEventListener("click", function() {
         rpsScript.BTNClick();
      }, false);
   }

   // define API for script
   // this basically allows us to organize all our functions in an object and call them in the `Init` function
   return function API() {
      return {
         initiate: Init,
         BTNClick: BTNClick,
         load: Setup
      };
   };

}());
//-->
