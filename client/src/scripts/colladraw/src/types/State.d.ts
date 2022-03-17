import {ShapeType} from "../lib/enums/ShapeType";
import Shape from "../lib/shapes/Shape";

interface State {
  variables: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    shapeType?: ShapeType;
  },
  drawing?: false | {
    color?: string;
    shapeType?: ShapeType;
    shape?: Shape;
    strokeWidth?: number;
    startPoint?: Point;
    endPoint?: Point;
  };
  selectedShape?: false | Shape;
  selectionTransform?: false | {
    translate?: false | {
      grip: Point;
    };
    resize?: false | {
      grip: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      // initialPosition: Point;
    };
  };
}
