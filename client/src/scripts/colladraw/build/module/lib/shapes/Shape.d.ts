import { CanvasGrid } from "../../types/CanvasGrid";
export default abstract class Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    selected: boolean;
    draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid, _draw?: Function): void;
    abstract generateGrid(canvasGrid: CanvasGrid): void;
    abstract toJSON(): object;
    select(): void;
    deselect(): void;
}
