"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = __importDefault(require("./canvas_elements/Shape"));
const CanvasElementType_1 = require("./enums/CanvasElementType");
const Rectangle_1 = __importDefault(require("./canvas_elements/Rectangle"));
const Ellipse_1 = __importDefault(require("./canvas_elements/Ellipse"));
const Triangle_1 = __importDefault(require("./canvas_elements/Triangle"));
const AnchorConditions_1 = __importDefault(require("./utils/AnchorConditions"));
const kebabize_1 = __importDefault(require("./utils/kebabize"));
const Polygon_1 = __importDefault(require("./canvas_elements/Polygon"));
const CanvasEvents_1 = __importDefault(require("./events/CanvasEvents"));
const CanvasText_1 = __importDefault(require("./canvas_elements/CanvasText"));
const Line_1 = __importDefault(require("./canvas_elements/Line"));
const ResizeFunctions_1 = __importDefault(require("./utils/ResizeFunctions"));
class Colladraw {
    constructor(canvas) {
        this.state = {
            variables: {},
        };
        this.onClickLocker = false;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.elements = [];
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (this.state.selectedElement) {
                    this.elements = this.elements.filter(element => element !== this.state.selectedElement);
                    this.state.selectedElement.deselect();
                    this.state.selectedElement = false;
                    this.state.selectionTransform = false;
                    this.draw();
                }
            }
        });
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
        var _a;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const elementsToDraw = this.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? (_a = this.state.drawing.shape) !== null && _a !== void 0 ? _a : this.state.drawing.line : []);
        if (elementsToDraw.length > 0) {
            elementsToDraw.forEach(element => {
                if (element instanceof Shape_1.default) {
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
                else if (element instanceof CanvasText_1.default) {
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
        else {
            this.initGrid();
        }
    }
    addElement(element) {
        this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementCreated(element));
        this.elements.push(element);
    }
    onMouseDown(event) {
        var _a, _b, _c;
        const clickedShape = this.grid[event.offsetY][event.offsetX];
        if (!clickedShape && !this.state.selectedElement) {
            this.onClickLocker = true;
            const x = event.clientX - this.canvas.offsetLeft;
            const y = event.clientY - this.canvas.offsetTop;
            // const toolType: CanvasElementType = CanvasElementType.TEXT;
            const toolType = (_a = this.state.variables.toolType) !== null && _a !== void 0 ? _a : CanvasElementType_1.CanvasElementType.LINE;
            this.state = Object.assign(Object.assign({}, this.state), { variables: { toolType }, 
                // @ts-ignore
                typing: toolType === CanvasElementType_1.CanvasElementType.TEXT ? Object.assign(Object.assign({}, this.state.typing), { text: 'Hello World', font: '20px Arial' }) : false, 
                // @ts-ignore
                drawing: toolType != CanvasElementType_1.CanvasElementType.TEXT ? Object.assign(Object.assign({}, this.state.drawing), { color: '#000', strokeWidth: 1, startPoint: {
                        x: event.offsetX,
                        y: event.offsetY,
                    } }) : false });
            if (this.state.variables.toolType) {
                let element;
                switch (this.state.variables.toolType) {
                    case CanvasElementType_1.CanvasElementType.RECTANGLE:
                        element = new Rectangle_1.default(x, y, 0, 0);
                        break;
                    case CanvasElementType_1.CanvasElementType.ELLIPSE:
                        element = new Ellipse_1.default(x, y, 0, 0);
                        break;
                    case CanvasElementType_1.CanvasElementType.TRIANGLE:
                        element = new Triangle_1.default(x, y, 0, 0);
                        break;
                    case CanvasElementType_1.CanvasElementType.LINE:
                        element = new Line_1.default(x, y, 0, 0);
                        break;
                    case CanvasElementType_1.CanvasElementType.TEXT:
                        element = new CanvasText_1.default('Hello world', x, y, (_b = this.state.variables.font) !== null && _b !== void 0 ? _b : '12px Arial');
                        element.y += parseInt((_c = element.font.match(/\d+/)[0]) !== null && _c !== void 0 ? _c : '20');
                        break;
                    default:
                        element = new Rectangle_1.default(x, y, 0, 0);
                        break;
                }
                if (element instanceof Shape_1.default || element instanceof Line_1.default) {
                    if (element instanceof Shape_1.default) {
                        element.strokeColor = '#000';
                    }
                    else if (element instanceof Line_1.default) {
                        element.color = '#000';
                    }
                    this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { shape: element instanceof Shape_1.default ? element : undefined, line: element instanceof Line_1.default ? element : undefined }) });
                }
                else if (element instanceof CanvasText_1.default) {
                    element.color = '#000';
                    this.state = Object.assign(Object.assign({}, this.state), { typing: Object.assign(Object.assign({}, this.state.typing), { text: element.text, textElement: element }) });
                    this.draw();
                }
            }
        }
        else {
            const gripMargin = 10;
            let anchorFound = false;
            Object.entries(AnchorConditions_1.default).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof CanvasText_1.default) && anchorCondition(this.grid, gripMargin, event)) {
                    this.state = Object.assign(Object.assign({}, this.state), { selectionTransform: {
                            resize: {
                                grip: (0, kebabize_1.default)(anchorConditionName),
                            }
                        } });
                    anchorFound = true;
                }
            });
            if (!anchorFound && this.grid[event.offsetY][event.offsetX] === this.state.selectedElement) {
                this.state = Object.assign(Object.assign({}, this.state), { selectionTransform: {
                        translate: {
                            grip: {
                                x: event.offsetX - this.state.selectedElement.x,
                                y: event.offsetY - this.state.selectedElement.y,
                            },
                        },
                    } });
            }
        }
    }
    onMouseMove(event) {
        if (!this.state.selectedElement) {
            if (this.state.drawing) {
                const x = event.clientX - this.canvas.offsetLeft;
                const y = event.clientY - this.canvas.offsetTop;
                this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { endPoint: { x, y } }) });
                if (this.state.drawing && this.state.drawing.shape) {
                    this.state.drawing.shape.width = this.state.drawing.endPoint.x - this.state.drawing.startPoint.x;
                    this.state.drawing.shape.height = this.state.drawing.endPoint.y - this.state.drawing.startPoint.y;
                    this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.drawing.shape, event));
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
                    this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.drawing.line, event));
                }
            }
        }
        else if (this.state.selectionTransform) {
            if (this.state.selectionTransform.translate) {
                const oldX = this.state.selectedElement.x;
                const oldY = this.state.selectedElement.y;
                this.state.selectedElement.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
                this.state.selectedElement.y = event.offsetY - this.state.selectionTransform.translate.grip.y;
                if (this.state.selectedElement instanceof Line_1.default) {
                    this.state.selectedElement.endX = this.state.selectedElement.endX + (this.state.selectedElement.x - oldX);
                    this.state.selectedElement.endY = this.state.selectedElement.endY + (this.state.selectedElement.y - oldY);
                }
                this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.selectedElement, event));
                this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementTransformed(this.state.selectedElement, {
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
                    ResizeFunctions_1.default.topLeft(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'top-right') {
                    ResizeFunctions_1.default.topRight(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                    ResizeFunctions_1.default.bottomLeft(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                    ResizeFunctions_1.default.bottomRight(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'top') {
                    ResizeFunctions_1.default.top(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'right') {
                    ResizeFunctions_1.default.right(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom') {
                    ResizeFunctions_1.default.bottom(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'left') {
                    ResizeFunctions_1.default.left(this.state, event);
                }
                this.canvas.dispatchEvent((CanvasEvents_1.default.CanvasElementTransformed(this.state.selectedElement, {
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
            this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementClicked(clickedElement, event));
        }
        if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
            if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
                clickedElement.select();
                this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementSelected(clickedElement));
                this.state.selectedElement = clickedElement;
                this.draw();
            }
            else {
                if (this.state.selectedElement) {
                    this.state.selectedElement.deselect();
                    this.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementDeselected(this.state.selectedElement));
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
                return Rectangle_1.default.fromJSON(shape);
            }
            else if (shape.type === 'Ellipse') {
                return Ellipse_1.default.fromJSON(shape);
            }
            else if (shape.type === 'Triangle') {
                return Triangle_1.default.fromJSON(shape);
            }
            else if (shape.type.match(/Polygon\[\d+]/)) {
                return Polygon_1.default.fromJSON(shape);
            }
            else if (shape.type === 'Text') {
                return CanvasText_1.default.fromJSON(shape);
            }
            return Shape_1.default.fromJSON(shape);
        });
        this.draw();
    }
    savePNG(name) {
        const image = this.canvas.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = name !== null && name !== void 0 ? name : 'canvas.png';
        aDownloadLink.href = image;
        aDownloadLink.click();
    }
}
exports.default = Colladraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNEM7QUFDNUMsaUVBQTREO0FBQzVELDRFQUFvRDtBQUVwRCx3RUFBZ0Q7QUFDaEQsMEVBQWtEO0FBRWxELGdGQUF3RDtBQUN4RCxnRUFBd0M7QUFFeEMsd0VBQWdEO0FBQ2hELHlFQUFpRDtBQUVqRCw4RUFBc0Q7QUFDdEQsa0VBQTBDO0FBQzFDLDhFQUFzRDtBQUV0RCxNQUFxQixTQUFTO0lBVTVCLFlBQVksTUFBeUI7UUFMN0IsVUFBSyxHQUFVO1lBQ3JCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNNLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBR3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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