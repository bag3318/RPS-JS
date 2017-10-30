<!--
var rps = (function() {

   var playerScore = 0;
   var computerScore = 0;
   var ties = 0;

   var gestures = new Array();
   gestures[0] = "rock";
   gestures[1] = "paper";
   gestures[2] = "scissors";

   var rules = new Object();
   rules.rock = gestures[2];
   rules.paper = gestures[0];
   rules.scissors = gestures[1];

   console.log("gestures:", gestures, typeof gestures, gestures.length);
   console.log("rules:", rules, typeof rules);

   var isPlayerWinner = false;
   var isComputerWinner = false;

   var welcomeMsg = "Welcome to the \"Rock, Paper, Scissors\" game!\n\nRemember, the rules are simple!\n\nRock Beats Scissors\nScissors Beats Paper\nPaper Beats Rock\n\nClick cancel if you don\'t wanna play.";

   function StartGame(Confirm) {
      this._ready = Confirm;
   }
   StartGame.prototype = {
     set Confirm(Confirm) { this._ready = Confirm; },
     get Confirm() { return this._ready; }
   };
   StartGame.prototype.confirm = function confirm() {
      switch (this._ready) {
         case true:
            var playG = new PlayGame(3);
            playG.play();
            break;
         case false:
            alert("Sorry you don't wanna play, maybe next time! :)");
            break;
      }
   };

   function DetermineWinner(pl, co, ti, msgW, msgL) {
      msgW = "The player has " + pl + " points compared to the computer\'s " + co + " points (ties: " + ti + "). So the player wins!";
      msgL = "The computer has " + co + " points compared to the player\'s " + pl + " points (ties: " + ti + "). So the computer wins!";
      this._winMsg = msgW;
      this._loseMsg = msgL;
      console.log('d ' + isPlayerWinner, isComputerWinner);
   }
   DetermineWinner.prototype = {
     set winMsg(msgW) { this._winMsg = msgW; },
     get winMsg() { return this._winMsg; },
     set loseMsg(msgL) { this._loseMsg = msgL; },
     get loseMsg() {return this._loseMsg; }
   };
   DetermineWinner.prototype.determineW = function determineW() {
      switch (true) {
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
      this.play = function play() {
         do {
            if (isPlayerWinner || isComputerWinner) {
               return;
            }
            console.log('b', isPlayerWinner, isComputerWinner);
            var player = new PlayerGuess(prompt("Choose rock, paper, or scissors:"));
            var computer = new ComputerGuess(Math.floor((Math.random() * 3) + 1));
            var result = new CompareGuesses(player.PGuess(), computer.CGuess(), 1);
            if (result.compare() !== 0) {
               numOfRounds--;
            }
         } while (numOfRounds > 0 && (!isPlayerWinner || !isComputerWinner));
      };
   }

   function PlayerGuess(pChoice) {
     this._playerChoice = pChoice;
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

   PlayerGuess.prototype = {
     set playerChoice(pChoice) { this._playerChoice = pChoice; },
     get playerChoice() { return this._playerChoice; }
   };

   PlayerGuess.prototype.PGuess = function PGuess() {
      if (gestures.inArray(this.playerChoice.toLowerCase()) || gestures.indexOf(this.playerChoice.toLowerCase()) >= 0) {
         return this.playerChoice;
      } else {
         alert("You typed something else or did not spell your choice correctly. Please try again!");
         var pG = new PlayerGuess(prompt("Choose rock, paper, or scissors:"));
         return pG.PGuess();
      }
   };

   function ComputerGuess(formula) {
      this._cpuChoice = formula;
      this.CGuess = function CGuess() {
         switch (this.cpuChoice) {
            case 1:
               return gestures[0];
               break;
            case 2:
               return gestures[1];
               break;
            case 3:
               return gestures[2];
               break;
         }
      };
   }

   ComputerGuess.prototype = {
     set cpuChoice(formula) { this._cpuChoice = formula; },
     get cpuChoice() { return this._cpuChoice; }
   };

   function CompareGuesses(guess1, guess2, points) {
      this.output = "Player chose: " + guess1.toLowerCase() + ", and the computer chose: " + guess2.toLowerCase() + "! \n";
      this.compare = function compare() {
         if (rules[guess1.toLowerCase()] == guess2.toLowerCase()) {
            playerScore += points;
            alert(this.output + "\nPlayer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var w = new DetermineWinner(playerScore, computerScore, ties);
            w.determineW();
            return 1;
         } else if (rules[guess2.toLowerCase()] == guess1.toLowerCase()) {
            computerScore += points;
            alert(this.output + "\nComputer wins the round! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var l = new DetermineWinner(playerScore, computerScore, ties);
            l.determineW();
            return 2;
         } else {
            playerScore += 0;
            computerScore += 0;
            ties += 1;
            alert(this.output + "\nIt's a tie! Go again, no score added! \n\n" + "Player Score: " + playerScore + ", Computer Score: " + computerScore);
            var t = new DetermineWinner(playerScore, computerScore, ties);
            t.determineW();
            return 0;
         }
      };
   }

   function BTNClick() {
      var start = new StartGame(confirm(welcomeMsg));
      start.confirm();
      location.reload();
   }

   function Setup(h5Msg) {
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

   return function API() {
      return {
         initiate: Init,
         BTNClick: BTNClick,
         load: Setup
      };
   };

}());
