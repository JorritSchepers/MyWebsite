const EMPTY_PATH = "../../../assets/ttt/empty/"
const CROSS_PATH = "../../../assets/ttt/cross/"
const CIRCLE_PATH = "../../../assets/ttt/circle/"

export class TTTModel {
    fieldOfPaths: string[][];
    field: string[][];
    turn: string;
    playerWon: string = null;
    movesMade: number = 0;

    constructor() {
        this.turn = "cross"
        this.initField();
    }

    private initField(): void {
        this.fieldOfPaths = [
            [EMPTY_PATH + "tl.png", EMPTY_PATH + "tm.png", EMPTY_PATH + "tr.png"],
            [EMPTY_PATH + "ml.png", EMPTY_PATH + "mm.png", EMPTY_PATH + "mr.png"],
            [EMPTY_PATH + "bl.png", EMPTY_PATH + "bm.png", EMPTY_PATH + "br.png"]
        ];

        this.field = [
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"]
        ];
    }

    clickedOn(x: number, y: number) {
        if (this.field[y][x] != "empty") return;
        this.movesMade++;
        this.field[y][x] = this.turn;
        let imagePath = this.getImagePath(x, y);
        this.fieldOfPaths[y][x] = imagePath;
        this.checkWinCondition();
        if (this.movesMade == 9 && this.playerWon == null) {
            this.playerWon = "draw";   
            return; 
        }
        if (this.playerWon == null) this.algo();
    }

    private getImagePath(x: number, y: number): string {
        let firstChar: string = null;
        if (y == 0) firstChar = "t";
        if (y == 1) firstChar = "m";
        if (y == 2) firstChar = "b";
        
        let secondChar: string = null;
        if (x == 0) secondChar = "l";
        if (x == 1) secondChar = "m";
        if (x == 2) secondChar = "r";

        if (this.turn == "cross") {
            this.turn = "circle";
            return CROSS_PATH + firstChar + secondChar + ".png";
        }

        if (this.turn == "circle") {
            this.turn = "cross"
            return CIRCLE_PATH + firstChar + secondChar + ".png";
        }
    }

    private checkWinCondition(): void {
        let players: string[] = ["cross", "circle"];
        for (let p=0; p<players.length; p++) {
            for (let i=0; i<this.field[0].length; i++) {
                let n = 0;

                // Check if player won horizontally
                for (let j=0; j<this.field.length; j++) {
                    if (this.field[i][j] == players[p]) n++;
                }
                if (n == 3) {
                    this.playerWon = players[p];
                    return;
                }
                n = 0;

                // Check if player won vertically
                for (let j=0; j<this.field.length; j++) {
                    if (this.field[j][i] == players[p]) n++;
                }
                if (n == 3) {
                    this.playerWon = players[p];
                    return;
                }
            }

            // Check if player won diagonally
            if (this.field[1][1] == players[p]) {
                if (this.field[0][0] == players[p]) {
                    if (this.field[2][2] == players[p]) {
                        this.playerWon = players[p];
                        return;
                    }
                }

                if (this.field[0][2] == players[p]) {
                    if (this.field[2][0] == players[p]) {
                        this.playerWon = players[p];
                        return;
                    }
                }
            }
        }
    }

    resetGame(): void {
        this.playerWon = null;
        this.turn = "cross";
        this.movesMade = 0;
        this.initField();
    }

    private algo(): void {
        while(this.turn == "circle") this.AlgoChooseRandom();
    }

    private AlgoChooseRandom(): void {
        let randomY: number = this.getRandomInt(this.field.length);
        let randomX: number = this.getRandomInt(this.field[0].length);
        console.log("chosen x:", randomX, "and y:", randomY);
        if (this.field[randomY][randomX] != "empty") return;
        else this.clickedOn(randomX, randomY);
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}