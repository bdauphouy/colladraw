import {CanvasElementType, ShapeType} from "../lib/enums/CanvasElementType";
import Shape from "../lib/canvas_elements/Shape";
import CanvasText from "../lib/canvas_elements/CanvasText";
import CanvasElement from "../lib/canvas_elements/CanvasElement";
import Line from "../lib/canvas_elements/Line";
import {ExportCanvas} from "./ExportCanvas";

interface State {
  variables: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    toolType?: CanvasElementType;
    font?: string;
  },
  drawing?: false | {
    color?: string;
    shapeType?: ShapeType;
    shape?: Shape;
    line?: Line;
    pencil?: boolean;
    strokeWidth?: number;
    startPoint?: Point;
    endPoint?: Point;
  };
  typing?: false | {
    text?: string;
    font?: string;
    textElement?: CanvasText;
    startPoint?: Point;
    endPoint?: Point;
  };
  selectedElement?: false | CanvasElement;
  selectionTransform?: false | {
    translate?: false | {
      grip: Point;
    };
    resize?: false | {
      grip: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      // initialPosition: Point;
    };
  };
  history: {
    undo: ExportCanvas[],
    redo: ExportCanvas[],
    current?: ExportCanvas,
  };
}
