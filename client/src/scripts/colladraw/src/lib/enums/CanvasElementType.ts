export enum CanvasElementType {
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  TRIANGLE = 'triangle',
  POLYGON = 'polygon',
  TEXT = 'text',
}

export type ShapeType = Exclude<CanvasElementType, CanvasElementType.TEXT>;
export type PolygonTypeString = 'Rectangle' | 'Triangle' | `Polygon[${number}]`;
export type CanvasElementTypeString = PolygonTypeString | 'Ellipse' | 'Text';
