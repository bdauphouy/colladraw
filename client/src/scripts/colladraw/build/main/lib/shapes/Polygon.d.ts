import Shape from "./Shape";
import { CanvasGrid } from "../../types/CanvasGrid";
import { ExportShape } from "../../types/ExportCanvas";
export default class Polygon extends Shape {
    sidesNumber: number;
    polygonName?: string;
    private coordinates;
    constructor(x: number, y: number, width: number, height: number, sidesNumber: number, polygonName?: string);
    getCoordinates(startX?: number, startY?: number): number[][];
    generateGrid(canvasGrid: CanvasGrid): void;
    draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid): void;
    toJSON(): {
        type: string;
        x: number;
        y: number;
        width: number;
        height: number;
        fillColor: string;
        strokeColor: string;
        strokeWidth: number;
    };
    static fromJSON(json: ExportShape): Polygon;
}
