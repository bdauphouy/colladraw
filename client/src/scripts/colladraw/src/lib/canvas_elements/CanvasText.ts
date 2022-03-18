import CanvasElement from "./CanvasElement";
import {CanvasGrid} from "../../types/CanvasGrid";
import {ExportCanvasElement, ExportCanvasText} from "../../types/ExportCanvas";

export default class CanvasText extends CanvasElement {
  text: string;
  font: string;
  color: string;

  constructor(
    text: string,
    x: number,
    y: number,
    font: string,
  ) {
    super(x, y);
    this.text = text;
    this.font = font;
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    context.font = this.font;
    context.fillStyle = this.color;

    this.width = context.measureText(this.text).width;
    this.height = parseInt(this.font.match(/\d+/)[0] ?? '20');

    context.fillText(this.text, this.x, this.y);

    this.generateGrid(canvasGrid);

    if (this.selected) {
      context.fillStyle = '#ff0000';
      context.strokeStyle = '#ff0000';
      context.lineWidth = 2;
      context.moveTo(this.x, this.y + 3);

      context.beginPath();
      context.lineTo(this.x, this.y + 3);
      context.lineTo(this.x + this.width, this.y + 3);
      context.stroke();
      context.closePath();
    }
  }

  generateGrid(canvasGrid: CanvasGrid) {
    for (let i = this.y - this.height; i <= this.y; i++) {
      for (let j = this.x; j <= this.x + this.width; j++) {
        canvasGrid[i][j] = this;
      }
    }
  }

  toJSON(): ExportCanvasElement {
    return {
      type: "Text",
      x: this.x,
      y: this.y,
      text: this.text,
      font: this.font,
      color: this.color,
    };
  }

  static fromJSON(json: ExportCanvasText) {
    const text = new CanvasText(
      json.text,
      json.x,
      json.y,
      json.font,
    );
    text.color = json.color;
    return text;
  }
}
