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
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                this.render(
                    this.map[y][x],
                    "#A7D6AC",
                    (this.cell.width + this.padding) * x + this.padding,
                    (this.cell.height + this.padding) * y + this.padding,
                );
            }
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
            this.ctx.fillStyle = "#ddf4e0";
            if (numCell < 10) {
                this.ctx.font = "normal 70px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 40, yPos + 85);
            } else if (numCell < 100 && numCell > 10) {
                this.ctx.font = "normal 60px Inter";
                this.ctx.fillText(`${numCell}`, xPos + 30, yPos + 80);
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
                    `rgb(${155 - this.map[y][x]}, ${
                        220 - this.map[y][x] * 15
                    }, 160)`,
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
        return Math.floor(Math.random() * max);
    }

    createCell(positon: string) {
        console.log(this.map);
        switch (positon) {
            case "Up":
                this.map[3][this.getRandomInt(4)] = 2;
                break;
            case "Down":
                this.map[0][this.getRandomInt(4)] = 2;
                break;
            case "Left":
                this.map[this.getRandomInt(4)][3] = 2;
                break;
            case "Right":
                this.map[this.getRandomInt(4)][0] = 2;
                break;
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