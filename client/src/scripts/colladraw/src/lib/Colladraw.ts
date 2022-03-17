import Shape from "./shapes/Shape";
import {ShapeType} from "./enums/ShapeType";
import Rectangle from "./shapes/Rectangle";
import {State} from "../types/State";
import Ellipse from "./shapes/Ellipse";
import Triangle from "./shapes/Triangle";
import {CanvasGrid} from "../types/CanvasGrid";
import AnchorConditions from "./utils/AnchorConditions";
import kebabize from "./utils/kebabize";

export default class Colladraw {
  canvas: HTMLCanvasElement;
  grid: CanvasGrid;
  context: CanvasRenderingContext2D;
  shapes: Shape[];
  private state: State = {
    variables: {},
  };
  private onClickLocker: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.shapes = [];

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('click', this.onClick.bind(this));

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.initGrid();
  }

  private initGrid() {
    this.grid = []
    for (let i = 0; i < this.canvas.width; i++) {
      this.grid.push([]);

      for (let j = 0; j < this.canvas.height; j++) {
        this.grid[i].push(null);
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.shapes.concat(this.state.drawing ? this.state.drawing.shape : []).forEach(shape => {
      if (this.state.variables.fillColor) {
        shape.fillColor = this.state.variables.fillColor;
      }

      if (this.state.variables.strokeColor) {
        shape.strokeColor = this.state.variables.strokeColor;
      }

      if (this.state.variables.strokeWidth) {
        shape.strokeWidth = this.state.variables.strokeWidth;
      }

      shape.draw(this.context, this.grid);
    });
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  onMouseDown(event: MouseEvent) {
    if (!this.state.selectedShape) {
      this.onClickLocker = true;

      const x = event.clientX - this.canvas.offsetLeft;
      const y = event.clientY - this.canvas.offsetTop;

      this.state = {
        ...this.state,
        drawing: {
          ...this.state.drawing,
          color: '#000',
          strokeWidth: 1,
          shapeType: this.state.variables.shapeType ?? ShapeType.RECTANGLE,
          startPoint: {
            x: event.offsetX,
            y: event.offsetY,
          },
        },
      }

      if (this.state.drawing) {
        let shape: Shape;

        switch (this.state.drawing?.shapeType) {
          case ShapeType.RECTANGLE:
            shape = new Rectangle(x, y, 0, 0);
            break;
          case ShapeType.ELLIPSE:
            shape = new Ellipse(x, y, 0, 0);
            break;
          case ShapeType.TRIANGLE:
            shape = new Triangle(x, y, 0, 0);
            break;
          default:
            shape = new Rectangle(x, y, 0, 0);
            break;
        }

        shape.strokeColor = '#000';

        this.state = {
          ...this.state,
          drawing: {
            ...this.state.drawing,
            shape,
          },
        };
      }
    } else {
      const gripMargin = 10;

      let anchorFound = false;
      Object.entries(AnchorConditions).forEach(([anchorConditionName, anchorCondition]) => {
        if (!anchorFound && anchorCondition(this.grid, gripMargin, event)) {
          this.state = {
            ...this.state,
            selectionTransform: {
              resize: {
                grip: kebabize(anchorConditionName),
              }
            }
          };

          anchorFound = true;
        }
      })

      if (!anchorFound && this.grid[event.offsetX][event.offsetY] === this.state.selectedShape) {
        this.state = {
          ...this.state,
          selectionTransform: {
            translate: {
              grip: {
                x: event.offsetX - this.state.selectedShape.x,
                y: event.offsetY - this.state.selectedShape.y,
              },
            },
          },
        };
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.state.selectedShape) {
      if (this.state.drawing) {
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;

        this.state = {
          ...this.state,
          drawing: {
            ...this.state.drawing,
            endPoint: {x, y},
          },
        }

        if (this.state.drawing && this.state.drawing.shape) {
          this.state.drawing.shape.width = this.state.drawing.endPoint.x - this.state.drawing.startPoint.x;
          this.state.drawing.shape.height = this.state.drawing.endPoint.y - this.state.drawing.startPoint.y;

        //   if (this.state.drawing.shape.width < 0) {
        //     this.state.drawing.shape.width = Math.abs(this.state.drawing.shape.width);
        //     [this.state.drawing.startPoint.x, this.state.drawing.endPoint.x] = [this.state.drawing.endPoint.x, this.state.drawing.startPoint.x];
        //     this.state.drawing.shape.x = this.state.drawing.startPoint.x;
        //   }
        //
        //   if (this.state.drawing.shape.height < 0) {
        //     this.state.drawing.shape.height = Math.abs(this.state.drawing.shape.height);
        //     [this.state.drawing.startPoint.y, this.state.drawing.endPoint.y] = [this.state.drawing.endPoint.y, this.state.drawing.startPoint.y];
        //     this.state.drawing.shape.y = this.state.drawing.startPoint.y;
        //   }
        }
      }
    } else if (this.state.selectionTransform) {
      if (this.state.selectionTransform.translate) {
        this.state.selectedShape.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
        this.state.selectedShape.y = event.offsetY - this.state.selectionTransform.translate.grip.y;
      } else if (this.state.selectionTransform.resize) {
        if (this.state.selectionTransform.resize.grip === 'top-left') {
          this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
          this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
          this.state.selectedShape.x = event.offsetX;
          this.state.selectedShape.y = event.offsetY;
        } else if (this.state.selectionTransform.resize.grip === 'top-right') {
          this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
          this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
          this.state.selectedShape.y = event.offsetY;
        } else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
          this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
          this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
          this.state.selectedShape.x = event.offsetX;
        } else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
          this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
          this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
        } else if (this.state.selectionTransform.resize.grip === 'top') {
          this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
          this.state.selectedShape.y = event.offsetY;
        } else if (this.state.selectionTransform.resize.grip === 'right') {
          this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
        } else if (this.state.selectionTransform.resize.grip === 'bottom') {
          this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
        } else if (this.state.selectionTransform.resize.grip === 'left') {
          this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
          this.state.selectedShape.x = event.offsetX;
        }
      }
    }

    if (Object.values(this.state).some(value => value)) {
      this.draw();
    }
  }

  onMouseUp(_event: MouseEvent) {
    if (this.state.drawing && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
      this.addShape(this.state.drawing.shape);
    } else if (this.state.selectionTransform) {
      this.initGrid();
      this.shapes.forEach(shape => {
        shape.generateGrid(this.grid);
      });
    }

    this.state.drawing = false;
    this.state.selectionTransform = false;
    this.onClickLocker = false;
  }

  onClick(event: MouseEvent) {
    if (!this.state.drawing && !this.onClickLocker) {
      const clickedShape = this.grid[event.offsetX][event.offsetY];

      if (clickedShape && (!this.state.selectedShape || this.state.selectedShape == clickedShape)) {
        clickedShape.select();
        this.state.selectedShape = clickedShape;
        this.draw();
      } else {
        if (this.state.selectedShape) {
          this.state.selectedShape.deselect()
        }
        this.state.selectedShape = false;
        this.draw();
      }
    }
  }

  changeFillColor(color: string) {
    this.state.variables.fillColor = color;
  }

  changeStrokeColor(color: string) {
    this.state.variables.strokeColor = color;
  }

  changeStrokeWidth(width: number) {
    this.state.variables.strokeWidth = width;
  }

  changeShapeType(type: ShapeType) {
    this.state.variables.shapeType = type;
  }

  get formatted() {
    return this.shapes.map(shape => shape.formatted).join('\n');
  }
}
