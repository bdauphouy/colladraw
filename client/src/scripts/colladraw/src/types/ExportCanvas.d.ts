import {ShapeTypeString} from "../lib/enums/ShapeType";

export interface ExportShape {
    type: ShapeTypeString | string;
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
}

export interface ExportCanvas {
    timestamp: number;
    data: {
        [key: string]: any;
        shapes: ExportShape[];
    };
}
