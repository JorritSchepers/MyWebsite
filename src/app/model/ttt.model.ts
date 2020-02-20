const EMPTY_PATH = "../../../assets/ttt/empty/"
const CROSS_PATH = "../../../assets/ttt/cross/"
const CIRCLE_PATH = "../../../assets/ttt/circle/"

const EASY_DIF: number = 1
const HARD_DIF: number = 2;

export class TTTModel {
    fieldOfPaths: string[][];
    field: string[][];
    turn: string;
    playerWon: string = null;
    movesMade: number = 0;
    difficulty: number = null;
    // difficulty: number = EASY_DIF;
    // difficulty: number = HARD_DIF;
    algoMoves: number[][] = [[]];

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
        if (this.playerWon == null && this.difficulty != null) this.algo();
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
        this.algoMoves = [[]];
        this.initField();
    }

    private algo(): void {
        while(this.turn == "circle") {
            switch (this.difficulty) {
                case EASY_DIF:
                    this.easyAlgo();
                    break;
                case HARD_DIF: 
                    this.hardAlgo();
                    break;
            }
        }
    }

    private easyAlgo(): void {
        let randomY: number = this.getRandomInt(this.field.length);
        let randomX: number = this.getRandomInt(this.field[0].length);
        if (this.field[randomY][randomX] != "empty") return;
        else this.clickedOn(randomX, randomY);
    }

    private hardAlgo(): void {
        console.log(this.algoMoves);
        let firstMove: string = null;

        switch(this.movesMade) {
            case 1: 
                if (this.field[1][1] == 'cross') {
                    firstMove = 'mid';
                }

                if (firstMove == 'mid') {
                    let randomInt: number = this.getRandomInt(4);
                    switch (randomInt) {
                        case 0: 
                            this.clickedOn(0, 0);
                            this.algoMoves[0] = [0, 0];
                            break;
                        case 1: 
                            this.clickedOn(2, 0);
                            this.algoMoves[0] = [2, 0];
                            break;
                        case 2: 
                            this.clickedOn(0, 2);
                            this.algoMoves[0] = [0, 2];
                            break;
                        case 3: 
                            this.clickedOn(2, 2);
                            this.algoMoves[0] = [2, 2];
                            break;
                    }
                    return;
                }
                this.easyAlgo();
            case 3:
                if (firstMove = 'mid') {
                    let oppositeMoveOfFirstMove: number[] = this.getOppositeCoordsOf(this.algoMoves[0])
                    if (this.field[oppositeMoveOfFirstMove[0]][oppositeMoveOfFirstMove[1]] == 'cross') {
                        let randomCornerMoves: number[][] = this.getFreeMoves('corner');
                        let randomInt: number = this.getRandomInt(randomCornerMoves.length);
                        let chosenRandomCornerMove: number[] = randomCornerMoves[randomInt];
                        this.clickedOn(chosenRandomCornerMove[0], chosenRandomCornerMove[1]);
                    }
                    return;
                }
                this.easyAlgo();
            case 5:
                if (this.field[0][1] == 'empty') this.clickedOn(0, 1);
                this.easyAlgo();
        }
        return;
    }

    private getOppositeCoordsOf(list: number[]): number[] {
        if (list[0] == 1 && list[1] == 1) {
            return;
        }
        let temp: number[] = [-1, -1];

        switch(list[0]) {
            case 0: 
                temp[0] = 2;
                break;
            case 1: 
                temp[0] = 1;
                break;
            case 2: 
                temp[0] = 0;
                break;
        }

        switch(list[1]) {
            case 0: 
                temp[1] = 2;
                break;
            case 1: 
                temp[1] = 1;
                break;
            case 2: 
                temp[1] = 0;
                break;
        }
        return temp;
    }

    private getFreeMoves(spot: string): number[][] {
        let temp: number[][] = [[]];
        if (spot = 'corner') {
            if (this.field[0][0] == 'empty') temp.push([0,0]);
            if (this.field[2][0] == 'empty') temp.push([2,0]);
            if (this.field[0][2] == 'empty') temp.push([0,2]);
            if (this.field[2][2] == 'empty') temp.push([2,2]);
        }
        return temp;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}