import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  controlShow: boolean = true;

  secondSize:Observable<number>
  firstSize:Observable<number>
  thirdSize:Observable<number>
  fourthSize:Observable<number>
  fifthSize:Observable<number>

  constructor(private router: Router,private accessibility:AccessibilityService ) {
    if(this.router.url == 'http://localhost:4200/login'){
      this.controlShow = false;
    }
    this.secondSize = this.accessibility._size
    this.firstSize = this.accessibility._size2
    this.thirdSize = this.accessibility._size3
    this.fourthSize = this.accessibility._size4
    this.fifthSize = this.accessibility._size5
  }

  ngOnInit(): void {
  }



}
