import Shape from "./Shape";
import { CanvasGrid } from "../../types/CanvasGrid";
export default class Polygon extends Shape {
    sidesNumber: number;
    polygonName?: string;
    private coordinates;
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
}
