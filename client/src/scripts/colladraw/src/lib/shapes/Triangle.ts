import Polygon from "./Polygon";

export default class Triangle extends Polygon {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height, 3, 'Triangle');
  }

  getCoordinates(startX: number = this.x, startY: number = this.y): number[][] {
    return [
      [startX, startY],
      [startX + this.width, startY],
      [startX + this.width / 2, startY + this.height]
    ];
  }
}
