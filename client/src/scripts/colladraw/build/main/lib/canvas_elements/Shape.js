"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasElement_1 = __importDefault(require("./CanvasElement"));
class Shape extends CanvasElement_1.default {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.width = width;
        this.height = height;
    }
    draw(context, canvasGrid, _draw = () => { }) {
        context.lineWidth = this.strokeWidth || 0;
        context.strokeStyle = this.strokeColor || '#000';
        context.fillStyle = this.fillColor || '#000';
        context.beginPath();
        _draw();
        context.closePath();
        this.generateGrid(canvasGrid);
        super.draw(context, canvasGrid);
    }
}
exports.default = Shape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUE0QztBQUU1QyxNQUE4QixLQUFNLFNBQVEsdUJBQWE7SUFLdkQsWUFBc0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUN2RSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQyxFQUFFLFVBQXNCLEVBQUUsUUFBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUN4RixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztRQUU3QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU5QixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7QUExQkQsd0JBMEJDIn0=