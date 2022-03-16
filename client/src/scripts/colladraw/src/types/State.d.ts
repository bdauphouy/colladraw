import {ShapeType} from "../lib/enums/ShapeType";
import Shape from "../lib/shapes/Shape";

interface State {
  drawing?: false | {
    color?: string;
    shapeType?: ShapeType;
    shape?: Shape;
    strokeWidth?: number;
    startPoint?: Point;
    endPoint?: Point;
  };
}
