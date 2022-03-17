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

type TransformationEvent = TransformationTranslateEvent | TransformationResizeEvent;

export default {
  ShapeClicked: (shape: Shape, mouseevent: MouseEvent) => new CustomEvent<{ shape: Shape, mouseevent: MouseEvent }>('shape-clicked', {
    detail: { shape, mouseevent }
  }),

  ShapeSelected: (shape: Shape) => new CustomEvent<{ shape: Shape }>('shape-selected', {
    detail: { shape }
  }),

  ShapeDeselected: (shape: Shape) => new CustomEvent<{ shape: Shape }>('shape-deselected', {
    detail: { shape }
  }),

  ShapeMoved: (shape: Shape, mouseevent: MouseEvent) => new CustomEvent<{ shape: Shape, mouseevent: MouseEvent }>('shape-moved', {
    detail: { shape, mouseevent }
  }),

  ShapeTransformed: (shape: Shape, transformation: TransformationEvent) => new CustomEvent<{ shape: Shape, transformation: TransformationEvent }>('shape-transform', {
    detail: { shape, transformation }
  }),

  ShapeCreated: (shape: Shape) => new CustomEvent<{ shape: Shape }>('shape-created', {
    detail: { shape }
  }),
}
