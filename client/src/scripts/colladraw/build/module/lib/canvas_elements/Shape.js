import CanvasElement from "./CanvasElement.js";
export default class Shape extends CanvasElement {
    fillColor;
    strokeColor;
    strokeWidth;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFnQixLQUFNLFNBQVEsYUFBYTtJQUN2RCxTQUFTLENBQVU7SUFDbkIsV0FBVyxDQUFVO0lBQ3JCLFdBQVcsQ0FBVTtJQUVyQixZQUFzQixDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDLEVBQUUsUUFBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUNoRSxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztRQUU3QyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==