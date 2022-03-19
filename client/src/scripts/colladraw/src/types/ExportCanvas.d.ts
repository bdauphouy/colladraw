import {CanvasElementTypeString} from "../lib/enums/CanvasElementType";

export interface ExportShape {
    type: Exclude<CanvasElementTypeString, 'Text'>;
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
}

export interface ExportCanvasText {
    type: 'Text';
    x: number;
    y: number;
    text: string;
    font: string;
    color: string;
}

export interface ExportLine {
   type: 'Line';
   x: number;
   y: number;
   endX: number;
   endY: number;
   color: string;
}

export type ExportCanvasElement = ExportShape | ExportCanvasText | ExportLine;

export interface ExportCanvas {
    timestamp: number;
    data: {
        [key: string]: any;
        canvas: {
          elements: ExportCanvasElement[];
        }[];
    };
}
