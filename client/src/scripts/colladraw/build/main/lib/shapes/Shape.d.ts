import { CanvasGrid } from "../../types/CanvasGrid";
import { ExportShape } from "../../types/ExportCanvas";
export default abstract class Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    selected: boolean;
    protected constructor(x: number, y: number, width: number, height: number);
    draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid, _draw?: Function): void;
    abstract generateGrid(canvasGrid: CanvasGrid): void;
    abstract toJSON(): ExportShape;
    static fromJSON(_json: ExportShape): Shape;
    select(): void;
    deselect(): void;
}
