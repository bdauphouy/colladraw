import {CanvasGrid} from "../../types/CanvasGrid";
import {CanvasElement} from "../../index";
import {ExportLine} from "../../types/ExportCanvas";

export default class Line extends CanvasElement {
  endX: number;
  endY: number;
  color?: string;

  constructor(x: number, y: number, endX: number, endY: number) {
    super(x, y, 0, 0);
    this.endX = endX;
    this.endY = endY;
  }

  getCoordinates(startX: number = this.x, startY: number = this.y, endX: number = this.endX, endY: number = this.endY): number[][] {
    return [
      [startX, startY],
      [endX, endY]
    ];
  }

  generateGrid(canvasGrid: CanvasGrid) {
    for (let i = Math.min(this.y, this.endY); i <= Math.max(this.y, this.endY); i++) {
      for (let j = Math.min(this.x, this.endX); j <= Math.max(this.x, this.endX); j++) {
        canvasGrid[i][j] = this;
      }
    }
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    this.width = Math.abs(this.x - this.endX);
    this.height = Math.abs(this.y - this.endY);

    context.strokeStyle = this.color || '#000';

    context.beginPath();

    context.moveTo(this.x, this.y);
    context.lineTo(this.endX, this.endY);
    context.lineWidth = 10;
    context.stroke();

    context.closePath();

    this.generateGrid(canvasGrid);

    super.draw(context, canvasGrid);
  }

  static fromJSON(json: ExportLine): Line {
    const line = new Line(json.x, json.y, json.endX, json.endY);
    line.color = json.color;
    return line;
  }

  toJSON(): ExportLine {
    return {
      type: 'Line',
      x: this.x,
      y: this.y,
      endX: this.endX,
      endY: this.endY,
      color: this.color
    };
  }
}
