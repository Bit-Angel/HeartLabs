import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

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
  }

}
