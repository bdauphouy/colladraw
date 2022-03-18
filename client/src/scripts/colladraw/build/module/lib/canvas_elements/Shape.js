import CanvasElement from "./CanvasElement.js";
export default class Shape extends CanvasElement {
    fillColor;
    strokeColor;
    strokeWidth;
    constructor(x, y, width, height) {
        super(x, y);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2NhbnZhc19lbGVtZW50cy9TaGFwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxNQUFNLENBQUMsT0FBTyxPQUFnQixLQUFNLFNBQVEsYUFBYTtJQUN2RCxTQUFTLENBQVU7SUFDbkIsV0FBVyxDQUFVO0lBQ3JCLFdBQVcsQ0FBVTtJQUVyQixZQUFzQixDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlDLEVBQUUsVUFBc0IsRUFBRSxRQUFrQixHQUFHLEVBQUUsR0FBRSxDQUFDO1FBQ3hGLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQztRQUNqRCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwQixLQUFLLEVBQUUsQ0FBQztRQUVSLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRiJ9