import Polygon from "./Polygon";
export default class Rectangle extends Polygon {
    constructor(x: number, y: number, width: number, height: number);
    getCoordinates(startX?: number, startY?: number): number[][];
}
