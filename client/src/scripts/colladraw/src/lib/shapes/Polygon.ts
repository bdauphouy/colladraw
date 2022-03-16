import Shape from "./Shape";

export default class Polygon extends Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  sidesNumber: number;
  polygonName?: string;

  getCoordinates(startX = this.x, startY = this.y): number[][] {
    const coordinates: number[][] = [];
    for (let i = 0; i < this.sidesNumber; i++) {
      coordinates.push([startX + this.width * Math.cos(i * 2 * Math.PI / this.sidesNumber), startY + this.height * Math.sin(i * 2 * Math.PI / this.sidesNumber)]);
    }
    return coordinates;
  }

  draw(context: CanvasRenderingContext2D) {
    const coordinates = this.getCoordinates();

    context.beginPath();
    context.moveTo(coordinates[0][0], coordinates[0][1]);

    [...coordinates.slice(1, coordinates.length), coordinates[0]].forEach(([x, y]) => {
      context.lineTo(x, y);
      context.stroke(); // TODO: adjust according to what is in the state
    });

    context.closePath();
  }

  get formatted() {
    return (this.polygonName ?? `Polygon[${this.sidesNumber}]`) + `: ${this.x}, ${this.y}, ${this.width}, ${this.height}`;
  }
}
