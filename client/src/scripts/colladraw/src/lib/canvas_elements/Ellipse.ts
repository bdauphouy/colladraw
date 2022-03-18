import Shape from "./Shape";
import {CanvasGrid} from "../../types/CanvasGrid";
import {ExportShape} from "../../types/ExportCanvas";

export default class Ellipse extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }

  generateGrid(canvasGrid: CanvasGrid) {
    for (let i = this.y; i <= this.y + this.height; i++) {
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
      type: 'Ellipse' as 'Ellipse',
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    };
  }

  static fromJSON(json: ExportShape): Ellipse {
    const ellipse = new Ellipse(json.x, json.y, json.width, json.height);
    ellipse.fillColor = json.fillColor;
    ellipse.strokeColor = json.strokeColor;
    ellipse.strokeWidth = json.strokeWidth;
    return ellipse;
  }
}
