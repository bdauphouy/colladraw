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
}
