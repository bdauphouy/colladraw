export default abstract class Shape {
  x: number;
  y: number;
  width: number;
  height: number;

  abstract draw(context: CanvasRenderingContext2D): void;

  abstract get formatted(): string;
}
