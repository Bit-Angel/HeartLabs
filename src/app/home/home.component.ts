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
