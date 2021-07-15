import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawingService } from 'src/app/shared/drawing.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement> | any;
  ctx: CanvasRenderingContext2D | any;

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
    
    this.drawingService.windowResize();

    this.drawingService.setCtx(this.ctx);
    this.drawingService.setCanvasRef(this.canvasRef);
    
  }
  
  onClick(event: any): void {
    this.drawingService.setMouse(event);
    this.drawingService.drawCircle();
  }

  drawing(event: any): void {
    this.drawingService.setMouse(event);
    this.drawingService.drawCircle();
  }
  
  startDrawing(event: any): void {
    this.drawingService.startDrawing(event);
  }
  
  stopDrawing(event: any): void {
    this.drawingService.stopDrawing(event);
  }

  ngAfterViewInit(): void {} 
}