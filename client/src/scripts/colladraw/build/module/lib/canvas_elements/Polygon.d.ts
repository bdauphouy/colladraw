import Shape from "./Shape";
import { CanvasGrid } from "../../types/CanvasGrid";
import { ExportShape } from "../../types/ExportCanvas";
import { PolygonTypeString } from "../enums/CanvasElementType";
export default class Polygon extends Shape {
    sidesNumber: number;
    polygonName?: PolygonTypeString;
    private coordinates;
    constructor(x: number, y: number, width: number, height: number, sidesNumber: number, polygonName?: PolygonTypeString);
    getCoordinates(startX?: number, startY?: number): number[][];
    generateGrid(canvasGrid: CanvasGrid, gridPixelMerge: number): void;
    draw(context: CanvasRenderingContext2D): void;
    toJSON(): {
        type: PolygonTypeString;
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
