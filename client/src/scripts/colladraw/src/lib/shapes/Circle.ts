import Shape from "./Shape";
import {CanvasGrid} from "../../types/CanvasGrid";
import pythagore from "../utils/pythagore";

export default class Circle extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  generateGrid(canvasGrid: CanvasGrid) {
    for (let i = this.y; i <= this.y + this.width; i++) {
      for (let j = this.x; j <= this.x + this.width; j++) {
        if (pythagore(this.width / 2, this.width / 2, j - this.x, i - this.y) <= this.width / 2) {
          canvasGrid[i][j] = this;
        }
      }
    }
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    if (this.width < 0) {
      this.width = 0;
    }

    context.beginPath();
    context.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 2, 0, 2 * Math.PI, false);
    context.stroke(); // TODO: adjust according to what is in the state

    context.closePath();

    this.generateGrid(canvasGrid);

    if (this.selected) {
      context.fillStyle = '#ff0000';
      context.fillRect(this.x - 2, this.y - 2, 4, 4);
      context.fillRect(this.x - 2, this.y + this.width - 2, 4, 4);
      context.fillRect(this.x + this.width - 2, this.y - 2, 4, 4);
      context.fillRect(this.x + this.width - 2, this.y + this.width - 2, 4, 4);
      context.fillRect(this.x + this.width / 2 - 2, this.y - 2, 4, 4);
      context.fillRect(this.x + this.width / 2 - 2, this.y + this.width - 2, 4, 4);
      context.fillRect(this.x - 2, this.y + this.width / 2 - 2, 4, 4);
      context.fillRect(this.x + this.width - 2, this.y + this.width / 2 - 2, 4, 4);
      context.fillRect(this.x + this.width / 2 - 2, this.y + this.width / 2 - 2, 4, 4);
    }
  }

  get formatted() {
    return `Circle: ${this.x}, ${this.y}, ${this.width}, ${this.height}`;
  }
}
