import {CanvasGrid} from "../../types/CanvasGrid";

export default abstract class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  selected: boolean = false;

  protected constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid, _draw: Function = () => {}): void {
    context.lineWidth = this.strokeWidth || 0;
    context.strokeStyle = this.strokeColor || '#000';
    context.fillStyle = this.fillColor || '#000';

    context.beginPath();

    _draw();

    context.closePath();

    this.generateGrid(canvasGrid);

    if (this.selected) {
      context.fillStyle = '#ff0000';
      context.strokeStyle = '#ff0000';
      context.lineWidth = 2;

      context.beginPath();
      context.lineTo(this.x, this.y);
      context.lineTo(this.x + this.width, this.y);
      context.lineTo(this.x + this.width, this.y + this.height);
      context.lineTo(this.x, this.y + this.height);
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

  abstract toJSON(): object;

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }
}
