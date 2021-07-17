import { Injectable, ElementRef, OnInit } from "@angular/core";
import { Figure } from "./Figure.model";

@Injectable({
  providedIn: "root",
})
export class DrawingService implements OnInit {
  clrPaletteList: any[] = [
    { clrName: "white", clrDef: "#FFFFFF" },
    { clrName: "black", clrDef: "#000000" },
    { clrName: "lightergrey", clrDef: "#d3d3d3d3" },
    { clrName: "lightgrey", clrDef: "#7f7f7f" },
    { clrName: "red", clrDef: "#ff0000" },
    { clrName: "lightred", clrDef: "#fdafc9" },
    { clrName: "orange", clrDef: "#ffa800" },
    { clrName: "lightorange", clrDef: "#ffc90d" },
    { clrName: "yellow", clrDef: "#ffff00" },
    { clrName: "lightyellow", clrDef: "#efe3af" },
    { clrName: "green", clrDef: "#23b14d" },
    { clrName: "lightgreen", clrDef: "#b6e519" },
    { clrName: "skyblue", clrDef: "#00a2ed" },
    { clrName: "lightskyblue", clrDef: "#9ad9ea" },
    { clrName: "blue", clrDef: "#3f47cc" },
    { clrName: "lightblue", clrDef: "#7092bf" },
    { clrName: "violet", clrDef: "#a24a9e" },
    { clrName: "lightviolet", clrDef: "#c7bfe6" },
  ];

  drawingStatus: boolean = false;
  selectedColor: string = "#000000";
  selectedSize: number = 10;

  canvasRef: ElementRef<HTMLCanvasElement> | any;
  ctx: CanvasRenderingContext2D | any;

  mouse: any = { x: undefined, y: undefined };

  // collection of all figures
  figures: Figure[] = [];

  // actual draw
  currentFigure: Figure = new Figure();

  constructor() {}

  ngOnInit(): void {}

  selectColor(color: string): void {
    this.selectedColor = color;

    if (color !== "#FFFFFF") {
      console.log(
        `%c selectedColor => ${this.selectedColor}`,
        `background: ${color};color: white`
      );
    } else {
      console.log(
        `%c selectedColor => ${this.selectedColor}`,
        `background: ${color};color: black`
      );
    }
  }

  windowResize(): void {
    window.addEventListener("resize", () => {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;

      this.drawingPath();

      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      
      this.figures.forEach((figure) => {

        this.ctx.beginPath();
        
        if (figure.points.length > 0) {
          this.ctx.strokeStyle = figure.points[0].clr;
          this.ctx.lineWidth = figure.points[0].size;
          this.ctx.moveTo(figure.points[0].x, figure.points[0].y);
          this.ctx.lineTo(figure.points[0].x, figure.points[0].y);
          this.ctx.stroke();
        }

        figure.points.forEach(point => {
          this.ctx.lineTo(point.x, point.y);
          this.ctx.moveTo(point.x, point.y);
          this.ctx.strokeStyle = point.clr;
          this.ctx.lineWidth = point.size;
          this.ctx.stroke();
        });

        this.ctx.closePath();
      });
    });
  }

  drawingPath() {
    if (!this.drawingStatus) {
      return;
    }
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.lineWidth = this.selectedSize;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.stroke();
  }

  startDrawing(event: any): void {
    this.drawingStatus = true;
    this.ctx.beginPath();
    this.currentFigure = new Figure();
  }

  stopDrawing(event: any): void {
    this.figures.push(this.currentFigure);
    this.drawingStatus = false;
  }

  /**
   *
   * @returns different variables & methods (getters & setters)
   */

  getSelectedColor(): string {
    return this.selectedColor;
  }

  getClrPaletteList(): any[] {
    return this.clrPaletteList;
  }

  setMouse(event: any): void {
    if (!this.drawingStatus) {
      return;
    }
    this.mouse.x = event.x;
    this.mouse.y = event.y;

    this.currentFigure.add(
      this.mouse.x,
      this.mouse.y,
      this.selectedColor,
      this.selectedSize
    );
  }

  getMouse(): void {
    return this.mouse;
  }

  setCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.canvasRef = canvasRef;
  }

  setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  getCanvasRef(): void {
    return this.canvasRef;
  }

  getCtx(): void {
    return this.ctx;
  }

  setThickness(value: number): void {
    this.selectedSize = value;
  }

  getThickness(): number {
    return this.selectedSize;
  }
}