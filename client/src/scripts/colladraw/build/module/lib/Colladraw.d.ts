import { CanvasElementType } from "./enums/CanvasElementType";
import { CanvasGrid } from "../types/CanvasGrid";
import { ExportCanvas } from "../types/ExportCanvas";
import CanvasElement from "./canvas_elements/CanvasElement";
export default class Colladraw {
    canvas: HTMLCanvasElement;
    grid: CanvasGrid;
    context: CanvasRenderingContext2D;
    elements: CanvasElement[];
    private state;
    private onClickLocker;
    constructor(canvas: HTMLCanvasElement);
    private initGrid;
    draw(): void;
    addElement(element: CanvasElement): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(_event: MouseEvent): void;
    onClick(event: MouseEvent): void;
    changeFillColor(color: string): void;
    changeStrokeColor(color: string): void;
    changeStrokeWidth(width: number): void;
    changeToolType(type: CanvasElementType): void;
    toJSON(): ExportCanvas;
    load(json: ExportCanvas): void;
    savePNG(name?: string): void;
}
