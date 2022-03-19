import Shape from "./Shape";
import { CanvasGrid } from "../../types/CanvasGrid";
import { ExportShape } from "../../types/ExportCanvas";
export default class Ellipse extends Shape {
    constructor(x: number, y: number, width: number, height: number);
    generateGrid(canvasGrid: CanvasGrid, gridPixelMerge: number): void;
    draw(context: CanvasRenderingContext2D): void;
    toJSON(): {
        type: "Ellipse";
        x: number;
        y: number;
        width: number;
        height: number;
        fillColor: string;
        strokeColor: string;
        strokeWidth: number;
    };
    static fromJSON(json: ExportShape): Ellipse;
}
