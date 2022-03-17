import Polygon from "./Polygon";

export default class Triangle extends Polygon {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sidesNumber = 3;
    this.polygonName = "Triangle";
  }

  getCoordinates(startX: number = this.x, startY: number = this.y): number[][] {
    return [
      [startX, startY],
      [startX + this.width, startY],
      [startX + this.width / 2, startY + this.height]
    ];
  }
}
