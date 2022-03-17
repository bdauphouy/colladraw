"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeType_1 = require("./enums/ShapeType");
const Rectangle_1 = __importDefault(require("./shapes/Rectangle"));
const Ellipse_1 = __importDefault(require("./shapes/Ellipse"));
const Triangle_1 = __importDefault(require("./shapes/Triangle"));
const AnchorConditions_1 = __importDefault(require("./utils/AnchorConditions"));
const kebabize_1 = __importDefault(require("./utils/kebabize"));
class Colladraw {
    constructor(canvas) {
        this.state = {
            variables: {},
        };
        this.onClickLocker = false;
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
    addShape(shape) {
        this.shapes.push(shape);
    }
    onMouseDown(event) {
        var _a, _b;
        if (!this.state.selectedShape) {
            this.onClickLocker = true;
            const x = event.clientX - this.canvas.offsetLeft;
            const y = event.clientY - this.canvas.offsetTop;
            this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { color: '#000', strokeWidth: 1, shapeType: (_a = this.state.variables.shapeType) !== null && _a !== void 0 ? _a : ShapeType_1.ShapeType.RECTANGLE, startPoint: {
                        x: event.offsetX,
                        y: event.offsetY,
                    } }) });
            if (this.state.drawing) {
                let shape;
                switch ((_b = this.state.drawing) === null || _b === void 0 ? void 0 : _b.shapeType) {
                    case ShapeType_1.ShapeType.RECTANGLE:
                        shape = new Rectangle_1.default(x, y, 0, 0);
                        break;
                    case ShapeType_1.ShapeType.ELLIPSE:
                        shape = new Ellipse_1.default(x, y, 0, 0);
                        break;
                    case ShapeType_1.ShapeType.TRIANGLE:
                        shape = new Triangle_1.default(x, y, 0, 0);
                        break;
                    default:
                        shape = new Rectangle_1.default(x, y, 0, 0);
                        break;
                }
                shape.strokeColor = '#000';
                this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { shape }) });
            }
        }
        else {
            const gripMargin = 10;
            let anchorFound = false;
            Object.entries(AnchorConditions_1.default).forEach(([anchorConditionName, anchorCondition]) => {
                if (!anchorFound && anchorCondition(this.grid, gripMargin, event)) {
                    this.state = Object.assign(Object.assign({}, this.state), { selectionTransform: {
                            resize: {
                                grip: kebabize_1.default(anchorConditionName),
                            }
                        } });
                    anchorFound = true;
                }
            });
            if (!anchorFound && this.grid[event.offsetX][event.offsetY] === this.state.selectedShape) {
                this.state = Object.assign(Object.assign({}, this.state), { selectionTransform: {
                        translate: {
                            grip: {
                                x: event.offsetX - this.state.selectedShape.x,
                                y: event.offsetY - this.state.selectedShape.y,
                            },
                        },
                    } });
            }
        }
    }
    onMouseMove(event) {
        if (!this.state.selectedShape) {
            if (this.state.drawing) {
                const x = event.clientX - this.canvas.offsetLeft;
                const y = event.clientY - this.canvas.offsetTop;
                this.state = Object.assign(Object.assign({}, this.state), { drawing: Object.assign(Object.assign({}, this.state.drawing), { endPoint: { x, y } }) });
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
        }
        else if (this.state.selectionTransform) {
            if (this.state.selectionTransform.translate) {
                this.state.selectedShape.x = event.offsetX - this.state.selectionTransform.translate.grip.x;
                this.state.selectedShape.y = event.offsetY - this.state.selectionTransform.translate.grip.y;
            }
            else if (this.state.selectionTransform.resize) {
                if (this.state.selectionTransform.resize.grip === 'top-left') {
                    this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
                    this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
                    this.state.selectedShape.x = event.offsetX;
                    this.state.selectedShape.y = event.offsetY;
                }
                else if (this.state.selectionTransform.resize.grip === 'top-right') {
                    this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
                    this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
                    this.state.selectedShape.y = event.offsetY;
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-left') {
                    this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
                    this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
                    this.state.selectedShape.x = event.offsetX;
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom-right') {
                    this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
                    this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
                }
                else if (this.state.selectionTransform.resize.grip === 'top') {
                    this.state.selectedShape.height = this.state.selectedShape.height + this.state.selectedShape.y - event.offsetY;
                    this.state.selectedShape.y = event.offsetY;
                }
                else if (this.state.selectionTransform.resize.grip === 'right') {
                    this.state.selectedShape.width = event.offsetX - this.state.selectedShape.x;
                }
                else if (this.state.selectionTransform.resize.grip === 'bottom') {
                    this.state.selectedShape.height = event.offsetY - this.state.selectedShape.y;
                }
                else if (this.state.selectionTransform.resize.grip === 'left') {
                    this.state.selectedShape.width = this.state.selectedShape.width + this.state.selectedShape.x - event.offsetX;
                    this.state.selectedShape.x = event.offsetX;
                }
            }
        }
        if (Object.values(this.state).some(value => value)) {
            this.draw();
        }
    }
    onMouseUp(_event) {
        if (this.state.drawing && this.state.drawing.shape.width !== 0 && this.state.drawing.shape.height !== 0) {
            this.addShape(this.state.drawing.shape);
        }
        else if (this.state.selectionTransform) {
            this.initGrid();
            this.shapes.forEach(shape => {
                shape.generateGrid(this.grid);
            });
        }
        this.state.drawing = false;
        this.state.selectionTransform = false;
        this.onClickLocker = false;
    }
    onClick(event) {
        if (!this.state.drawing && !this.onClickLocker) {
            const clickedShape = this.grid[event.offsetX][event.offsetY];
            if (clickedShape && (!this.state.selectedShape || this.state.selectedShape == clickedShape)) {
                clickedShape.select();
                this.state.selectedShape = clickedShape;
                this.draw();
            }
            else {
                if (this.state.selectedShape) {
                    this.state.selectedShape.deselect();
                }
                this.state.selectedShape = false;
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
    changeShapeType(type) {
        this.state.variables.shapeType = type;
    }
    toJSON() {
        return {
            shapes: this.shapes.map(shape => shape.toJSON()),
        };
    }
}
exports.default = Colladraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFkcmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9Db2xsYWRyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxpREFBNEM7QUFDNUMsbUVBQTJDO0FBRTNDLCtEQUF1QztBQUN2QyxpRUFBeUM7QUFFekMsZ0ZBQXdEO0FBQ3hELGdFQUF3QztBQUV4QyxNQUFxQixTQUFTO0lBVTVCLFlBQVksTUFBeUI7UUFMN0IsVUFBSyxHQUFVO1lBQ3JCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNNLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBR3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxD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