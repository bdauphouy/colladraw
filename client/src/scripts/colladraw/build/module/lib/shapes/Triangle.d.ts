import Polygon from "./Polygon";
export default class Triangle extends Polygon {
    constructor(x: number, y: number, width: number, height: number);
    getCoordinates(startX?: number, startY?: number): number[][];
}
