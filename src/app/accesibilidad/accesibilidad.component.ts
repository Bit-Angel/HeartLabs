import { Component, OnInit,Input } from '@angular/core';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css']
})
export class AccesibilidadComponent implements OnInit {
  secondSize = 50;
  firstSize=20
  thirdSize=23
  fourthSize=16
  constructor(
    private accesibility:AccessibilityService
  ) { }

  ngOnInit(): void {
  }


  size() {
    console.log("here")
    this.secondSize=this.secondSize+.5;
    this.firstSize=this.firstSize+.5
    this.thirdSize=this.thirdSize+.5
    this.fourthSize=this.fourthSize+.5
    this.accesibility.updateSize(this.secondSize,this.firstSize,this.thirdSize,this.fourthSize)
  }

}
