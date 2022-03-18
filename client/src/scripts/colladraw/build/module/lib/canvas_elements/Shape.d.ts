import { CanvasGrid } from "../../types/CanvasGrid";
import CanvasElement from "./CanvasElement";
export default abstract class Shape extends CanvasElement {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    protected constructor(x: number, y: number, width: number, height: number);
    draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid, _draw?: Function): void;
}
