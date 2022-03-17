import Shape from "./Shape";
import {CanvasGrid} from "../../types/CanvasGrid";

export default class Ellipse extends Shape {
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
        canvasGrid[i][j] = this;
      }
    }
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    if (this.width < 0) {
      this.width = 0;
    }

    super.draw(context, canvasGrid, () => {
      context.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    });
  }

  toJSON() {
    return {
      type: "Ellipse",
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    };
  }
}
