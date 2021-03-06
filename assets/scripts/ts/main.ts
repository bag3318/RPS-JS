// reference required scripts
/// <reference path="ref/trim.ts"/>
/// <reference path="ref/interfaces.ts" />
/// <reference path="ref/variables.ts" />


class RPS {

    protected static _gameName: string;
    protected static _version: number;
    protected static _creator: string;
    protected static _statusOK: boolean;

    // create getters and setters global vars above
    get gameName(): string {
        return RPS._gameName;
    }
    set gameName($gameName: string) {
        RPS._gameName = $gameName;
    }
    get version(): number {
        return RPS._version;
    }
    set version($version: number) {
        RPS._version = $version;
    }
    get creator(): string {
        return RPS._creator;
    }
    set creator($creator: string) {
        RPS._creator = $creator;
    }
    get statusOK(): boolean {
        return RPS._statusOK;
    }
    set statusOK($statusOK: boolean) {
        RPS._statusOK = $statusOK;
    }

    constructor(public info: GameInfo) {
        RPS._gameName = info.game_name;
        RPS._version = info.version;
        RPS._creator = info.creator;
        RPS._statusOK = info.status_ok;
        console.log(`Game Information:\nGame Name: ${RPS._gameName}, Version: ${RPS._version}, Creator: ${RPS._creator}, Status OK: ${RPS._statusOK}.`);
    }

    private playerScore: number = 0;
    get PlayerScore(): number {
        return this.playerScore;
    }
    set PlayerScore($playerScore: number) {
        this.playerScore = $playerScore;
    }

    private computerScore: number = 0;
    get ComputerScore(): number {
        return this.computerScore;
    }
    set ComputerScore($computerScore: number) {
        this.computerScore = $computerScore;
    }

    private ties: number = 0;
    get Ties(): number {
        return this.ties;
    }
    set Ties($ties: number) {
        this.ties = $ties;
    }

    protected welcomeMsg: string = `
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
    set WelcomeMsg($welcomeMsg: string) {
        this.welcomeMsg = $welcomeMsg;
    }

    private gestures: Array<string> = Array(Gestures.rock, Gestures.paper, Gestures.scissors);
    
    private rules: Rules = Object({
        rock: this.gestures[2],
        paper: this.gestures[0],
        scissors: this.gestures[1]
    });
        
    private isPlayerWinner: boolean = false;
    private isComputerWinner: boolean = false;

    private Start = (): void => {
        var trimmedWelcomeMsg = trimIndentSpaces(this.welcomeMsg);
        var ready: boolean = confirm(trimmedWelcomeMsg);
        // in this case, we use a ternary operator to speed things up a bit
        var confirmReady: void = (ready) ? this.PlayGame(3) : alert("Sorry you don\'t wanna play, maybe next time! :)");
        return confirmReady;
    }

    private DetermineWinner(roundPointsCount: number): void {
        // `roundPointsCount` is a param in this case because it represents
        //  the score for either the computer or player can reach at maximum
        var finalWinMsg: string = `
        You have ${this.playerScore} point(s) compared to the computer\'s ${this.computerScore} point(s) (ties: ${this.ties}).

        You win the game!
        `;
        var finalLoseMsg: string = `
        The computer has ${this.computerScore} point(s) compared to your ${this.playerScore} point(s) (ties: ${this.ties}).

        The computer wins the game!
        `;
        if (this.playerScore >= roundPointsCount) {
          this.isPlayerWinner = true;
          alert(trimIndentSpaces(finalWinMsg));
        }
        if (this.computerScore >= roundPointsCount) {
          this.isComputerWinner = true;
          alert(trimIndentSpaces(finalLoseMsg));
        }
    }

    private PlayGame(numOfRounds: number): void {
        do {
            if (this.isPlayerWinner || this.isComputerWinner) {
                return;
            }
            var player: string = this.PlayerGuess();
            var computer: string = this.ComputerGuess();
            var result: number = this.CompareGuesses(player, computer, 1);
            if (result !== 0) {
                numOfRounds--;
            }
        } while (numOfRounds > 0 && (!this.isPlayerWinner || !this.isComputerWinner));
    }

    private PlayerGuess(): string {
        // since prompt could be of type null (if there is nothing entered), we need to force its type to be string
        var playerChoice: string = (<string>prompt("Choose rock, paper, or scissors:"));
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
                return this.gestures[0]; // return rock
            }
            case 2: {
                return this.gestures[1]; // return paper
            }
            case 3: {
                return this.gestures[2]; // return scissors
            }
            default: {
                return ""; // we need to return a blank string to fullfill the return type of this function
            }
        }
    }


    private CompareGuesses(guess1: string, guess2: string, points: number): number {
        var outputScore: string = `
        You chose: ${guess1.toLowerCase()}.
        Computer chose: ${guess2.toLowerCase()}.
        `;
        if (this.rules[guess1.toLowerCase()] === guess2.toLowerCase()) {
            this.playerScore += points;
            this.ties += 0;
            var winRoundMsg: string  = `
            ${outputScore}
            You win the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(trimIndentSpaces(winRoundMsg));
            this.DetermineWinner(2);
            return 1;
        } else if (this.rules[guess2.toLowerCase()] === guess1.toLowerCase()) {
            this.computerScore += points;
            this.ties += 0;
            var lostRoundMsg: string = `
            ${outputScore}
            Computer wins the round!

            Player Score: ${this.playerScore}; Computer Score: ${this.computerScore}.
            `;
            alert(trimIndentSpaces(lostRoundMsg));
            this.DetermineWinner(2);
            return 2;
        } else {
            this.playerScore += 0;
            this.computerScore += 0;
            this.ties += points; // we can use the points parameter here, as it will work as needed
            var tieRoundMsg: string = `
            ${outputScore}
            It's a tie! Go again, no score added!

            Player Score: ${this.playerScore}, Computer Score: ${this.computerScore}.
            `;
            alert(trimIndentSpaces(tieRoundMsg));
            this.DetermineWinner(2);
            return 0;
        }
    }

    protected BTNClick = (): void => {
        this.Start(); // start the game
        location.reload(false); // set false to reload page from cache
    }

    public Init = (): void => {
        let rpsScript: RPS = new RPS(GAME_INFO);
        let btnElement: HTMLButtonElement = (document.querySelector("#btn") as HTMLButtonElement);
        btnElement.addEventListener("click", (): void => {
          rpsScript.BTNClick();
        }, false); // false = execute during bubbling phase
    }
}
