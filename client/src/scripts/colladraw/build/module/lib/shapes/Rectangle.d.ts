import Polygon from "./Polygon";
import { ExportShape } from "../../types/ExportCanvas";
export default class Rectangle extends Polygon {
    constructor(x: number, y: number, width: number, height: number);
    getCoordinates(startX?: number, startY?: number): number[][];
    static fromJSON(json: ExportShape): Rectangle;
}
