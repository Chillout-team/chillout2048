const WIDTH = 280;
const HEIGHT = 280;
const PADDING = 8;

export const GameLoad = (canvas: HTMLCanvasElement | null) => {
    console.log(canvas);
    if (!canvas) {
        return;
    }

    const game = new Game(WIDTH, HEIGHT, PADDING, canvas);

    // const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    // canvas.width = DPI_WIDTH;
    // canvas.height = DPI_HEIGHT;

    // const webgl = canvas.getContext("webgl");
    // if (ctx) {
    //     for (let y = 0; y < 4; y++) {
    //         for (let x = 0; x < 4; x++) {
    //             ctx.roundRect(
    //                 (DPI_BLOCK + DPI_PADDING) * x + DPI_PADDING,
    //                 (DPI_BLOCK + DPI_PADDING) * y + DPI_PADDING,
    //                 DPI_BLOCK,
    //                 DPI_BLOCK,
    //                 [26],
    //             );
    //         }
    //     }
    //     ctx.stroke();
    //     ctx.fill();
    //     ctx.strokeStyle = "#FFFFFF";
    //     ctx.fillStyle = "#FFFFFF";
    //     ctx.fillText("2", 50, 110);
    // }
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
        this.ctx.font = "normal 20px Inter";
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                this.render(
                    "#A7D6AC",
                    (this.cell.width + this.padding) * x + this.padding,
                    (this.cell.height + this.padding) * y + this.padding,
                );
            }
        }
    }
    render(color: string, xPos: number, yPos: number) {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.roundRect(xPos, yPos, this.cell.width, this.cell.height, [26]);
        this.ctx.stroke();
        this.ctx.fill();
    }
    update() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                this.render(
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
        console.log(this.map);
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
        console.log(this.map);
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
        console.log(this.map);
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
        console.log(this.map);
        return;
    }
}
