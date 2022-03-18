import Shape from "./canvas_elements/Shape.js";
import { CanvasElementType } from "./enums/CanvasElementType.js";
import Rectangle from "./canvas_elements/Rectangle.js";
import Ellipse from "./canvas_elements/Ellipse.js";
import Triangle from "./canvas_elements/Triangle.js";
import AnchorConditions from "./utils/AnchorConditions.js";
import kebabize from "./utils/kebabize.js";
import Polygon from "./canvas_elements/Polygon.js";
import CanvasEvents from "./events/CanvasEvents.js";
import CanvasText from "./canvas_elements/CanvasText.js";
import Line from "./canvas_elements/Line.js";
export default class Colladraw {
    canvas;
    grid;
    context;
    elements;
    state = {
        variables: {},
    };
    onClickLocker = false;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.elements = [];
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initGrid();
    }
    initGrid() {
        this.grid = [];
        for (let i = 0; i < this.canvas.width; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.canvas.height; j++) {
                this.grid[i].push(null);
            }
        }
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? this.state.drawing.shape ?? this.state.drawing.line : []).forEach(element => {
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
            }
            else if (element instanceof CanvasText) {
                if (this.state.variables.fillColor) {
                    element.color = this.state.variables.fillColor;
                }
                if (this.state.variables.font) {
                    element.font = this.state.variables.font;
                }
            }
            element.draw(this.context, this.grid);
        });
    }
    addElement(element) {
        this.canvas.dispatchEvent(CanvasEvents.CanvasElementCreated(element));
        this.elements.push(element);
    }
    onMouseDown(event) {
        const clickedShape = this.grid[event.offsetY][event.offsetX];
        if (!clickedShape && !this.state.selectedElement) {
            this.onClickLocker = true;
            const x = event.clientX - this.canvas.offsetLeft;
            const y = event.clientY - this.canvas.offsetTop;
            // const toolType: CanvasElementType = CanvasElementType.TEXT;
            const toolType = this.state.variables.toolType ?? CanvasElementType.LINE;
            this.state = {
                ...this.state,
                variables: { toolType },
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
            };
            if (this.state.variables.toolType) {
                let element;
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
                        element.y += parseInt(element.font.match(/\d+/)[0] ?? '20');
                        break;
                    default:
                        element = new Rectangle(x, y, 0, 0);
                        break;
                }
                if (element instanceof Shape || element instanceof Line) {
                    if (element instanceof Shape) {
                        element.strokeColor = '#000';
                    }
                    else if (element instanceof Line) {
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
                }
                else if (element instanceof CanvasText) {
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
        }
        else {
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
            });
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
    onMouseMove(event) {
        if (!this.state.selectedElement) {
            if (this.state.drawing) {
                const x = event.clientX - this.canvas.offsetLeft;
                const y = event.clientY - this.canvas.offsetTop;
                this.state = {
                    ...this.state,
                    drawing: {
                        ...this.state.drawing,
                        endPoint: { x, y },
                    },
                };
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
                }
                else if (this.state.drawing && this.state.drawing.line) {
                    this.state.drawing.line.endX = this.state.drawing.endPoint.x;
                    this.state.drawing.line.endY = this.state.drawing.endPoint.y;
                    this.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.line, event));
                }
            }
        }
        else if (this.state.selectionTransform) {
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
            }
            else if (this.state.selectionTransform.resize) {
                const oldX = this.state.selectedElement.x;
                const oldY = this.state.selectedElement.y;
                const oldWidth = this.state.selectedElement.width;
                const oldHeight = this.state.selectedElement.height;
                if (this.state.selectionTransform.resize.grip === 'top-left') {
                    this.state.selectedElement.width = this.state.selectedElement.width + this.state.selectedElement.x - event.offsetX;
                    this.state.selectedElement.height = this.state.selectedElement.height + this.state.selectedElement.y - event.offsetY;
                    this.state.selectedElement.x = event.offsetX;
                    this.state.selectedElement.y = event.offsetY;
                }
                else if (this.state.selectionTransform.resize.grip === 'top-right') {
                    this.state.selectedElement.width = event.offsetX - this.state.selectedElement.x;
                    this.state.selectedElement.height = this.state.selectedElement.height + this.state.selectedElement.y - event.offsetY;
                    this.state.selectedElement.y = event.offsetY;
                    if (this.state.selectedElement instanceof Line) {
                        this.state.selectedElement.endX = event.offsetX;
                    }
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                    this.state.selectedElement.width = this.state.selectedElement.width + this.state.selectedElement.x - event.offsetX;
                    this.state.selectedElement.height = event.offsetY - this.state.selectedElement.y;
                    this.state.selectedElement.x = event.offsetX;
                    if (this.state.selectedElement instanceof Line) {
                        this.state.selectedElement.endY = event.offsetY;
                    }
                    this.state.selectedElement.x = event.offsetX;
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                    this.state.selectedElement.width = event.offsetX - this.state.selectedElement.x;
                    this.state.selectedElement.height = event.offsetY - this.state.selectedElement.y;
                    if (this.state.selectedElement instanceof Line) {
                        this.state.selectedElement.endX = event.offsetX;
                        this.state.selectedElement.endY = event.offsetY;
                    }
                }
                else if (this.state.selectionTransform.resize.grip === 'top') {
                    this.state.selectedElement.height = this.state.selectedElement.height + this.state.selectedElement.y - event.offsetY;
                    this.state.selectedElement.y = event.offsetY;
                }
                else if (this.state.selectionTransform.resize.grip === 'right') {
                    this.state.selectedElement.width = event.offsetX - this.state.selectedElement.x;
                    if (this.state.selectedElement instanceof Line) {
                        this.state.selectedElement.endX = event.offsetX;
                    }
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom') {
                    this.state.selectedElement.height = event.offsetY - this.state.selectedElement.y;
                    if (this.state.selectedElement instanceof Line) {
                        this.state.selectedElement.endY = event.offsetY;
                    }
                }
                else if (this.state.selectionTransform.resize.grip === 'left') {
                    this.state.selectedElement.width = this.state.selectedElement.width + this.state.selectedElement.x - event.offsetX;
                    this.state.selectedElement.x = event.offsetX;
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
    onMouseUp(_event) {
        if (this.state.drawing && this.state.drawing.shape && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
            this.addElement(this.state.drawing.shape);
        }
        else if (this.state.drawing && this.state.drawing.line) {
            this.addElement(this.state.drawing.line);
        }
        else if (this.state.typing) {
            this.addElement(this.state.typing.textElement);
        }
        else if (this.state.selectionTransform) {
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
    onClick(event) {
        const clickedElement = this.grid[event.offsetY][event.offsetX];
        if (clickedElement) {
            this.canvas.dispatchEvent(CanvasEvents.CanvasElementClicked(clickedElement, event));
        }
        if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
            if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
                clickedElement.select();
                this.canvas.dispatchEvent(CanvasEvents.CanvasElementSelected(clickedElement));
                this.state.selectedElement = clickedElement;
                this.draw();
            }
            else {
                if (this.state.selectedElement) {
                    this.state.selectedElement.deselect();
                    this.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
                }
                this.state.selectedElement = false;
                this.draw();
            }
        }
    }
    changeFillColor(color) {
        this.state.variables.fillColor = color;
    }
    changeStrokeColor(color) {
        this.state.variables.strokeColor = color;
    }
    changeStrokeWidth(width) {
        this.state.variables.strokeWidth = width;
    }
    changeToolType(type) {
        this.state.variables.toolType = type;
    }
    toJSON() {
        return {
            timestamp: new Date().getTime(),
            data: {
                shapes: this.elements.map(shape => shape.toJSON()),
            }
        };
    }
    load(json) {
        this.elements = json.data.shapes.map(shape => {
            if (shape.type === 'Rectangle') {
                return Rectangle.fromJSON(shape);
            }
            else if (shape.type === 'Ellipse') {
                return Ellipse.fromJSON(shape);
            }
            else if (shape.type === 'Triangle') {
                return Triangle.fromJSON(shape);
            }
            else if (shape.type.match(/Polygon\[\d+]/)) {
                return Polygon.fromJSON(shape);
            }
            else if (shape.type === 'Text') {
                return CanvasText.fromJSON(shape);
            }
            return Shape.fromJSON(shape);
        });
        this.draw();
    }
    savePNG(name) {
        const image = this.canvas.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = name ?? 'canvas.png';
        aDownloadLink.href = image;
        aDownloadLink.click();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0sNkJBQTZCLENBQUM7QUFFcEQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSx3QkFBd0IsQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUFDNUIsTUFBTSxDQUFvQjtJQUMxQixJQUFJLENBQWE7SUFDakIsT0FBTyxDQUEyQjtJQUNsQyxRQUFRLENBQWtCO0lBQ2xCLEtBQUssR0FBVTtRQUNyQixTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7SUFDTSxhQUFhLEdBQVksS0FBSyxDQUFDO0lBRXZDLFlBQVksTUFBeUI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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