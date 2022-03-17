import Shape from "./Shape";
import {CanvasGrid} from "../../types/CanvasGrid";

export default class Polygon extends Shape {
  sidesNumber: number;
  polygonName?: string;
  private coordinates: number[][];

  getCoordinates(startX = this.x, startY = this.y): number[][] {
    const coordinates: number[][] = [];
    for (let i = 0; i < this.sidesNumber; i++) {
      coordinates.push([startX + this.width * Math.cos(i * 2 * Math.PI / this.sidesNumber), startY + this.height * Math.sin(i * 2 * Math.PI / this.sidesNumber)]);
    }
    return coordinates;
  }

  generateGrid(canvasGrid: CanvasGrid): void {
    for (let i = Math.min(...this.coordinates.map(coordinate => coordinate[0])); i <= Math.max(...this.coordinates.map(coordinate => coordinate[0])); i++) {
      for (let j = Math.min(...this.coordinates.map(coordinate => coordinate[1])); j <= Math.max(...this.coordinates.map(coordinate => coordinate[1])); j++) {
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

  get formatted() {
    return (this.polygonName ?? `Polygon[${this.sidesNumber}]`) + `: ${this.x}, ${this.y}, ${this.width}, ${this.height}`;
  }
}
