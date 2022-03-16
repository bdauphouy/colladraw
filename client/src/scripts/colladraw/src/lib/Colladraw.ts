import Shape from "./shapes/Shape";
import {ShapeType} from "./enums/ShapeType";
import Rectangle from "./shapes/Rectangle";
import {State} from "../types/State";
import Circle from "./shapes/Circle";

export default class Colladraw {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  shapes: Shape[];
  private _state: State = {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.shapes = [];

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    [...this.shapes, this._state.drawing && this._state.drawing.shape].forEach(shape => {
      shape.draw(this.context);
    });
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  onMouseDown(event: MouseEvent) {
    const x = event.clientX - this.canvas.offsetLeft;
    const y = event.clientY - this.canvas.offsetTop;

    this._state = {
      ...this._state,
      drawing: {
        ...this._state.drawing,
        color: '#000',
        strokeWidth: 1,
        shapeType: ShapeType.RECTANGLE,
        startPoint: {
          x: event.offsetX,
          y: event.offsetY,
        },
      },
    }

    if (this._state.drawing) {
      let shape: Shape;

      switch (this._state.drawing?.shapeType) {
        case ShapeType.RECTANGLE:
          shape = new Rectangle(x, y, 0, 0);
          break;
        case ShapeType.CIRCLE:
          shape = new Circle(x, y, 0, 0);
          break;
        default:
          shape = new Rectangle(x, y, 0, 0);
          break;
      }

      this._state = {
        ...this._state,
        drawing: {
          ...this._state.drawing,
          shape,
        },
      };
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this._state.drawing) {
      this._state = {
        ...this._state,
        drawing: {
          ...this._state.drawing,
          endPoint: {
            x: event.offsetX,
            y: event.offsetY,
          },
        },
      }

      if (this._state.drawing && this._state.drawing.shape) {
        this._state.drawing.shape.width = this._state.drawing.endPoint.x - this._state.drawing.startPoint.x;
        this._state.drawing.shape.height = this._state.drawing.endPoint.y - this._state.drawing.startPoint.y;
      }

      this.draw();
    }
  }

  onMouseUp(_event: MouseEvent) {
    if (this._state.drawing) {
      this.addShape(this._state.drawing.shape);
    }
    this._state.drawing = false;
  }

  get formatted() {
    return this.shapes.map(shape => shape.formatted).join('\n');
  }
}
