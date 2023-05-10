const WIDTH = 280;
const HEIGHT = 280;
const PADDING = 8;
const MAX_POSITON = 4;
const MIN_POSITON = 0;
const COLOR = {
    cell_0: "#A7D6AC",
    cell_2: "#EEE4DA",
    cell_4: "#E8C9AB",
    cell_8: "#DA944E",
    cell_16: "#FF9E3D",
    cell_32: "#FFA88C",
    cell_64: "#94aef5",
    cell_128: "#66ba9d",
    cell_256: "#d57eba",
    cell_512: "#92c4d1",
    cell_1024: "#cca5fb",
    cell_2048: "#FFD43D",
    cell_4096: "#d497d9",
    cell_8192: "#d997ba",
    cell_16384: "#97d5d9",
    cell_32768: "#aafdcc",
    cell_65536: "#b9aafd",
    cell_131072: "ff0000",
};

export type Mode = "Row" | "Colm";
type Direction = "Up" | "Down" | "Right" | "Left";
type Positon = { x: number; y: number };
type GameOverStatus = "win" | "lose" | "none";

class GameClass {
    height: number;
    windth: number;
    padding: number;
    ctx: CanvasRenderingContext2D | undefined;
    cell: Record<string, number>;
    map: number[][];
    score: number;
    isCheckGameOver: boolean;
    play: boolean;
    win: boolean;
    setScoreCallback: React.Dispatch<React.SetStateAction<number>> | undefined;
    playCallback: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    gameOverCallback:
        | React.Dispatch<React.SetStateAction<GameOverStatus>>
        | undefined;
    constructor(height: number, windth: number, padding: number) {
        this.score = 0;
        this.height = height * 2;
        this.windth = windth * 2;
        this.padding = padding * 2;
        this.cell = {
            height: (this.height - this.padding * 5) / MAX_POSITON,
            width: (this.windth - this.padding * 5) / MAX_POSITON,
        };
        this.map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.isCheckGameOver = false;
        this.play = false;
        this.win = false;
        this.update();
    }

    start() {
        if (this.ctx) {
            this.newGame();
            for (let i = 0; i < 2; i++) {
                this.createRandomCell();
            }
            this.update();
        }
    }

    newGame() {
        if (this.playCallback) {
            this.playCallback(true);
        }
        if (this.setScoreCallback) {
            this.setScoreCallback(0);
        }
        this.play = true;
        this.score = 0;
        this.map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
    }

    init(
        canvas: HTMLCanvasElement,
        playCallback: React.Dispatch<React.SetStateAction<boolean>>,
        gameOverCallback: React.Dispatch<React.SetStateAction<GameOverStatus>>,
        setScoreCallback: React.Dispatch<React.SetStateAction<number>>,
    ) {
        if (canvas) {
            canvas.width = this.windth;
            canvas.height = this.height;
            this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            this.initControl();
            this.update();
            this.playCallback = playCallback;
            this.gameOverCallback = gameOverCallback;
            this.setScoreCallback = setScoreCallback;
        }
    }

    createRandomCell() {
        const y = this.getRandomInt(MAX_POSITON);
        const x = this.getRandomInt(MAX_POSITON);
        if (this.map[y][x] === 0) {
            this.map[y][x] = 2;
        } else {
            this.createRandomCell();
        }
    }

    render(numCell: number, color: string, xPos: number, yPos: number) {
        if (this.ctx) {
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.roundRect(xPos, yPos, this.cell.width, this.cell.height, [
                26,
            ]);
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.beginPath();
            if (numCell) {
                this.ctx.fillStyle = "#71685F";
                if (numCell < 16) {
                    this.ctx.font = "normal 70px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 40, yPos + 85);
                } else if (numCell < 128 && numCell >= 16) {
                    this.ctx.font = "normal 60px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 25, yPos + 80);
                } else if (numCell < 1024 && numCell >= 128) {
                    this.ctx.font = "normal 50px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 20, yPos + 80);
                } else if (numCell < 16384 && numCell >= 1024) {
                    this.ctx.font = "normal 40px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 12, yPos + 75);
                } else if (numCell < 131072 && numCell >= 16384) {
                    this.ctx.font = "normal 35px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 7, yPos + 72);
                } else if (numCell === 131072) {
                    this.ctx.font = "normal 32px Inter";
                    this.ctx.fillText(`${numCell}`, xPos + 6, yPos + 72);
                }
            }
        }
    }
    update() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.windth, this.height);
            for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
                for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                    const targetCell = this.map[y][x];
                    if (targetCell === 2048) {
                        this.win = true;
                    }
                    this.render(
                        targetCell,
                        this.colorCell(targetCell),
                        (this.cell.width + this.padding) * x + this.padding,
                        (this.cell.height + this.padding) * y + this.padding,
                    );
                }
                this.checkGameOver();
            }
        }
    }
    colorCell(cell: number) {
        switch (cell) {
            case 2:
                return COLOR.cell_2;
            case 4:
                return COLOR.cell_4;
            case 8:
                return COLOR.cell_8;
            case 16:
                return COLOR.cell_16;
            case 32:
                return COLOR.cell_32;
            case 64:
                return COLOR.cell_64;
            case 128:
                return COLOR.cell_128;
            case 256:
                return COLOR.cell_256;
            case 512:
                return COLOR.cell_512;
            case 1024:
                return COLOR.cell_1024;
            case 2048:
                return COLOR.cell_2048;
            case 4096:
                return COLOR.cell_4096;
            case 8192:
                return COLOR.cell_8192;
            case 16384:
                return COLOR.cell_16384;
            case 32768:
                return COLOR.cell_32768;
            case 65536:
                return COLOR.cell_65536;
            case 131072:
                return COLOR.cell_131072;
            default:
                return COLOR.cell_0;
        }
    }
    initControl() {
        document.addEventListener("keyup", e => {
            if (this.play) {
                switch (e.key) {
                    case "ArrowUp":
                        this.moveUp();
                        break;
                    case "ArrowDown":
                        this.moveDown();
                        break;
                    case "ArrowLeft":
                        this.moveLeft();
                        break;
                    case "ArrowRight":
                        this.moveRight();
                        break;
                }
            }
        });
    }

    getRandomInt(max: number): number {
        const randomInt = Math.floor(Math.random() * max);
        return randomInt;
    }

    checkForFreeCell(mode: Mode, positon: number): boolean {
        if (mode === "Row") {
            for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                if (!this.map[positon][x]) {
                    return true;
                }
            }
            return false;
        } else {
            for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
                if (!this.map[y][positon]) {
                    return true;
                }
            }
            return false;
        }
    }

    createCell(direction: Direction) {
        const Cell = this.getRandomInt(10) === 9 ? 4 : 2;
        if (direction === "Up") {
            const xPos = this.getRandomInt(MAX_POSITON);
            if (this.map[3][xPos] === 0) {
                this.map[3][xPos] = Cell;
            } else {
                if (this.checkForFreeCell("Row", 3)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Down") {
            const xPos = this.getRandomInt(MAX_POSITON);
            if (this.map[MIN_POSITON][xPos] === 0) {
                this.map[MIN_POSITON][xPos] = Cell;
            } else {
                if (this.checkForFreeCell("Row", 0)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Left") {
            const yPos = this.getRandomInt(MAX_POSITON);
            if (this.map[yPos][3] === 0) {
                this.map[yPos][3] = Cell;
            } else {
                if (this.checkForFreeCell("Colm", 3)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Right") {
            const yPos = this.getRandomInt(MAX_POSITON);
            if (this.map[yPos][MIN_POSITON] === 0) {
                this.map[yPos][MIN_POSITON] = Cell;
            } else {
                if (this.checkForFreeCell("Colm", 0)) {
                    this.createCell(direction);
                }
            }
        }
    }

    checkGameOver() {
        this.isCheckGameOver = true;
        const isMoveDown = this.moveDown();
        const isMoveUp = this.moveUp();
        const isMoveLeft = this.moveLeft();
        const isMoveRight = this.moveRight();
        this.isCheckGameOver = false;
        if (!isMoveDown && !isMoveUp && !isMoveLeft && !isMoveRight) {
            if (this.playCallback) {
                this.playCallback(false);
                this.play = false;
            }
            if (this.gameOverCallback) {
                this.gameOverCallback(this.win ? "win" : "lose");
            }
        }
    }

    updateScore(score: number): void {
        this.score += score;
        if (this.setScoreCallback) {
            this.setScoreCallback(this.score);
        }
    }

    moveCell(newPos: Positon, oldPos: Positon): boolean {
        if (this.map[oldPos.y][oldPos.x] > 0) {
            if (this.map[newPos.y][newPos.x] === 0) {
                if (!this.isCheckGameOver) {
                    this.map[newPos.y][newPos.x] = this.map[oldPos.y][oldPos.x];
                    this.map[oldPos.y][oldPos.x] = 0;
                }
                return true;
            } else if (
                this.map[newPos.y][newPos.x] === this.map[oldPos.y][oldPos.x]
            ) {
                if (!this.isCheckGameOver) {
                    this.map[newPos.y][newPos.x] *= 2;
                    this.updateScore(this.map[newPos.y][newPos.x]);
                    this.map[oldPos.y][oldPos.x] = 0;
                }
                return true;
            }
        }
        return false;
    }

    moveDown(): boolean {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = 2; y >= MIN_POSITON; y--) {
                const newPos = { x: x, y: y + 1 };
                const oldPos = { x: x, y: y };
                const isMoved = this.moveCell(newPos, oldPos);
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveDown();
            }
            this.createCell("Down");
            this.update();
            return true;
        }
        return isMove;
    }
    moveUp(): boolean {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = 1; y < MAX_POSITON; y++) {
                const newPos = { x: x, y: y - 1 };
                const oldPos = { x: x, y: y };
                const isMoved = this.moveCell(newPos, oldPos);
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveUp();
            }
            this.createCell("Up");
            this.update();
            return true;
        }
        return isMove;
    }
    moveRight(): boolean {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = 2; x >= MIN_POSITON; x--) {
                const newPos = { x: x + 1, y: y };
                const oldPos = { x: x, y: y };
                const isMoved = this.moveCell(newPos, oldPos);
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveRight();
            }
            this.createCell("Right");
            this.update();
            return true;
        }
        return isMove;
    }
    moveLeft(): boolean {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = 1; x < MAX_POSITON; x++) {
                const newPos = { x: x - 1, y: y };
                const oldPos = { x: x, y: y };
                const isMoved = this.moveCell(newPos, oldPos);
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveLeft();
            }
            this.createCell("Left");
            this.update();
            return true;
        }
        return isMove;
    }
}

export const GameEngine = new GameClass(HEIGHT, WIDTH, PADDING);
