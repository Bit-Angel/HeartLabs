import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})


export class ConocenosComponent implements OnInit {

  // pers:any = [];
  pers:any = {
    email:'',
    message:''
  }
  private a:string;
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }
  enviarEmail(){
    this.httpClient.post('http://localhost:4300/conocenos',this.pers).subscribe(res=>{
      console.log(res);
    });
  };

}
