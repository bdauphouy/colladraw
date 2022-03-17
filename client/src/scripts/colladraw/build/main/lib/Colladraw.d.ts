import Shape from "./shapes/Shape";
import { ShapeType } from "./enums/ShapeType";
import { CanvasGrid } from "../types/CanvasGrid";
export default class Colladraw {
    canvas: HTMLCanvasElement;
    grid: CanvasGrid;
    context: CanvasRenderingContext2D;
    shapes: Shape[];
    private state;
    private onClickLocker;
    constructor(canvas: HTMLCanvasElement);
    private initGrid;
    draw(): void;
    addShape(shape: Shape): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(_event: MouseEvent): void;
    onClick(event: MouseEvent): void;
    changeFillColor(color: string): void;
    changeStrokeColor(color: string): void;
    changeStrokeWidth(width: number): void;
    changeShapeType(type: ShapeType): void;
    toJSON(): object;
}
