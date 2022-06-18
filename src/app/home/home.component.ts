import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Observable } from 'rxjs';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards:ICards[] = [
    {
      calle:" Av. José María Chávez",   
      cp:"20270",
      numero:"1202",
      telefono:"449 913 9022",
      latitude:21.8659117,
      longitude:-102.2959638,
      title:"Clinica 1"
    },
    {
      calle:" Av. de, Los Conos",     
      cp:"20190",
      numero:"102",
      telefono:"449 970 3660",
      latitude:21.877102,
      longitude:-102.254862,
      title:"Clinica 2"
    },
    {
      calle:" Av. Prolongacion Zaragoza",   
      cp:"20908",
      numero:"905",
      telefono:"449 153 5900",
      latitude:21.938973,
      longitude:-102.307677,
      title:"Clinica 3"
    }
  ]

  secondSize:Observable<number>
  firstSize:Observable<number>
  thirdSize:Observable<number>
  fourthSize:Observable<number>
  fifthSize:Observable<number>
  sixthSize:Observable<number>
  constructor(private accessibility:AccessibilityService) {
    this.secondSize = this.accessibility._size
    this.firstSize = this.accessibility._size2
    this.thirdSize = this.accessibility._size3
    this.fourthSize = this.accessibility._size4
    this.fifthSize = this.accessibility._size5
    this.sixthSize = this.accessibility._size6
  }

  ngOnInit(): void {
    AOS.init({
      duration: 962,
    })
    
  }

}


interface ICards{
  calle:string
  cp:string
  numero:string
  telefono:string
  latitude:number
  longitude:number,
  title:string;
}