import CanvasElement from "./CanvasElement";

export default abstract class Shape extends CanvasElement {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;

  protected constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D, _draw: Function = () => {}): void {
    context.lineWidth = this.strokeWidth || 0;
    context.strokeStyle = this.strokeColor || '#000';
    context.fillStyle = this.fillColor || '#000';

    context.beginPath();

    _draw();

    context.closePath();

    super.draw(context);
  }
}
