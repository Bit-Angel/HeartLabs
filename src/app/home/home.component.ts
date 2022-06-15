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
      calle:"Calle",
      colonia:"Colonia",
      numero:"#numero",
      telefono:"telefono",
      latitude:32.1724597,
      longitude:119.0330871,
      title:"Japan"
    },
    {
      calle:"Calle",
      colonia:"Colonia",
      numero:"#numero",
      telefono:"telefono",
      latitude:36.2115201,
      longitude:-113.7164387,
      title:"USA"
    },
    {
      calle:"Calle",
      colonia:"Colonia",
      numero:"#numero",
      telefono:"telefono",
      latitude:-25.0270548,
      longitude:115.1824598,
      title:"Australia"
    }
  ]

  secondSize:Observable<number>
  firstSize:Observable<number>
  thirdSize:Observable<number>
  fourthSize:Observable<number>
  constructor(private accessibility:AccessibilityService) {
    this.secondSize = this.accessibility._size
    this.firstSize = this.accessibility._size2
    this.thirdSize = this.accessibility._size3
    this.fourthSize = this.accessibility._size4
  }

  ngOnInit(): void {
    AOS.init({
      duration: 962,
    })
    
  }

}


interface ICards{
  calle:string
  colonia:string
  numero:string
  telefono:string
  latitude:number
  longitude:number,
  title:string;
}