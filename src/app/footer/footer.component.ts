import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  controlShow: boolean = true;

  constructor(private router: Router ) {
    if(this.router.url == 'http://localhost:4200/login'){
      this.controlShow = false;
    }

  }

  ngOnInit(): void {
  }



}
