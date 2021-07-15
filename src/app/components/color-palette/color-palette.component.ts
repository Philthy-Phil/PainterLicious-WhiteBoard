import { Component, OnInit } from '@angular/core';
import { DrawingService } from 'src/app/shared/drawing.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements OnInit {
  
  clrPaletteList: any[] = [];

  selectedColor: string = "";

  constructor(private drawingService: DrawingService) {
    this.clrPaletteList = this.drawingService.getClrPaletteList();
  }

  ngOnInit(): void {
    this.selectedColor = this.drawingService.getSelectedColor();

    if (this.selectedColor !== '#FFFFFF') {
      console.log(
        `%c selectedColor => ${this.selectedColor}`,
        `background: ${this.selectedColor};color: white`
      );
    } else {
      console.log(
        `%c selectedColor => ${this.selectedColor}`,
        `background: ${this.selectedColor};color: black`
      );
    }
  }

  onClickChangeColor(color: string) {
    this.drawingService.selectColor(color);
  }
}
