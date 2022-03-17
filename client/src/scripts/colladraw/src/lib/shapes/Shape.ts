import {CanvasGrid} from "../../types/CanvasGrid";

export default abstract class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  strokeColor?: string;
  selected: boolean = false;

  abstract draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid): void;
  abstract generateGrid(canvasGrid: CanvasGrid): void;

  abstract get formatted(): string;

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }
}
