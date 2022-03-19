export enum CanvasElementType {
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  TRIANGLE = 'triangle',
  POLYGON = 'polygon',
  TEXT = 'text',
  LINE = 'line',
  PENCIL = 'pencil',
  ERASER = 'eraser',
}

export type ShapeType = Exclude<CanvasElementType, CanvasElementType.TEXT>;
export type PolygonTypeString = 'Rectangle' | 'Triangle' | `Polygon[${number}]` | 'Line';
export type CanvasElementTypeString = PolygonTypeString | 'Ellipse' | 'Text' | 'Pencil' | 'Eraser';
