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

class Game {
    height: number;
    windth: number;
    padding: number;
    ctx: CanvasRenderingContext2D;
    cell: Record<string, number>;
    map: number[][];
    score: number;
    constructor(
        height: number,
        windth: number,
        padding: number,
        canvas: HTMLCanvasElement,
    ) {
        this.score = 0;
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
                const targetCell = this.map[y][x];
                this.render(
                    targetCell,
                    this.colorCell(targetCell),
                    (this.cell.width + this.padding) * x + this.padding,
                    (this.cell.height + this.padding) * y + this.padding,
                );
            }
        }
    }
    colorCell(cell: number) {
        switch (cell) {
            case 0:
                return "#A7D6AC";
            case 2:
                return "#ea9e39";
            case 4:
                return "#8f912a";
            case 8:
                return "#5c8833";
            case 16:
                return "#37b12e";
            case 32:
                return "#39eaa3";
            case 64:
                return "#39b2ea";
            case 128:
                return "#7439ea";
            case 256:
                return "#cd39ea";
            case 512:
                return "#ea3989";
            case 1024:
                return "#f35217";
            case 2024:
                return "#bc8205";
            case 4096:
                return "#a7bc05";
            case 8192:
                return "#2dbc05";
            case 16384:
                return "#11a967";
            case 32768:
                return "#02909d";
            case 65536:
                return "#02339d";
            case 131072:
                return "#5f20a6";
            default:
                return "#000000";
        }
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

    moveDown(): void {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = 2; y >= MIN_POSITON; y--) {
                if (this.map[y][x] > 0) {
                    if (this.map[y + 1][x] === 0) {
                        this.map[y + 1][x] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y + 1][x] === this.map[y][x]) {
                        const targetCell = this.map[y][x] * 2;
                        this.score += targetCell;
                        this.map[y + 1][x] = targetCell;
                        this.map[y][x] = 0;
                        isMove = true;
                    }
                }
            }
        }
        if (isMove) {
            return this.moveDown();
        }
        this.createCell("Down");
        this.update();
        return;
    }
    moveUp(): void {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = 1; y < MAX_POSITON; y++) {
                if (this.map[y][x] > 0) {
                    if (this.map[y - 1][x] === 0) {
                        this.map[y - 1][x] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y - 1][x] === this.map[y][x]) {
                        const targetCell = this.map[y][x] * 2;
                        this.score += targetCell;
                        this.map[y - 1][x] = targetCell;
                        this.map[y][x] = 0;
                        isMove = true;
                    }
                }
            }
        }
        if (isMove) {
            return this.moveUp();
        }
        this.createCell("Up");
        this.update();
        return;
    }
    moveRight(): void {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = 2; x >= MIN_POSITON; x--) {
                if (this.map[y][x] > 0) {
                    if (this.map[y][x + 1] === 0) {
                        this.map[y][x + 1] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y][x + 1] === this.map[y][x]) {
                        const targetCell = this.map[y][x] * 2;
                        this.score += targetCell;
                        this.map[y][x + 1] = targetCell;
                        this.map[y][x] = 0;
                        isMove = true;
                    }
                }
            }
        }
        if (isMove) {
            return this.moveRight();
        }
        this.createCell("Right");
        this.update();
        return;
    }
    moveLeft(): void {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = 1; x < MAX_POSITON; x++) {
                if (this.map[y][x] > 0) {
                    if (this.map[y][x - 1] === 0) {
                        this.map[y][x - 1] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y][x - 1] === this.map[y][x]) {
                        const targetCell = this.map[y][x] * 2;
                        this.score += targetCell;
                        this.map[y][x - 1] = targetCell;
                        this.map[y][x] = 0;
                        isMove = true;
                    }
                }
            }
        }
        if (isMove) {
            return this.moveLeft();
        }
        this.createCell("Left");
        this.update();
        return;
    }
}
