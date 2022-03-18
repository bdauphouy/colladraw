"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Polygon_1 = __importDefault(require("./Polygon"));
class Rectangle extends Polygon_1.default {
    constructor(x, y, width, height) {
        super(x, y, width, height, 4, 'Rectangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width, startY + this.height],
            [startX, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Rectangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
exports.default = Rectangle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jYW52YXNfZWxlbWVudHMvUmVjdGFuZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBR2hDLE1BQXFCLFNBQVUsU0FBUSxpQkFBTztJQUM1QyxZQUFZLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDN0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQWlCLElBQUksQ0FBQyxDQUFDO1FBQzdELE9BQU87WUFDTCxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDN0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaUI7UUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNyQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQXJCRCw0QkFxQkMifQ==