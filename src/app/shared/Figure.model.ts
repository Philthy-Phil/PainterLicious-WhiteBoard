import { Point } from "./Point.model";

export class Figure {
  points: Point[];

  constructor() {
    this.points = [];
  }

  add(x: number, y: number, clr: string, size: number): void {
    this.points.push(new Point(x, y, clr, size));
  }
}
