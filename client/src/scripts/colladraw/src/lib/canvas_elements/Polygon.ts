import Shape from "./Shape";
import {CanvasGrid} from "../../types/CanvasGrid";
import {ExportShape} from "../../types/ExportCanvas";
import {PolygonTypeString} from "../enums/CanvasElementType";

export default class Polygon extends Shape {
  sidesNumber: number;
  polygonName?: PolygonTypeString;
  private coordinates: number[][];

  constructor(x: number, y: number, width: number, height: number, sidesNumber: number, polygonName?: PolygonTypeString) {
    super(x, y, width, height);
    this.sidesNumber = sidesNumber;
    this.polygonName = polygonName;
  }

  getCoordinates(startX = this.x, startY = this.y): number[][] {
    const coordinates: number[][] = [];
    for (let i = 0; i < this.sidesNumber; i++) {
      coordinates.push([startX + this.width * Math.cos(i * 2 * Math.PI / this.sidesNumber), startY + this.height * Math.sin(i * 2 * Math.PI / this.sidesNumber)]);
    }
    return coordinates;
  }

  generateGrid(canvasGrid: CanvasGrid): void {
    for (let i = Math.min(...this.coordinates.map(coordinate => coordinate[1])); i <= Math.max(...this.coordinates.map(coordinate => coordinate[1])); i++) {
      for (let j = Math.min(...this.coordinates.map(coordinate => coordinate[0])); j <= Math.max(...this.coordinates.map(coordinate => coordinate[0])); j++) {
        canvasGrid[i][j] = this;
      }
    }
  }

  draw(context: CanvasRenderingContext2D, canvasGrid: CanvasGrid) {
    this.coordinates = this.getCoordinates();

    super.draw(context, canvasGrid, () => {
      context.moveTo(this.coordinates[0][0], this.coordinates[0][1]);

      [...this.coordinates.slice(1, this.coordinates.length), this.coordinates[0]].forEach(([x, y]) => {
        context.lineTo(x, y);
        context.stroke();
        context.fill();
      });
    });
  }

  toJSON() {
    return {
      type: this.polygonName ?? `Polygon[${this.sidesNumber}]` as `Polygon[${number}]`,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    };
  }

  static fromJSON(json: ExportShape): Polygon {
    if (json.type === 'Ellipse' || json.type === 'Pencil') {
      throw new Error('Cannot convert ellipse to polygon');
    }

    const polygon = new Polygon(json.x, json.y, json.width, json.height, parseInt(json.type.match(/\d+/)[0]), json.type);
    polygon.fillColor = json.fillColor;
    polygon.strokeColor = json.strokeColor;
    polygon.strokeWidth = json.strokeWidth;
    return polygon;
  }
}
