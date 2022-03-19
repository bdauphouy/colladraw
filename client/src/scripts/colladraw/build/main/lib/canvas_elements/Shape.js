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
    draw(context, _draw = () => { }) {
        context.lineWidth = this.strokeWidth || 0;
        context.strokeStyle = this.strokeColor || '#000';
        context.fillStyle = this.fillColor || '#000';
        context.beginPath();
        _draw();
        context.closePath();
        super.draw(context);
    }
}
exports.default = Shape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9FQUE0QztBQUU1QyxNQUE4QixLQUFNLFNBQVEsdUJBQWE7SUFLdkQsWUFBc0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUN2RSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQyxFQUFFLFFBQWtCLEdBQUcsRUFBRSxHQUFFLENBQUM7UUFDaEUsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUM7UUFFN0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBCLEtBQUssRUFBRSxDQUFDO1FBRVIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBeEJELHdCQXdCQyJ9