import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  transparenteBool: boolean = true;
  x = fromEvent(document, 'scroll');
  otherScroll = window.pageYOffset;

  constructor() {
    this.x.subscribe( (resp: any) => {
      const scroll = resp.target.documentElement.scrollTop;

      if(scroll < 80){
        this.transparenteBool = false;
      }

      if(scroll < this.otherScroll){
        this.transparenteBool = true;
      }

      this.otherScroll = scroll;
    });
  }

  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }

}
