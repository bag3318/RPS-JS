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
    set PlayerScore(pScore: number) {
        this.playerScore = pScore;
    }

    private computerScore: number = 0;
    get ComputerScore(): number {
        return this.computerScore;
    }
    set ComputerScore(cScore: number) {
        this.computerScore = cScore;
    }

    private ties: number = 0;
    get Ties(): number {
        return this.ties;
    }
    set Ties(draw: number) {
        this.ties = draw;
    }

    protected welcomeMsg: string = `
    Welcome to the \"Rock, Paper, Scissors\" game!

    Remember, the rules are simple:

    Rock Beats Scissors,
    Scissors Beats Paper,
    Paper Beats Rock.

    Click cancel if you don\'t wanna play.
    `
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
        var ready: boolean = confirm(this.welcomeMsg);
        var confirmReady: any = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
    }

    private DetermineWinner(): void {
        var msgW: string = `
        The player has ${this.playerScore} point(s) compared to the computer\'s ${this.computerScore} point(s)
        (ties: ${this.ties}).

        The player wins!
        `;
        var msgL: string = `
        The computer has ${this.computerScore} point(s) compared to the player\'s ${this.playerScore} point(s)
        (ties: ${this.ties}).

        The computer wins!
        `;
        if (this.playerScore >= 2) {
          this.isPlayerWinner = true;
          alert(msgW);
        }
        if (this.computerScore >= 2) {
          this.isComputerWinner = true;
          alert(msgL);
        }
    }

    private PlayGame(numOfRounds: number): void {
        do {
            if (this.isPlayerWinner || this.isComputerWinner) {
                return;
            }
            var player  = (<string>this.PlayerGuess());
            var computer = (<string>this.ComputerGuess());
            var result = (<number>this.CompareGuesses(player, computer, 1));
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!this.isPlayerWinner || !this.isComputerWinner));
    }

    private PlayerGuess(): string {
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
        return "";
    }


    private CompareGuesses(guess1: string, guess2: string, points: number): number {
        var output: string = `Player chose: ${guess1.toLowerCase()}, and the computer chose: ${guess2.toLowerCase()}!\n`;

        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            var wMsg: string = `
            ${output}
            Player wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(wMsg);
            this.DetermineWinner();
            return 1;
        } else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            var lMsg: string = `
            ${output}
            Computer wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(lMsg);
            this.DetermineWinner();
            return 2;
        } else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += 1;
            var tMsg: string = `
            ${output}
            It's a tie! Go again, no score added!

            Player Score: ${this.playerScore}, Computer Score: ${this.computerScore}
            `;
            alert(tMsg);
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
