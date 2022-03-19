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
    constructor(canvas, optimize = true, gridPixelMerge = 5) {
        this._activeCanvasIndex = 0;
        this.gridPixelMerge = 5;
        this.backgroundColor = '#fafafa';
        this.state = {
            variables: {},
            history: {
                undo: [],
                redo: [],
            },
        };
        this.onClickLocker = false;
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
            const context = canvas.getContext("2d");
            context.fillStyle = this.backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
            this.background = canvas;
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
    get activeCanvasIndex() {
        return this._activeCanvasIndex;
    }
    set activeCanvasIndex(index) {
        this._activeCanvasIndex = index;
        this.updateActiveCanvas();
    }
    get activeCanvas() {
        return this.canvas[this.activeCanvasIndex];
    }
    initGrid() {
        this.grid = [];
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
        }
        else {
            this.initGrid();
        }
    }
    updateActiveCanvas() {
        this.context = this.activeCanvas.canvas.getContext("2d");
        this.canvas.forEach((canvas) => {
            canvas.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
            canvas.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this));
            canvas.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
        });
        this.activeCanvas.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.activeCanvas.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.activeCanvas.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.activeCanvas.canvas.removeEventListener('click', this.onClick.bind(this));
        this.activeCanvas.canvas.addEventListener('click', this.onClick.bind(this));
    }
    draw(clear = true) {
        var _a;
        if (clear) {
            this.context.clearRect(0, 0, this.activeCanvas.canvas.width, this.activeCanvas.canvas.height);
        }
        const elementsToDraw = this.activeCanvas.elements.concat(this.state.drawing && (this.state.drawing.shape || this.state.drawing.line) ? (_a = this.state.drawing.shape) !== null && _a !== void 0 ? _a : this.state.drawing.line : []);
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
            element.draw(this.context);
        });
    }
    addElement(element, toAddToHistory = true) {
        this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementCreated(element));
        this.activeCanvas.elements.push(element);
        if (toAddToHistory) {
            this.addToHistory();
        }
    }
    removeElement(elementToDelete) {
        this.activeCanvas.elements = this.activeCanvas.elements.filter(element => element !== elementToDelete);
        this.addToHistory();
    }
    get elements() {
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
    onMouseDown(event) {
        var _a, _b, _c;
        const clickedShape = this.grid[event.offsetY][event.offsetX];
        if (!clickedShape && !this.state.selectedElement) {
            this.onClickLocker = true;
            const x = event.offsetX;
            const y = event.offsetY;
            // const toolType: CanvasElementType = CanvasElementType.TEXT;
            const toolType = (_a = this.state.variables.toolType) !== null && _a !== void 0 ? _a : CanvasElementType_1.CanvasElementType.RECTANGLE;
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
                    case CanvasElementType_1.CanvasElementType.PENCIL:
                        if (this.state.drawing)
                            this.state.drawing.pencil = true;
                        break;
                    case CanvasElementType_1.CanvasElementType.ERASER:
                        if (this.state.drawing)
                            this.state.drawing.eraser = true;
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
            const gripMargin = 20;
            let anchorFound = false;
            Object.entries(AnchorConditions_1.default).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && !(this.state.selectedElement instanceof CanvasText_1.default) && anchorCondition(this.grid, gripMargin, event, this.gridPixelMerge)) {
                    this.state = Object.assign(Object.assign({}, this.state), { selectionTransform: {
                            resize: {
                                grip: (0, kebabize_1.default)(anchorConditionName),
                            }
                        } });
                    anchorFound = true;
                }
            });
            if (!anchorFound && this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)] === this.state.selectedElement) {
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
            const x = event.offsetX;
            const y = event.offsetY;
            if (this.state.drawing && this.state.drawing.pencil) {
                const point = new Rectangle_1.default(x, y, 5, 5);
                point.selectable = false;
                this.addElement(point, false);
            }
            else if (this.state.drawing && this.state.drawing.eraser) {
                // this.changeFillColor(this.backgroundColor);
                // this.changeStrokeColor(this.backgroundColor);
                this.context.globalCompositeOperation = "destination-out";
                const point = new Rectangle_1.default(x, y, 5, 5);
                point.fillColor = this.backgroundColor;
                point.strokeColor = this.backgroundColor;
                point.selectable = false;
                this.addElement(point, false);
                this.context.globalCompositeOperation = "source-over";
                // this.changeFillColor('#000');
            }
            else if (this.state.drawing) {
                this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { endPoint: { x, y } }) });
                if (this.state.drawing && this.state.drawing.shape) {
                    this.state.drawing.shape.width = this.state.drawing.endPoint.x - this.state.drawing.startPoint.x;
                    this.state.drawing.shape.height = this.state.drawing.endPoint.y - this.state.drawing.startPoint.y;
                    this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.drawing.shape, event));
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
                    this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.drawing.line, event));
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
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementMoved(this.state.selectedElement, event));
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementTransformed(this.state.selectedElement, {
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
                this.activeCanvas.canvas.dispatchEvent((CanvasEvents_1.default.CanvasElementTransformed(this.state.selectedElement, {
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
        else if (this.state.drawing && (this.state.drawing.pencil || this.state.drawing.eraser)) {
            this.addToHistory();
        }
        else if (this.state.typing) {
            this.addElement(this.state.typing.textElement);
        }
        else if (this.state.selectionTransform) {
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
    onClick(event) {
        const clickedElement = this.grid[event.offsetY + this.gridPixelMerge - (event.offsetY % this.gridPixelMerge)][event.offsetX + this.gridPixelMerge - (event.offsetX % this.gridPixelMerge)];
        if (clickedElement) {
            if (clickedElement.selectable) {
                this.selectionLastActiveCanvasIndex = this.activeCanvasIndex.valueOf();
                this.activeCanvasIndex = this.canvas.findIndex(canvas => canvas.elements.includes(clickedElement));
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementClicked(clickedElement, event));
                if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
                    if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
                        clickedElement.select();
                        this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementSelected(clickedElement));
                        this.state.selectedElement = clickedElement;
                        this.draw();
                    }
                    else {
                        if (this.state.selectedElement) {
                            this.state.selectedElement.deselect();
                            this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementDeselected(this.state.selectedElement));
                        }
                        this.state.selectedElement = false;
                        this.draw();
                    }
                }
            }
        }
        else if (this.state.selectedElement) {
            this.state.selectedElement.deselect();
            if (this.selectionLastActiveCanvasIndex) {
                this.activeCanvasIndex = this.selectionLastActiveCanvasIndex;
                this.selectionLastActiveCanvasIndex = undefined;
            }
            this.activeCanvas.canvas.dispatchEvent(CanvasEvents_1.default.CanvasElementDeselected(this.state.selectedElement));
            this.state.selectedElement = false;
            this.draw();
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
            timestamp: Date.now(),
            data: {
                canvas: this.canvas.map(canvas => ({
                    elements: canvas.elements.map(element => element.toJSON()),
                })),
            }
        };
    }
    load(json) {
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
                    else if (shape.type === 'Line') {
                        return Line_1.default.fromJSON(shape);
                    }
                    else if (shape.type === 'Text') {
                        return CanvasText_1.default.fromJSON(shape);
                    }
                    return Shape_1.default.fromJSON(shape);
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
    toDataURL() {
        this.addLayer();
        this.activeCanvasIndex = this.canvas.length - 1;
        this.updateActiveCanvas();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, 999999, 999999);
        this.draw(false);
        this.elements.forEach((element) => {
            element.deselect();
            this.changeFillColor(element instanceof Shape_1.default ? element.fillColor : element instanceof CanvasText_1.default || element instanceof Line_1.default ? element.color : undefined);
            this.changeStrokeColor(element instanceof Shape_1.default ? element.strokeColor : undefined);
            this.changeStrokeWidth(element instanceof Shape_1.default ? element.strokeWidth : undefined);
            this.addElement(element, false);
            this.draw(false);
        });
        const image = this.activeCanvas.canvas.toDataURL();
        this.canvasContainer.removeChild(this.activeCanvas.canvas);
        this.canvas.pop();
        this.activeCanvasIndex = this.canvas.length - 1;
        this.updateActiveCanvas();
        return image;
    }
    savePNG(name) {
        this.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = name !== null && name !== void 0 ? name : 'canvas.png';
        aDownloadLink.href = this.toDataURL();
        aDownloadLink.click();
    }
    savePDF(name) {
        this.activeCanvas.elements.forEach((element) => element.deselect());
        this.draw();
        // @ts-ignore
        const doc = new jspdf.jsPDF(this.activeCanvas.canvas.width > this.activeCanvas.canvas.height ? 'landscape' : 'portrait', 'px', [this.activeCanvas.canvas.width, this.activeCanvas.canvas.height]);
        const image = this.toDataURL();
        doc.addImage(image, 'JPEG', 0, 0, this.activeCanvas.canvas.width, this.activeCanvas.canvas.height);
        doc.save(name !== null && name !== void 0 ? name : 'canvas.pdf');
    }
}
exports.default = Colladraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNEM7QUFDNUMsaUVBQTREO0FBQzVELDRFQUFvRDtBQUVwRCx3RUFBZ0Q7QUFDaEQsMEVBQWtEO0FBRWxELGdGQUF3RDtBQUN4RCxnRUFBd0M7QUFFeEMsd0VBQWdEO0FBQ2hELHlFQUFpRDtBQUVqRCw4RUFBc0Q7QUFDdEQsa0VBQTBDO0FBQzFDLDhFQUFzRDtBQUV0RCxNQUFxQixTQUFTO0lBdUI1QixZQUFZLE1BQXlCLEVBQUUsV0FBb0IsSUFBSSxFQUFFLGlCQUF5QixDQUFDO1FBbEIzRix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFHL0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFHM0Isb0JBQWUsR0FBVyxTQUFTLENBQUM7UUFDNUIsVUFBSyxHQUFVO1lBQ3JCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxFQUFFO2dCQUNSLElBQUksRUFBRSxFQUFFO2FBQ1Q7U0FDRixDQUFDO1FBRU0sa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFJckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxzREFBc0QsQ0FBQztRQUV6SCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2IsTUFBTTtnQkFDTixRQUFRLEVBQUUsRUFBRTthQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxHQUFH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