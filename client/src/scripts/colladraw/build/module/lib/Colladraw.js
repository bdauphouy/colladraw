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
import ResizeFunctions from "./utils/ResizeFunctions.js";
export default class Colladraw {
    canvas;
    _activeCanvasIndex = 0;
    context;
    grid;
    gridPixelMerge = 5;
    optimized;
    background;
    backgroundColor = '#fafafa';
    state = {
        variables: {},
        history: {
            undo: [],
            redo: [],
        },
    };
    selectionLastActiveCanvasIndex;
    onClickLocker = false;
    canvasContainer;
    constructor(canvas, optimize = true, gridPixelMerge = 5) {
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
        if (clear) {
            this.context.clearRect(0, 0, this.activeCanvas.canvas.width, this.activeCanvas.canvas.height);
        }
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
            }
            else if (element instanceof CanvasText) {
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
        this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementCreated(element));
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
        const clickedShape = this.grid[event.offsetY][event.offsetX];
        if (!clickedShape && !this.state.selectedElement) {
            this.onClickLocker = true;
            const x = event.offsetX;
            const y = event.offsetY;
            // const toolType: CanvasElementType = CanvasElementType.TEXT;
            const toolType = this.state.variables.toolType ?? CanvasElementType.RECTANGLE;
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
                    case CanvasElementType.PENCIL:
                        if (this.state.drawing)
                            this.state.drawing.pencil = true;
                        break;
                    case CanvasElementType.ERASER:
                        if (this.state.drawing)
                            this.state.drawing.eraser = true;
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
            });
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
    onMouseMove(event) {
        if (!this.state.selectedElement) {
            const x = event.offsetX;
            const y = event.offsetY;
            if (this.state.drawing && this.state.drawing.pencil) {
                const point = new Rectangle(x, y, 5, 5);
                point.selectable = false;
                this.addElement(point, false);
            }
            else if (this.state.drawing && this.state.drawing.eraser) {
                // this.changeFillColor(this.backgroundColor);
                // this.changeStrokeColor(this.backgroundColor);
                this.context.globalCompositeOperation = "destination-out";
                const point = new Rectangle(x, y, 5, 5);
                point.fillColor = this.backgroundColor;
                point.strokeColor = this.backgroundColor;
                point.selectable = false;
                this.addElement(point, false);
                this.context.globalCompositeOperation = "source-over";
                // this.changeFillColor('#000');
            }
            else if (this.state.drawing) {
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
                }
                else if (this.state.drawing && this.state.drawing.line) {
                    this.state.drawing.line.endX = this.state.drawing.endPoint.x;
                    this.state.drawing.line.endY = this.state.drawing.endPoint.y;
                    this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.drawing.line, event));
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
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementMoved(this.state.selectedElement, event));
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementTransformed(this.state.selectedElement, {
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
                    ResizeFunctions.topLeft(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'top-right') {
                    ResizeFunctions.topRight(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                    ResizeFunctions.bottomLeft(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                    ResizeFunctions.bottomRight(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'top') {
                    ResizeFunctions.top(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'right') {
                    ResizeFunctions.right(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom') {
                    ResizeFunctions.bottom(this.state, event);
                }
                else if (this.state.selectionTransform.resize.grip === 'left') {
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
                this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementClicked(clickedElement, event));
                if (!this.state.drawing && !this.state.typing && !this.onClickLocker) {
                    if (clickedElement && (!this.state.selectedElement || this.state.selectedElement == clickedElement)) {
                        clickedElement.select();
                        this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementSelected(clickedElement));
                        this.state.selectedElement = clickedElement;
                        this.draw();
                    }
                    else {
                        if (this.state.selectedElement) {
                            this.state.selectedElement.deselect();
                            this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
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
            this.activeCanvas.canvas.dispatchEvent(CanvasEvents.CanvasElementDeselected(this.state.selectedElement));
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
                    else if (shape.type === 'Line') {
                        return Line.fromJSON(shape);
                    }
                    else if (shape.type === 'Text') {
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
    toDataURL() {
        this.addLayer();
        this.activeCanvasIndex = this.canvas.length - 1;
        this.updateActiveCanvas();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, 999999, 999999);
        this.draw(false);
        this.elements.forEach((element) => {
            element.deselect();
            this.changeFillColor(element instanceof Shape ? element.fillColor : element instanceof CanvasText || element instanceof Line ? element.color : undefined);
            this.changeStrokeColor(element instanceof Shape ? element.strokeColor : undefined);
            this.changeStrokeWidth(element instanceof Shape ? element.strokeWidth : undefined);
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
        aDownloadLink.download = name ?? 'canvas.png';
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
        doc.save(name ?? 'canvas.pdf');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0sNkJBQTZCLENBQUM7QUFFcEQsT0FBTyxPQUFPLE1BQU0sMkJBQTJCLENBQUM7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQsT0FBTyxnQkFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLE9BQU8sTUFBTSwyQkFBMkIsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSx3QkFBd0IsQ0FBQztBQUMxQyxPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVM7SUFDNUIsTUFBTSxDQUdGO0lBQ0osa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sQ0FBMkI7SUFDbEMsSUFBSSxDQUFhO0lBQ2pCLGNBQWMsR0FBVyxDQUFDLENBQUM7SUFDM0IsU0FBUyxDQUFVO0lBQ25CLFVBQVUsQ0FBb0I7SUFDOUIsZUFBZSxHQUFXLFNBQVMsQ0FBQztJQUM1QixLQUFLLEdBQVU7UUFDckIsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1NBQ1Q7S0FDRixDQUFDO0lBQ00sOEJBQThCLENBQVU7SUFDeEMsYUFBYSxHQUFZLEtBQUssQ0FBQztJQUN0QixlQUFlLENBQWtCO0lBRWxELFlBQVksTUFB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QUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbE0sTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0YifQ==