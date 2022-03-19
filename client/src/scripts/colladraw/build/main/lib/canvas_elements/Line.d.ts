import { CanvasGrid } from "../../types/CanvasGrid";
import { CanvasElement } from "../../index";
import { ExportLine } from "../../types/ExportCanvas";
export default class Line extends CanvasElement {
    endX: number;
    endY: number;
    color?: string;
    constructor(x: number, y: number, endX: number, endY: number);
    getCoordinates(startX?: number, startY?: number, endX?: number, endY?: number): number[][];
    generateGrid(canvasGrid: CanvasGrid, gridPixelMerge: number): void;
    draw(context: CanvasRenderingContext2D): void;
    static fromJSON(json: ExportLine): Line;
    toJSON(): ExportLine;
}
