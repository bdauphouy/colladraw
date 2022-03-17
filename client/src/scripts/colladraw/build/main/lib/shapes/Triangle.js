"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Polygon_1 = __importDefault(require("./Polygon"));
class Triangle extends Polygon_1.default {
    constructor(x, y, width, height) {
        super(x, y, width, height, 3, 'Triangle');
    }
    getCoordinates(startX = this.x, startY = this.y) {
        return [
            [startX, startY],
            [startX + this.width, startY],
            [startX + this.width / 2, startY + this.height]
        ];
    }
    static fromJSON(json) {
        const rectangle = new Triangle(json.x, json.y, json.width, json.height);
        rectangle.fillColor = json.fillColor;
        rectangle.strokeColor = json.strokeColor;
        rectangle.strokeWidth = json.strokeWidth;
        return rectangle;
    }
}
exports.default = Triangle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJpYW5nbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3NoYXBlcy9UcmlhbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUdoQyxNQUFxQixRQUFTLFNBQVEsaUJBQU87SUFDM0MsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzdELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFpQixJQUFJLENBQUMsQ0FBQztRQUM3RCxPQUFPO1lBQ0wsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ2hCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQzdCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2hELENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFpQjtRQUMvQixNQUFNLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEUsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBcEJELDJCQW9CQyJ9