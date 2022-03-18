export declare enum CanvasElementType {
    RECTANGLE = "rectangle",
    ELLIPSE = "ellipse",
    TRIANGLE = "triangle",
    POLYGON = "polygon",
    TEXT = "text"
}
export declare type ShapeType = Exclude<CanvasElementType, CanvasElementType.TEXT>;
export declare type PolygonTypeString = 'Rectangle' | 'Triangle' | `Polygon[${number}]`;
export declare type CanvasElementTypeString = PolygonTypeString | 'Ellipse' | 'Text';
