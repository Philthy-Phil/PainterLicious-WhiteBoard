import { Component, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/shared/drawing.service';

@Component({
  selector: 'app-line-amplifier',
  templateUrl: './line-amplifier.component.html',
  styleUrls: ['./line-amplifier.component.scss'],
})
export class LineAmplifierComponent implements OnInit {

  thickness: number = 0;

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.thickness = this.drawingService.getThickness();
  }

  setThickness(): void {
    this.drawingService.setThickness(this.thickness);
  }
}
