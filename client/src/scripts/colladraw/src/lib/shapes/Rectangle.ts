import Polygon from "./Polygon";

export default class Rectangle extends Polygon {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height, 4, 'Rectangle');
  }

  getCoordinates(startX: number = this.x, startY: number = this.y): number[][] {
    return [
      [startX, startY],
      [startX + this.width, startY],
      [startX + this.width, startY + this.height],
      [startX, startY + this.height]
    ];
  }
}
