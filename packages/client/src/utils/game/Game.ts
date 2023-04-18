const WIDTH = 280;
const HEIGHT = 280;
const PADDING = 8;
const MAX_POSITON = 4;
const MIN_POSITON = 0;

export const GameLoad = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
        return;
    }
    new Game(WIDTH, HEIGHT, PADDING, canvas);
};

type Mode = "Row" | "Colm";
type Direction = "Up" | "Down" | "Right" | "Left";
type Positon = { x: number; y: number };

class Game {
    height: number;
    windth: number;
    padding: number;
    ctx: CanvasRenderingContext2D;
    cell: Record<string, number>;
    map: number[][];
    isCheckGameOver: boolean;
    constructor(
        height: number,
        windth: number,
        padding: number,
        canvas: HTMLCanvasElement,
    ) {
        this.height = height * 2;
        this.windth = windth * 2;
        this.padding = padding * 2;
        this.cell = {
            height: (this.height - this.padding * 5) / MAX_POSITON,
            width: (this.windth - this.padding * 5) / MAX_POSITON,
        };
        canvas.width = this.windth;
        canvas.height = this.height;
        this.map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.isCheckGameOver = false;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.init();
        this.initControl();
    }
    init() {
        for (let i = 0; i < 2; i++) {
            this.createRandomCell();
        }
        this.update();
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
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.roundRect(xPos, yPos, this.cell.width, this.cell.height, [26]);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        if (numCell) {
            this.ctx.fillStyle = "#FFFFFF";
            if (numCell < 10) {
                this.ctx.font = "normal 70px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 40, yPos + 85);
            } else if (numCell < 100 && numCell > 10) {
                this.ctx.font = "normal 60px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 25, yPos + 80);
            } else if (numCell < 1000 && numCell > 100) {
                this.ctx.font = "normal 50px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 20, yPos + 80);
            } else if (numCell > 10000 && numCell < 100000) {
                this.ctx.font = "normal 30px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 17, yPos + 72);
            }
        }
    }
    update() {
        this.ctx.clearRect(0, 0, this.windth, this.height);
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                this.render(
                    this.map[y][x],
                    `rgb(${(155 - this.map[y][x]) % 255}, ${
                        (220 - this.map[y][x] * 15) % 255
                    }, ${(160 - this.map[y][x] * 3) % 255})`,
                    (this.cell.width + this.padding) * x + this.padding,
                    (this.cell.height + this.padding) * y + this.padding,
                );
            }
        }
        this.checkGameOver();
    }
    initControl() {
        document.addEventListener("keyup", e => {
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
            console.log("game over");
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
