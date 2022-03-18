import {CanvasGrid} from "../../types/CanvasGrid";
import {ExportCanvasElement} from "../../types/ExportCanvas";

export default abstract class CanvasElement {
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean = false;

  protected constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    this.generateGrid(canvasGrid);

    if (this.selected) {
      context.fillStyle = '#ff0000';
      context.strokeStyle = '#ff0000';
      context.lineWidth = 2;

      context.moveTo(this.x, this.y);
      context.beginPath();
      context.lineTo(this.x, this.y);
      context.lineTo(this.x + this.width, this.y);
      context.lineTo(this.x + this.width, this.y + this.height);
      context.lineTo(this.x, this.y + this.height);
      context.lineTo(this.x, this.y);
      context.stroke();
      context.closePath();

      const anchorSize = 6;

      context.fillRect(this.x - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
      context.fillRect(this.x + this.width / 2 - (anchorSize / 2), this.y + this.height / 2 - (anchorSize / 2), anchorSize, anchorSize);
    }
  }

  abstract generateGrid(canvasGrid: CanvasGrid): void;

  abstract toJSON(): ExportCanvasElement;
  static fromJSON(_json: ExportCanvasElement): CanvasElement {
    throw new Error('Not implemented');
  };

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }
}
