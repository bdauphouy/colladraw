import Shape from "../shapes/Shape";
interface TransformationTranslateEvent {
    type: 'translate';
    x: number;
    y: number;
    oldX: number;
    oldY: number;
}
interface TransformationResizeEvent {
    type: 'resize';
    x: number;
    y: number;
    width: number;
    height: number;
    oldX: number;
    oldY: number;
    oldWidth: number;
    oldHeight: number;
}
declare type TransformationEvent = TransformationTranslateEvent | TransformationResizeEvent;
declare const _default: {
    ShapeClicked: (shape: Shape, mouseevent: MouseEvent) => CustomEvent<{
        shape: Shape;
        mouseevent: MouseEvent;
    }>;
    ShapeSelected: (shape: Shape) => CustomEvent<{
        shape: Shape;
    }>;
    ShapeDeselected: (shape: Shape) => CustomEvent<{
        shape: Shape;
    }>;
    ShapeMoved: (shape: Shape, mouseevent: MouseEvent) => CustomEvent<{
        shape: Shape;
        mouseevent: MouseEvent;
    }>;
    ShapeTransformed: (shape: Shape, transformation: TransformationEvent) => CustomEvent<{
        shape: Shape;
        transformation: TransformationEvent;
    }>;
    ShapeCreated: (shape: Shape) => CustomEvent<{
        shape: Shape;
    }>;
};
export default _default;
