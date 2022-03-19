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
  canvas: {
    canvas: HTMLCanvasElement,
    elements: CanvasElement[],
  }[];
  _activeCanvasIndex: number = 0;
  context: CanvasRenderingContext2D;
  grid: CanvasGrid;
  gridPixelMerge: number = 5;
  optimized: boolean;
  private state: State = {
    variables: {},
    history: {
      undo: [],
      redo: [],
    },
  };
  private selectionLastActiveCanvasIndex?: number;
  private onClickLocker: boolean = false;
  private readonly canvasContainer?: HTMLDivElement;

  constructor(canvas: HTMLCanvasElement, optimize: boolean = true, gridPixelMerge: number = 5) {
    document.head.appendChild(document.createElement("script")).src = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";

    this.canvas = [{
      canvas,
      elements: [],
    }];
    this.updateActiveCanvas();
    this.optimized = optimize;
    this.gridPixelMerge = gridPixelMerge;

    if (this.optimized) {
      this.canvasContainer = document.createElement("div");
      this.canvasContainer.classList.add("canvas-container", "canvas-container-optimized");
      const canvasParent = canvas.parentElement;
      this.canvasContainer.appendChild(canvas);
      canvasParent.appendChild(this.canvasContainer);
    }

    this.addToHistory();

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

    this.activeCanvas.canvas.width = window.innerWidth;
    this.activeCanvas.canvas.height = window.innerHeight;

    this.initGrid();
  }

  get activeCanvasIndex(): number {
    return this._activeCanvasIndex;
  }

  set activeCanvasIndex(index: number) {
    this._activeCanvasIndex = index;
    this.updateActiveCanvas();
  }

  get activeCanvas(): {
    canvas: HTMLCanvasElement,
    elements: CanvasElement[],
  } {
    return this.canvas[this.activeCanvasIndex];
  }

  private initGrid() {
    this.grid = []
    for (let i = 0; i < this.activeCanvas.canvas.width; i++) {
      this.grid.push([]);

      for (let j = 0; j < this.activeCanvas.canvas.height; j++) {
        this.grid[i].push(null);
      }
    }
  }

  generateGrid() {
    if (this.elements.length > 0) {
      this.elements.forEach((element) => element.generateGrid(this.grid, this.gridPixelMerge));
    } else {
      this.initGrid();
    }
  }

  private updateActiveCanvas() {
    this.context = this.activeCanvas.canvas.getContext("2d");

    this.canvas.forEach((canvas) => {
      canvas.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
      canvas.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this));
      canvas.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
    })

    this.activeCanvas.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.activeCanvas.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.activeCanvas.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.activeCanvas.canvas.removeEventListener('click', this.onClick.bind(this));
    this.activeCanvas.canvas.addEventListener('click', this.onClick.bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.activeCanvas.canvas.width, this.activeCanvas.canvas.height);

    const elementsToDraw = this.activeCanvas.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? this.state.drawing.shape ?? this.state.drawing.line : []);

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

      element.draw(this.context);
    });
  }

  addElement(element: CanvasElement, toAddToHistory: boolean = true) {
    this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementCreated(element));
    this.activeCanvas.elements.push(element);

    if (toAddToHistory) {
      this.addToHistory();
    }
  }

  removeElement(elementToDelete: CanvasElement) {
    this.activeCanvas.elements = this.activeCanvas.elements.filter(element => element !== elementToDelete);
    this.addToHistory();
  }

  get elements(): CanvasElement[] {
    return this.canvas.flatMap(canvas => canvas.elements);
  }

  addLayer() {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = this.canvasContainer.clientWidth;
    newCanvas.height = this.canvasContainer.clientHeight;
    this.canvasContainer.appendChild(newCanvas);
    this.canvas.push({
      canvas: newCanvas,
      elements: [],
    });
    this.activeCanvasIndex = this.canvas.length - 1;
    this.updateActiveCanvas();
  }

  addToHistory() {
    if (this.optimized) {
      this.addLayer();
      this.activeCanvasIndex = this.canvas.length - 1;
      this.updateActiveCanvas();
    }

    this.state.history.current = this.toJSON();
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

      const x = event.clientX - this.activeCanvas.canvas.offsetLeft;
      const y = event.clientY - this.activeCanvas.canvas.offsetTop;
      // const toolType: CanvasElementType = CanvasElementType.TEXT;
      const toolType: CanvasElementType = this.state.variables.toolType ?? CanvasElementType.RECTANGLE;

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
          case CanvasElementType.ERASER:
            if (this.state.drawing) this.state.drawing.eraser = true;
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
      const gripMargin = 20;

      let anchorFound = false;
      Object.entries(AnchorConditions).forEach(([anchorConditionName, anchorCondition]) => {
        if (!anchorFound && !(this.state.selectedElement instanceof CanvasText) && anchorCondition(this.grid, gripMargin, event, this.gridPixelMerge)) {
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

      if (!anchorFound && this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)] === this.state.selectedElement) {
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
      const x = event.clientX - this.activeCanvas.canvas.offsetLeft;
      const y = event.clientY - this.activeCanvas.canvas.offsetTop;

      if (this.state.drawing && this.state.drawing.pencil) {
        const point = new Rectangle(x, y, 5, 5);
        point.selectable = false;
        this.addElement(point, false);
      } else if (this.state.drawing && this.state.drawing.eraser) {
        this.context.globalCompositeOperation = "destination-out";
        const point = new Rectangle(x, y, 5, 5);
        point.selectable = false;
        this.addElement(point, false);
        this.context.globalCompositeOperation = "source-over";
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
          this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.shape, event));

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
          this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.line, event));
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

        this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.selectedElement, event));
        this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementTransformed(this.state.selectedElement, {
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

        this.activeCanvas.canvas.dispatchEvent((CanvasEvents.CanvasElementTransformed(this.state.selectedElement, {
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
    } else if (this.state.drawing && (this.state.drawing.pencil || this.state.drawing.eraser)) {
      this.addToHistory();
    } else if (this.state.typing) {
      this.addElement(this.state.typing.textElement);
    } else if (this.state.selectionTransform) {
      // this.initGrid();
      // this.activeCanvas.elements.forEach(element => {
      //   element.generateGrid(this.grid);
      // });
    }

    this.initGrid();
    this.generateGrid();

    this.state.drawing = false;
    this.state.typing = false;
    this.state.selectionTransform = false;
    this.onClickLocker = false;
  }

  onClick(event: MouseEvent) {
    const clickedElement = this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)];

    if (clickedElement) {
      if (clickedElement.selectable) {
        this.selectionLastActiveCanvasIndex = this.activeCanvasIndex.valueOf();
        this.activeCanvasIndex = this.canvas.findIndex(canvas => canvas.elements.includes(clickedElement));
        this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementClicked(clickedElement, event));

        if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
          if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
            clickedElement.select();
            this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementSelected(clickedElement));
            this.state.selectedElement = clickedElement;
            this.draw();
          } else {
            if (this.state.selectedElement) {
              this.state.selectedElement.deselect()
              this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
            }
            this.state.selectedElement = false;
            this.draw();
          }
        }
      }
    } else if (this.state.selectedElement) {
      this.state.selectedElement.deselect();

      if (this.selectionLastActiveCanvasIndex) {
        this.activeCanvasIndex = this.selectionLastActiveCanvasIndex;
        this.selectionLastActiveCanvasIndex = undefined;
      }

      this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
      this.state.selectedElement = false;
      this.draw();
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
        canvas: this.canvas.map(canvas => ({
          elements: canvas.elements.map(element => element.toJSON()),
        })),
      }
    };
  }

  load(json: ExportCanvas) {
    json.data.canvas.forEach(savedCanvas => {
      if (this.optimized) {
        const newCanvas = document.createElement("canvas");
        newCanvas.width = this.activeCanvas.canvas.width;
        newCanvas.height = this.activeCanvas.canvas.height;

        this.canvasContainer.appendChild(newCanvas);
        this.canvas.push({
          canvas: newCanvas,
          elements: [],
        });
        this.activeCanvasIndex = this.canvas.length - 1;
        this.updateActiveCanvas();

        this.activeCanvas.elements = savedCanvas.elements.map(shape => {
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

          return Shape.fromJSON(shape);
        });
        this.draw();
      }
    });
  }

  clear() {
    for (let i = 0; i < this.canvas.length; i++) {
      this.activeCanvasIndex = i;
      this.updateActiveCanvas();
      this.activeCanvas.elements = [];
      this.draw();
      this.canvasContainer.removeChild(this.canvas[i].canvas);
    }
    this.canvas = [];
    this.addToHistory();
    this.generateGrid();
  }

  toDataURL(): string {
    this.addLayer();
    this.activeCanvasIndex = this.canvas.length - 1;
    this.updateActiveCanvas();

    this.elements.forEach((element) => {
      element.deselect();
      this.addElement(element, false);
    });
    this.draw();

    const image = this.activeCanvas.canvas.toDataURL();

    this.canvasContainer.removeChild(this.activeCanvas.canvas);
    this.canvas.pop();
    this.activeCanvasIndex = this.canvas.length - 1;
    this.updateActiveCanvas();

    return image;
  }

  savePNG(name?: string): void {
    this.toDataURL();

    const aDownloadLink = document.createElement('a');
    aDownloadLink.download = name ?? 'canvas.png';
    aDownloadLink.href = this.toDataURL();
    aDownloadLink.click();
  }

  savePDF(name?: string): void {
    this.activeCanvas.elements.forEach((element) => element.deselect());
    this.draw();

    // @ts-ignore
    const doc = new jspdf.jsPDF(this.activeCanvas.canvas.width > this.activeCanvas.canvas.height ? 'landscape' : 'portrait', 'px', [this.activeCanvas.canvas.width, this.activeCanvas.canvas.height]);
    const image = this.toDataURL();
    doc.addImage(image, 'JPEG', 0, 0, this.activeCanvas.canvas.width, this.activeCanvas.canvas.height);
    doc.save(name ?? 'canvas.pdf');
  }
}
