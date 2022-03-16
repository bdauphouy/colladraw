import Shape from "./Shape";

export default class Circle extends Shape {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x - this.width / 2, this.y - this.height / 2, this.width, 0, 2 * Math.PI, false);
    context.stroke(); // TODO: adjust according to what is in the state

    context.closePath();
  }

  get formatted() {
    return `Circle: ${this.x}, ${this.y}, ${this.width}, ${this.height}`;
  }
}
