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
// const RANGE = (WIDTH - PADDING * (MAX_POSITON + 1)) / MAX_POSITON + PADDING;
const SPEED = 2;

export type Mode = "Row" | "Colm";
type Direction = "Up" | "Down" | "Right" | "Left";
type Positon = { x: number; y: number };
type GameOverStatus = "win" | "lose" | "none";
type Cell = {
    value: number;
    newValue: number;
    x: number;
    y: number;
    xPos: number;
    yPos: number;
    newXPos: number;
    newYPos: number;
    collapseTarget: null | Cell;
    target: null | Cell;
    updateNewPos: (obj: Positon) => void;
    collapsingTarget: (obj: Cell) => void;
    newTarget: (obj: Cell) => void;
    move: () => boolean;
    update: () => void;
};

class GameClass {
    height: number;
    windth: number;
    padding: number;
    ctx: CanvasRenderingContext2D | undefined;
    cellParams: Record<string, number>;
    map: (0 | Cell)[][];
    score: number;
    isCheckGameOver: boolean;
    play: boolean;
    win: boolean;
    staticCellList: Cell[];
    isAnimation: boolean;
    setScoreCallback: React.Dispatch<React.SetStateAction<string>> | undefined;
    playCallback: React.Dispatch<React.SetStateAction<boolean>> | undefined;
    gameOverCallback:
        | React.Dispatch<React.SetStateAction<GameOverStatus>>
        | undefined;
    constructor(height: number, windth: number, padding: number) {
        this.score = 0;
        this.height = height * 2;
        this.windth = windth * 2;
        this.padding = padding * 2;
        this.cellParams = {
            height: (this.height - this.padding * 5) / MAX_POSITON,
            width: (this.windth - this.padding * 5) / MAX_POSITON,
        };
        this.map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.isAnimation = false;
        this.isCheckGameOver = false;
        this.play = false;
        this.win = false;
        this.staticCellList = [];
        this.update();
    }

    createNewCell(value: number, x: number, y: number) {
        const cell: Cell = {
            value: value,
            newValue: value,
            x: x,
            y: y,
            xPos: (this.cellParams.width + this.padding) * x + this.padding,
            yPos: (this.cellParams.width + this.padding) * y + this.padding,
            newXPos: (this.cellParams.width + this.padding) * x + this.padding,
            newYPos: (this.cellParams.height + this.padding) * y + this.padding,
            collapseTarget: null,
            target: null,
            updateNewPos: (newPos: Positon) => {
                const { x, y } = newPos;
                cell.x = x;
                cell.y = y;
                cell.newXPos =
                    (this.cellParams.width + this.padding) * x + this.padding;
                cell.newYPos =
                    (this.cellParams.height + this.padding) * y + this.padding;
            },
            collapsingTarget: (target: Cell) => {
                cell.collapseTarget = target;
                cell.newValue *= 2;
            },
            newTarget: (target: Cell) => {
                cell.target = target;
                cell.newValue *= 2;
                cell.updateNewPos({ x: target.x, y: target.y });
            },
            move: (): boolean => {
                let isMove = false;
                if (
                    cell.collapseTarget &&
                    Math.abs(
                        cell.xPos -
                            cell.collapseTarget.xPos +
                            (cell.yPos - cell.collapseTarget.yPos),
                    ) === 0
                ) {
                    console.log(
                        Math.abs(
                            cell.xPos -
                                cell.collapseTarget.xPos +
                                (cell.yPos - cell.collapseTarget.yPos),
                        ),
                    );
                    cell.update();
                }
                if (cell.xPos !== cell.newXPos) {
                    if (cell.xPos < cell.newXPos) {
                        cell.xPos += SPEED;
                    } else if (cell.xPos > cell.newXPos) {
                        cell.xPos -= SPEED;
                    }
                    isMove = true;
                } else if (cell.yPos !== cell.newYPos) {
                    if (cell.yPos < cell.newYPos) {
                        cell.yPos += SPEED;
                    } else if (cell.yPos > cell.newYPos) {
                        cell.yPos -= SPEED;
                    }
                    isMove = true;
                }
                if (
                    cell.xPos === cell.newXPos &&
                    cell.yPos === cell.newYPos &&
                    cell.value !== cell.newValue &&
                    !cell.collapseTarget
                ) {
                    cell.update();
                }
                this.render(cell);
                return isMove;
            },
            update: (): void => {
                cell.value = cell.newValue;
                cell.target = null;
            },
        };
        return cell;
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
            this.setScoreCallback("0");
        }
        this.play = true;
        this.score = 0;
        this.map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.staticCellList = [];
        this.isAnimation = false;
        this.ctx?.clearRect(0, 0, this.windth, this.height);
    }

    init(
        canvas: HTMLCanvasElement,
        playCallback: React.Dispatch<React.SetStateAction<boolean>>,
        gameOverCallback: React.Dispatch<React.SetStateAction<GameOverStatus>>,
        setScoreCallback: React.Dispatch<React.SetStateAction<string>>,
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
            this.map[y][x] = this.createNewCell(2, x, y);
        } else {
            this.createRandomCell();
        }
    }

    render(cell: Cell) {
        if (this.ctx) {
            const { value, xPos, yPos } = cell;
            const color = this.colorCell(value);
            this.ctx.strokeStyle = color;
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.roundRect(
                xPos,
                yPos,
                this.cellParams.width,
                this.cellParams.height,
                [26],
            );
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.beginPath();
            if (value) {
                this.ctx.fillStyle = "#71685F";
                if (value < 16) {
                    this.ctx.font = "normal 70px Inter";
                    this.ctx.fillText(`${value}`, xPos + 40, yPos + 85);
                } else if (value < 128 && value >= 16) {
                    this.ctx.font = "normal 60px Inter";
                    this.ctx.fillText(`${value}`, xPos + 25, yPos + 80);
                } else if (value < 1024 && value >= 128) {
                    this.ctx.font = "normal 50px Inter";
                    this.ctx.fillText(`${value}`, xPos + 20, yPos + 80);
                } else if (value < 16384 && value >= 1024) {
                    this.ctx.font = "normal 40px Inter";
                    this.ctx.fillText(`${value}`, xPos + 12, yPos + 75);
                } else if (value < 131072 && value >= 16384) {
                    this.ctx.font = "normal 35px Inter";
                    this.ctx.fillText(`${value}`, xPos + 7, yPos + 72);
                } else if (value === 131072) {
                    this.ctx.font = "normal 32px Inter";
                    this.ctx.fillText(`${value}`, xPos + 6, yPos + 72);
                }
            }
        }
    }

    background() {
        if (this.ctx) {
            for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
                for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                    const color = this.colorCell(0);
                    this.ctx.strokeStyle = color;
                    this.ctx.fillStyle = color;
                    this.ctx.beginPath();
                    this.ctx.roundRect(
                        (this.cellParams.width + this.padding) * x +
                            this.padding,
                        (this.cellParams.height + this.padding) * y +
                            this.padding,
                        this.cellParams.width,
                        this.cellParams.height,
                        [26],
                    );
                    this.ctx.stroke();
                    this.ctx.fill();
                }
            }
        }
    }

    update() {
        if (this.ctx) {
            for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
                for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                    const targetCell = this.map[y][x];
                    if (targetCell) {
                        if (targetCell.value === 2048) {
                            this.win = true;
                        }
                        this.render(targetCell);
                    }
                }
                this.checkGameOver();
            }
            this.animation();
        }
    }

    // animationCreateCell(
    //     numCell: number,
    //     color: string,
    //     xPos: number,
    //     yPos: number,
    // ) {
    //     const newRender = (size: number) => {
    //         this.render(numCell, color, xPos, yPos, size);
    //     };
    //     for (let size = 0; size < 10; size++) {
    //         requestAnimationFrame(newRender);
    //     }
    //     for (let size = 10; size > 0; size--) {
    //         newRender(size);
    //     }
    // }

    animation(direction?: Direction) {
        this.isAnimation = true;
        const tick = () => {
            let isMove = false;
            this.ctx?.clearRect(0, 0, this.windth, this.height);
            this.background();
            for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
                for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
                    const targetCell = this.map[y][x] as 0 | Cell;
                    if (targetCell) {
                        if (targetCell.move()) {
                            isMove = true;
                        }
                    }
                }
            }
            this.staticCellList.map((cell: Cell) => {
                cell.move();
            });
            if (isMove) {
                requestAnimationFrame(tick);
            } else {
                this.staticCellList = [];
                if (direction) {
                    this.createCell(direction);
                }
                this.isAnimation = false;
            }
        };
        requestAnimationFrame(tick);
    }
    colorCell(cell: number) {
        switch (cell) {
            case 0:
                return COLOR.cell_0;
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
            if (this.play && !this.isAnimation) {
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
        const value = this.getRandomInt(10) === 9 ? 4 : 2;
        if (direction === "Up") {
            const xPos = this.getRandomInt(MAX_POSITON);
            if (this.map[3][xPos] === 0) {
                this.map[3][xPos] = this.createNewCell(value, xPos, 3);
            } else {
                if (this.checkForFreeCell("Row", 3)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Down") {
            const xPos = this.getRandomInt(MAX_POSITON);
            if (this.map[MIN_POSITON][xPos] === 0) {
                this.map[MIN_POSITON][xPos] = this.createNewCell(
                    value,
                    xPos,
                    MIN_POSITON,
                );
            } else {
                if (this.checkForFreeCell("Row", 0)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Left") {
            const yPos = this.getRandomInt(MAX_POSITON);
            if (this.map[yPos][3] === 0) {
                this.map[yPos][3] = this.createNewCell(value, 3, yPos);
            } else {
                if (this.checkForFreeCell("Colm", 3)) {
                    this.createCell(direction);
                }
            }
        } else if (direction === "Right") {
            const yPos = this.getRandomInt(MAX_POSITON);
            if (this.map[yPos][MIN_POSITON] === 0) {
                this.map[yPos][MIN_POSITON] = this.createNewCell(
                    value,
                    MIN_POSITON,
                    yPos,
                );
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
            if (this.score < 1000) {
                this.setScoreCallback(`${this.score}`);
            } else if (this.score >= 1000 && this.score < 1000000) {
                this.setScoreCallback(`${this.score / 1000}K`);
            } else {
                this.setScoreCallback(`${this.score / 1000000}KК`);
            }
        }
    }

    moveCell(newPos: Positon, oldPos: Positon, mode: Direction): boolean {
        const newCell = this.map[newPos.y][newPos.x] as 0 | Cell;
        const oldCell = this.map[oldPos.y][oldPos.x] as 0 | Cell;
        // newCell === 0 && oldCell !== 0
        if (!newCell && oldCell) {
            if (!this.isCheckGameOver) {
                oldCell.updateNewPos(newPos);
                this.map[newPos.y][newPos.x] = oldCell;
                this.map[oldPos.y][oldPos.x] = 0;
            }
            return true;
            // newCell !== 0 && oldCell !== 0 && newCell === oldCell
        } else if (
            newCell &&
            oldCell &&
            newCell.value === oldCell.value &&
            newCell.newValue === oldCell.value
        ) {
            if (!this.isCheckGameOver) {
                oldCell.newTarget(newCell);
                this.updateScore(oldCell.newValue);
                newCell.collapsingTarget(oldCell);
                this.staticCellList.push(newCell);
                this.map[newPos.y][newPos.x] = oldCell;
                this.map[oldPos.y][oldPos.x] = 0;
            }
            return true;
            // (newCell === 0 | newCell !== 0) && oldCell === 0
        } else if (!oldCell) {
            if (mode === "Down") {
                if (oldPos.y > 0) {
                    oldPos.y -= 1;
                    return this.moveCell(newPos, oldPos, mode);
                }
            } else if (mode === "Up") {
                if (oldPos.y < MAX_POSITON - 1) {
                    oldPos.y += 1;
                    return this.moveCell(newPos, oldPos, mode);
                }
            } else if (mode === "Left") {
                if (oldPos.x < MAX_POSITON - 1) {
                    oldPos.x += 1;
                    return this.moveCell(newPos, oldPos, mode);
                }
            } else if (mode === "Right") {
                if (oldPos.x > 0) {
                    oldPos.x -= 1;
                    return this.moveCell(newPos, oldPos, mode);
                }
            }
        }
        return false;
    }

    moveDown(): boolean {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = MAX_POSITON - 1; y > MIN_POSITON; y--) {
                const newPos = { x: x, y: y };
                const oldPos = { x: x, y: y - 1 };
                const isMoved = this.moveCell(newPos, oldPos, "Down");
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveDown();
            }
            this.animation("Down");
            this.update();
            return true;
        }
        return isMove;
    }
    moveUp(): boolean {
        let isMove = false;
        for (let x = MIN_POSITON; x < MAX_POSITON; x++) {
            for (let y = MIN_POSITON; y < MAX_POSITON - 1; y++) {
                const newPos = { x: x, y: y };
                const oldPos = { x: x, y: y + 1 };
                const isMoved = this.moveCell(newPos, oldPos, "Up");
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveUp();
            }
            this.animation("Up");
            this.update();
            return true;
        }
        return isMove;
    }
    moveRight(): boolean {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = MAX_POSITON - 1; x > MIN_POSITON; x--) {
                const newPos = { x: x, y: y };
                const oldPos = { x: x - 1, y: y };
                const isMoved = this.moveCell(newPos, oldPos, "Right");
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveRight();
            }
            this.animation("Right");
            this.update();
            return true;
        }
        return isMove;
    }
    moveLeft(): boolean {
        let isMove = false;
        for (let y = MIN_POSITON; y < MAX_POSITON; y++) {
            for (let x = MIN_POSITON; x < MAX_POSITON - 1; x++) {
                const newPos = { x: x, y: y };
                const oldPos = { x: x + 1, y: y };
                const isMoved = this.moveCell(newPos, oldPos, "Left");
                if (isMoved) {
                    isMove = true;
                }
            }
        }
        if (!this.isCheckGameOver) {
            if (isMove) {
                return this.moveLeft();
            }
            this.animation("Left");
            this.update();
            return true;
        }
        return isMove;
    }
}

export const GameEngine = new GameClass(HEIGHT, WIDTH, PADDING);
