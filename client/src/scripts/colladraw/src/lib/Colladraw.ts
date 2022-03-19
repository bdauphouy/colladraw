import Shape from "./canvas_elements/Shape";
import {CanvasElementType} from "./enums/CanvasElementType";
import Rectangle from "./canvas_elements/Rectangle";
import {State} from "../types/State";
import Ellipse from "./canvas_elements/Ellipse";
import Triangle from "./canvas_elements/Triangle";
import {CanvasGrid} from "../types/CanvasGrid";
import AnchorConditions from "./utils/AnchorConditions";
import kebabize from "./utils/kebabize";
import {ExportCanvas, ExportLine, ExportShape} from "../types/ExportCanvas";
import Polygon from "./canvas_elements/Polygon";
import CanvasEvents from "./events/CanvasEvents";
import CanvasElement from "./canvas_elements/CanvasElement";
import CanvasText from "./canvas_elements/CanvasText";
import Line from "./canvas_elements/Line";
import ResizeFunctions from "./utils/ResizeFunctions";

export default class Colladraw {
  canvas: HTMLCanvasElement;
  grid: CanvasGrid;
  context: CanvasRenderingContext2D;
  elements: CanvasElement[];
  private state: State = {
    variables: {},
    history: {
      undo: [],
      redo: [],
    },
  };
  private onClickLocker: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    document.head.appendChild(document.createElement("script")).src = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";

    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.elements = [];

    this.addToHistory();

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (this.state.selectedElement) {
          this.removeElement(this.state.selectedElement);
          this.draw();
          this.state.selectedElement.deselect();
          this.state.selectedElement = false;
          this.state.selectionTransform = false;
        }
      }

      if (e.key === 'z' && e.ctrlKey) {
        this.undo();
      }

      if (e.key === 'y' && e.ctrlKey) {
        this.redo();
      }
    });

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

    const elementsToDraw = this.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? this.state.drawing.shape ?? this.state.drawing.line : []);

    if (elementsToDraw.length > 0) {
      elementsToDraw.forEach(element => {
        if (element instanceof Shape) {
          if (this.state.variables.fillColor) {
            element.fillColor = this.state.variables.fillColor;
          }

          if (this.state.variables.strokeColor) {
            element.strokeColor = this.state.variables.strokeColor;
          }

          if (this.state.variables.strokeWidth) {
            element.strokeWidth = this.state.variables.strokeWidth;
          }
        } else if (element instanceof CanvasText) {
          if (this.state.variables.fillColor) {
            element.color = this.state.variables.fillColor;
          }

          if (this.state.variables.font) {
            element.font = this.state.variables.font;
          }
        }

        element.draw(this.context, this.grid);
      });
    } else {
      this.initGrid();
    }
  }

  addElement(element: CanvasElement, toAddToHistory: boolean = true) {
    this.canvas.dispatchEvent(CanvasEvents.CanvasElementCreated(element));
    this.elements.push(element);

    if (toAddToHistory) {
      this.addToHistory();
    }
  }

  removeElement(elementToDelete: CanvasElement) {
    this.elements = this.elements.filter(element => element !== elementToDelete);
    this.addToHistory();
  }

  addToHistory() {
    this.state.history.current = {
      timestamp: Date.now(),
      data: {
        shapes: this.elements.map(shape => shape.toJSON()),
      },
    };
    this.state.history.undo.push(this.state.history.current);
  }

  undo() {
    this.state.history.redo.push(this.state.history.current);
    this.state.history.current = this.state.history.undo.pop();
    if (this.state.history.current) {
      this.load(this.state.history.current);
    }
    this.draw();
  }

  redo() {
    this.state.history.undo.push(this.state.history.current);
    this.state.history.current = this.state.history.redo.pop();
    if (this.state.history.current) {
      this.load(this.state.history.current);
    }
    this.draw();
  }

  onMouseDown(event: MouseEvent) {
    const clickedShape = this.grid[event.offsetY][event.offsetX];

    if (!clickedShape && !this.state.selectedElement) {
      this.onClickLocker = true;

      const x = event.clientX - this.canvas.offsetLeft;
      const y = event.clientY - this.canvas.offsetTop;
      // const toolType: CanvasElementType = CanvasElementType.TEXT;
      const toolType: CanvasElementType = this.state.variables.toolType ?? CanvasElementType.PENCIL;

      this.state = {
        ...this.state,
        variables: {toolType},
        // @ts-ignore
        typing: toolType === CanvasElementType.TEXT ? {
          ...this.state.typing,
          text: 'Hello World',
          font: '20px Arial',
        } : false,
        // @ts-ignore
        drawing: toolType != CanvasElementType.TEXT ? {
          ...this.state.drawing,
          color: '#000',
          strokeWidth: 1,
          startPoint: {
            x: event.offsetX,
            y: event.offsetY,
          },
        } : false,
      }

      if (this.state.variables.toolType) {
        let element: CanvasElement;

        switch (this.state.variables.toolType) {
          case CanvasElementType.RECTANGLE:
            element = new Rectangle(x, y, 0, 0);
            break;
          case CanvasElementType.ELLIPSE:
            element = new Ellipse(x, y, 0, 0);
            break;
          case CanvasElementType.TRIANGLE:
            element = new Triangle(x, y, 0, 0);
            break;
          case CanvasElementType.LINE:
            element = new Line(x, y, 0, 0);
            break;
          case CanvasElementType.TEXT:
            element = new CanvasText('Hello world', x, y, this.state.variables.font ?? '12px Arial');
            element.y += parseInt((element as CanvasText).font.match(/\d+/)[0] ?? '20');
            break;
          case CanvasElementType.PENCIL:
            if (this.state.drawing) this.state.drawing.pencil = true;
            break;
          default:
            element = new Rectangle(x, y, 0, 0);
            break;
        }

        if (element instanceof Shape || element instanceof Line) {
          if (element instanceof Shape) {
            element.strokeColor = '#000';
          } else if (element instanceof Line) {
            element.color = '#000';
          }

          this.state = {
            ...this.state,
            drawing: {
              ...this.state.drawing,
              shape: element instanceof Shape ? element : undefined,
              line: element instanceof Line ? element : undefined,
            },
          };
        } else if (element instanceof CanvasText) {
          element.color = '#000';

          this.state = {
            ...this.state,
            typing: {
              ...this.state.typing,
              text: element.text,
              textElement: element,
            },
          };

          this.draw();
        }
      }
    } else {
      const gripMargin = 10;

      let anchorFound = false;
      Object.entries(AnchorConditions).forEach(([anchorConditionName, anchorCondition]) => {
        if (!anchorFound && !(this.state.selectedElement instanceof CanvasText) && anchorCondition(this.grid, gripMargin, event)) {
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

      if (!anchorFound && this.grid[event.offsetY][event.offsetX] === this.state.selectedElement) {
        this.state = {
          ...this.state,
          selectionTransform: {
            translate: {
              grip: {
                x: event.offsetX - this.state.selectedElement.x,
                y: event.offsetY - this.state.selectedElement.y,
              },
            },
          },
        };
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.state.selectedElement) {
      const x = event.clientX - this.canvas.offsetLeft;
      const y = event.clientY - this.canvas.offsetTop;

      if (this.state.drawing && this.state.drawing.pencil) {
        const point = new Rectangle(x, y, 5, 5);
        point.selectable = false;
        this.addElement(point, false);
      } else if (this.state.drawing) {
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
          this.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.shape, event));

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
        } else if (this.state.drawing && this.state.drawing.line) {
          this.state.drawing.line.endX = this.state.drawing.endPoint.x;
          this.state.drawing.line.endY = this.state.drawing.endPoint.y;
          this.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.line, event));
        }
      }
    } else if (this.state.selectionTransform) {
      if (this.state.selectionTransform.translate) {
        const oldX = this.state.selectedElement.x;
        const oldY = this.state.selectedElement.y;

        this.state.selectedElement.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
        this.state.selectedElement.y = event.offsetY - this.state.selectionTransform.translate.grip.y;

        if (this.state.selectedElement instanceof Line) {
          this.state.selectedElement.endX = this.state.selectedElement.endX + (this.state.selectedElement.x - oldX);
          this.state.selectedElement.endY = this.state.selectedElement.endY + (this.state.selectedElement.y - oldY);
        }

        this.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.selectedElement, event));
        this.canvas.dispatchEvent(CanvasEvents.CanvasElementTransformed(this.state.selectedElement, {
          type: 'translate',
          x: this.state.selectionTransform.translate.grip.x,
          y: this.state.selectionTransform.translate.grip.y,
          oldX,
          oldY,
        }));
      } else if (this.state.selectionTransform.resize) {
        const oldX = this.state.selectedElement.x;
        const oldY = this.state.selectedElement.y;
        const oldWidth = this.state.selectedElement.width;
        const oldHeight = this.state.selectedElement.height;

        if (this.state.selectionTransform.resize.grip === 'top-left') {
          ResizeFunctions.topLeft(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'top-right') {
          ResizeFunctions.topRight(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
          ResizeFunctions.bottomLeft(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
          ResizeFunctions.bottomRight(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'top') {
          ResizeFunctions.top(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'right') {
          ResizeFunctions.right(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'bottom') {
          ResizeFunctions.bottom(this.state, event);
        } else if (this.state.selectionTransform.resize.grip === 'left') {
          ResizeFunctions.left(this.state, event);
        }

        this.canvas.dispatchEvent((CanvasEvents.CanvasElementTransformed(this.state.selectedElement, {
          type: 'resize',
          x: this.state.selectedElement.x,
          y: this.state.selectedElement.y,
          width: this.state.selectedElement.width,
          height: this.state.selectedElement.height,
          oldX,
          oldY,
          oldWidth,
          oldHeight,
        })));
      }
    }

    // if (this.state.selectionTransform || this.state.selectedShape || this.state.typing || this.state.typing) {
    if (Object.values(this.state).some(value => value)) {
      this.draw();
    }
  }

  onMouseUp(_event: MouseEvent) {
    if (this.state.drawing && this.state.drawing.shape && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
      this.addElement(this.state.drawing.shape);
    } else if (this.state.drawing && this.state.drawing.line) {
      this.addElement(this.state.drawing.line);
    } else if (this.state.drawing && this.state.drawing.pencil) {
      this.addToHistory();
    } else if (this.state.typing) {
      this.addElement(this.state.typing.textElement);
    } else if (this.state.selectionTransform) {
      this.initGrid();
      this.elements.forEach(shape => {
        shape.generateGrid(this.grid);
      });
    }

    this.state.drawing = false;
    this.state.typing = false;
    this.state.selectionTransform = false;
    this.onClickLocker = false;
  }

  onClick(event: MouseEvent) {
    const clickedElement = this.grid[event.offsetY][event.offsetX];

    if (clickedElement) {
      if (clickedElement.selectable) {
        this.canvas.dispatchEvent(CanvasEvents.CanvasElementClicked(clickedElement, event));

        if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
          if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
            clickedElement.select();
            this.canvas.dispatchEvent(CanvasEvents.CanvasElementSelected(clickedElement));
            this.state.selectedElement = clickedElement;
            this.draw();
          } else {
            if (this.state.selectedElement) {
              this.state.selectedElement.deselect()
              this.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
            }
            this.state.selectedElement = false;
            this.draw();
          }
        }
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

  changeToolType(type: CanvasElementType) {
    this.state.variables.toolType = type;
  }

  toJSON(): ExportCanvas {
    return {
      timestamp: Date.now(),
      data: {
        shapes: this.elements.map(shape => shape.toJSON()),
      }
    };
  }

  load(json: ExportCanvas) {
    this.elements = json.data.shapes.map(shape => {
      if (shape.type === 'Rectangle') {
        return Rectangle.fromJSON(shape);
      } else if (shape.type === 'Ellipse') {
        return Ellipse.fromJSON(shape);
      } else if (shape.type === 'Triangle') {
        return Triangle.fromJSON(shape);
      } else if (shape.type.match(/Polygon\[\d+]/)) {
        return Polygon.fromJSON(shape as ExportShape);
      } else if (shape.type === 'Line') {
        return Line.fromJSON(shape as ExportLine);
      } else if (shape.type === 'Text') {
        return CanvasText.fromJSON(shape);
      }

      return Shape.fromJSON(shape)
    });
    this.draw();
  }

  savePNG(name?: string): void {
    this.elements.forEach((element) => element.deselect());
    this.draw();

    const image = this.canvas.toDataURL();
    const aDownloadLink = document.createElement('a');
    aDownloadLink.download = name ?? 'canvas.png';
    aDownloadLink.href = image;
    aDownloadLink.click();
  }

  savePDF(name?: string): void {
    this.elements.forEach((element) => element.deselect());
    this.draw();

    // @ts-ignore
    const doc = new jspdf.jsPDF(this.canvas.width > this.canvas.height ? 'landscape' : 'portrait', 'px', [this.canvas.width, this.canvas.height]);
    const image = this.canvas.toDataURL();
    doc.addImage(image, 'JPEG', 0, 0, this.canvas.width, this.canvas.height);
    doc.save(name ?? 'canvas.pdf');
  }
}
