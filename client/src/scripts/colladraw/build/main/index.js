"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasElementType = exports.CanvasText = exports.CanvasElement = exports.Triangle = exports.Polygon = exports.Ellipse = exports.Rectangle = exports.Shape = void 0;
const Colladraw_1 = __importDefault(require("./lib/Colladraw"));
const Shape_1 = __importDefault(require("./lib/canvas_elements/Shape"));
exports.Shape = Shape_1.default;
const Rectangle_1 = __importDefault(require("./lib/canvas_elements/Rectangle"));
exports.Rectangle = Rectangle_1.default;
const Ellipse_1 = __importDefault(require("./lib/canvas_elements/Ellipse"));
exports.Ellipse = Ellipse_1.default;
const Polygon_1 = __importDefault(require("./lib/canvas_elements/Polygon"));
exports.Polygon = Polygon_1.default;
const Triangle_1 = __importDefault(require("./lib/canvas_elements/Triangle"));
exports.Triangle = Triangle_1.default;
const CanvasElement_1 = __importDefault(require("./lib/canvas_elements/CanvasElement"));
exports.CanvasElement = CanvasElement_1.default;
const CanvasText_1 = __importDefault(require("./lib/canvas_elements/CanvasText"));
exports.CanvasText = CanvasText_1.default;
const CanvasElementType_1 = require("./lib/enums/CanvasElementType");
Object.defineProperty(exports, "CanvasElementType", { enumerable: true, get: function () { return CanvasElementType_1.CanvasElementType; } });
exports.default = Colladraw_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQXdDO0FBQ3hDLHdFQUFnRDtBQVc1QyxnQkFYRyxlQUFLLENBV0g7QUFWVCxnRkFBd0Q7QUFXcEQsb0JBWEcsbUJBQVMsQ0FXSDtBQVZiLDRFQUFvRDtBQVdoRCxrQkFYRyxpQkFBTyxDQVdIO0FBVlgsNEVBQW9EO0FBV2hELGtCQVhHLGlCQUFPLENBV0g7QUFWWCw4RUFBc0Q7QUFXbEQsbUJBWEcsa0JBQVEsQ0FXSDtBQVZaLHdGQUFnRTtBQVc1RCx3QkFYRyx1QkFBYSxDQVdIO0FBVmpCLGtGQUEyRDtBQVd2RCxxQkFYRyxvQkFBVSxDQVdIO0FBVmQscUVBQWdFO0FBVzVELGtHQVhJLHFDQUFpQixPQVdKO0FBVHJCLGtCQUFlLG1CQUFTLENBQUMifQ==