import { Component, ElementRef, OnInit } from "@angular/core";
import { DrawingService } from "src/app/shared/drawing.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  constructor(private drawingService: DrawingService) {}

  downloadURL: string = "";

  canvasRef: ElementRef<HTMLCanvasElement> | any;

  ngOnInit(): void {}

  downloadIMG(event: any) {
    // event.preventDefault();
    let canvas = document.getElementsByTagName("canvas");
    let imgSrc = canvas[0].toDataURL("image/jpg");
    
    this.downloadURL = imgSrc;

  }
}
