const WIDTH = 280;
const HEIGHT = 280;
const PADDING = 8;

export const GameLoad = (canvas: HTMLCanvasElement | null) => {
    console.log(canvas);
    if (!canvas) {
        return;
    }
    const game = new Game(WIDTH, HEIGHT, PADDING, canvas);
};

class Game {
    height: number;
    windth: number;
    padding: number;
    ctx: CanvasRenderingContext2D;
    cell: Record<string, number>;
    map: number[][];
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
            height: (this.height - this.padding * 5) / 4,
            width: (this.windth - this.padding * 5) / 4,
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
        this.control();
    }
    init() {
        for (let i = 0; i < 2; i++) {
            this.createRandomCell();
        }

        this.update();
    }

    createRandomCell() {
        const y = this.getRandomInt(4);
        const x = this.getRandomInt(4);
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
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
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
    }
    control() {
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
        console.log(randomInt);
        return randomInt;
    }

    check(mode: string, positon: number): boolean {
        if (mode === "Row") {
            for (let x = 0; x < 4; x++) {
                if (!this.map[positon][x]) {
                    console.log(true);
                    return true;
                }
            }
            console.log(false);
            return false;
        } else {
            for (let y = 0; y < 4; y++) {
                if (!this.map[y][positon]) {
                    console.log(true);
                    return true;
                }
            }
            console.log(false);
            return false;
        }
    }

    createCell(positon: string) {
        const Cell = this.getRandomInt(10) === 9 ? 4 : 2;
        if (positon === "Up") {
            const xPos = this.getRandomInt(4);
            if (this.map[3][xPos] === 0) {
                this.map[3][xPos] = Cell;
            } else {
                if (this.check("Row", 3)) {
                    this.createCell(positon);
                } else {
                    console.log("U lose");
                }
            }
        } else if (positon === "Down") {
            const xPos = this.getRandomInt(4);
            if (this.map[0][xPos] === 0) {
                this.map[0][xPos] = Cell;
            } else {
                if (this.check("Row", 0)) {
                    this.createCell(positon);
                } else {
                    console.log("U lose");
                }
            }
        } else if (positon === "Left") {
            const yPos = this.getRandomInt(4);
            if (this.map[yPos][3] === 0) {
                this.map[yPos][3] = Cell;
            } else {
                if (this.check("Colm", 3)) {
                    this.createCell(positon);
                } else {
                    console.log("U lose");
                }
            }
        } else if (positon === "Right") {
            const yPos = this.getRandomInt(4);
            if (this.map[yPos][0] === 0) {
                this.map[yPos][0] = Cell;
            } else {
                if (this.check("Colm", 0)) {
                    this.createCell(positon);
                } else {
                    console.log("U lose");
                }
            }
        }
    }

    moveDown(): void {
        let isMove = false;
        for (let x = 0; x < 4; x++) {
            for (let y = 2; y >= 0; y--) {
                if (this.map[y][x] > 0) {
                    if (this.map[y + 1][x] === 0) {
                        this.map[y + 1][x] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y + 1][x] === this.map[y][x]) {
                        this.map[y + 1][x] += this.map[y][x];
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
        for (let x = 0; x < 4; x++) {
            for (let y = 1; y < 4; y++) {
                if (this.map[y][x] > 0) {
                    if (this.map[y - 1][x] === 0) {
                        this.map[y - 1][x] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y - 1][x] === this.map[y][x]) {
                        this.map[y - 1][x] += this.map[y][x];
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
        for (let y = 0; y < 4; y++) {
            for (let x = 2; x >= 0; x--) {
                if (this.map[y][x] > 0) {
                    if (this.map[y][x + 1] === 0) {
                        this.map[y][x + 1] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y][x + 1] === this.map[y][x]) {
                        this.map[y][x + 1] += this.map[y][x];
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
        for (let y = 0; y < 4; y++) {
            for (let x = 1; x < 4; x++) {
                if (this.map[y][x] > 0) {
                    if (this.map[y][x - 1] === 0) {
                        this.map[y][x - 1] = this.map[y][x];
                        this.map[y][x] = 0;
                        isMove = true;
                    } else if (this.map[y][x - 1] === this.map[y][x]) {
                        this.map[y][x - 1] += this.map[y][x];
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
