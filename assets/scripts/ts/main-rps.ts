class RPS {

    protected static _gameName: string;
    protected static _version: number;
    protected static _creator: string;
    protected static _status: boolean;

    constructor(protected gameName: string, protected version: number, private creator: string, private status: boolean) {
      RPS._gameName = gameName;
      RPS._version = version;
      RPS._creator = creator;
      RPS._status = status;
      console.log(`Game Name: ${gameName}, Version: ${version}, Creator: ${creator}, Status OK: ${status}.`); // with params
      // console.log(`Game Name: ${RPS._gameName}, Version: ${RPS._version}, Creator: ${RPS._creator}, Status OK: ${RPS._status}.`); // with vars
    }

    private playerScore: number = 0;
    get PlayerScore(): number {
        return this.playerScore;
    }
    set PlayerScore(pScore: number) { // pScore = player's score
        this.playerScore = pScore;
    }

    private computerScore: number = 0;
    get ComputerScore(): number {
        return this.computerScore;
    }
    set ComputerScore(cScore: number) { // cScore = computer's score
        this.computerScore = cScore;
    }

    private ties: number = 0;
    get Ties(): number {
        return this.ties;
    }
    set Ties(draw: number) {
        this.ties = draw;
    }

    protected welcomeMsg: string = trimIndentSpace`
    Welcome to the \"Rock, Paper, Scissors\" game!

    Remember, the rules are simple:

    Rock Beats Scissors,
    Scissors Beats Paper,
    Paper Beats Rock.

    Click cancel if you don\'t wanna play.
    `;
    get WelcomeMsg(): string {
        return this.welcomeMsg;
    }
    set WelcomeMsg(initMsg: string) {
        this.welcomeMsg = initMsg;
    }

    private gestures: string[] = new Array("rock", "paper", "scissors");
    private rules: any = new Object({
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    });
    private isPlayerWinner: boolean = false;
    private isComputerWinner: boolean = false;

    private Start(): void {
        /**
         * confirm is a boolean because it has 2 return statements:
         * 1. if you click ok, it returns true
         * 2. if you click cancel, it returns false
         */
        var ready: boolean = confirm(this.welcomeMsg);
        // in this case, we use ternary operator to speed things up a bit
        var confirmReady: any = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
    }

    private DetermineWinner(): void {
        var finalWinMsg: string = trimIndentSpace`
        The player has ${this.playerScore} point(s) compared to the computer\'s ${this.computerScore} point(s) (ties: ${this.ties}).

        The player wins the game!
        `;
        var finalLoseMsg: string = trimIndentSpace`
        The computer has ${this.computerScore} point(s) compared to the player\'s ${this.playerScore} point(s) (ties: ${this.ties}).

        The computer wins the game!
        `;
        if (this.playerScore >= 2) {
          this.isPlayerWinner = true;
          alert(finalWinMsg);
        }
        if (this.computerScore >= 2) {
          this.isComputerWinner = true;
          alert(finalLoseMsg);
        }
    }

    private PlayGame(numOfRounds: number): void {
        do {
            if (this.isPlayerWinner || this.isComputerWinner) {
                return;
            }
            var player  = <string>this.PlayerGuess();
            var computer = <string>this.ComputerGuess();
            var result = <number>this.CompareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!this.isPlayerWinner || !this.isComputerWinner));
    }

    private PlayerGuess(): string {
        // since prompt could be of type null (if there is nothing entered), we need to force its type to be string
        var playerChoice: string = <string>prompt("Choose rock, paper, or scissors:");
        if (this.gestures.indexOf(playerChoice.toLowerCase()) >= 0) {
            return playerChoice;
        } else {
            alert("You typed something else or did not spell your choice correctly. Please try again!");
            return this.PlayerGuess();
        }
    }

    private ComputerGuess(): string {
        var cpuChoice: number = Math.floor((Math.random() * 3) + 1);
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
        return ""; // we need to return a blank string for the return type of the function to be string
    }


    private CompareGuesses(guess1: string, guess2: string, points: number): number {
        var output: string = `Player chose: ${guess1.toLowerCase()}, and the computer chose: ${guess2.toLowerCase()}!`;

        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;

            var winRoundMsg: string = trimIndentSpace`
            ${output}

            Player wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;

            alert(winRoundMsg);
            this.DetermineWinner();
            return 1;
        } else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;

            var lostRoundMsg: string = trimIndentSpace`
            ${output}

            Computer wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;

            alert(lostRoundMsg);
            this.DetermineWinner();
            return 2;
        } else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            var tieRoundMsg: string = trimIndentSpace`
            ${output}

            It's a tie! Go again, no score added!

            Player Score: ${this.playerScore}, Computer Score: ${this.computerScore}
            `;
            alert(tieRoundMsg);
            this.DetermineWinner();
            return 0;
        }
    }

    private BTNClick(): void {
        this.Start();
        location.reload(true);
    }

    public Init(): void {
        let rpsScript: RPS = new RPS($info.game_name, $info.version, $info.creator, $info.status_ok);
        let element: HTMLElement = document.querySelector("#btn") as HTMLElement;
        element.addEventListener("click", () => {
          rpsScript.BTNClick();
        }, false);
    }
}
