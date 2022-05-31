import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  bandera:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  myFunc(){
    if(this.bandera){
      this.bandera = false;
    }else{
      this.bandera = true;
    }
  }

}
