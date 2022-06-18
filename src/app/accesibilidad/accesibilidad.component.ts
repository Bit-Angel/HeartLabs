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
  fifthSize=30
  sixthSize=16.5
  constructor(
    private accesibility:AccessibilityService,
  ) { }

  ngOnInit(): void {
    const loadedData = this.getData();
    const user = localStorage.getItem("NombreUsuario");
    if(!user){
      return
    }
    console.log(loadedData[user])
    if(loadedData[user]){
      const {secondSize,
        firstSize,
        thirdSize,
        fourthSize,
        fifthSize,sixthSize} = loadedData[user];

        this.secondSize = secondSize
        this.firstSize = firstSize
        this.thirdSize = thirdSize
        this.fourthSize = fourthSize
        this.fifthSize = fifthSize
        this.sixthSize = sixthSize
        this.accesibility.updateSize(this.secondSize,this.firstSize,this.thirdSize,this.fourthSize,this.fifthSize,this.sixthSize)
    }
  }

  getData(){
    const data = localStorage.getItem("accessibility") || '{}'
    const obj = JSON.parse(data)
    return obj
  }

  size() {
    console.log("here")
    this.secondSize=this.secondSize+.1;
    this.firstSize=this.firstSize+.1
    this.thirdSize=this.thirdSize+.1
    this.fourthSize=this.fourthSize+.1
    this.fifthSize=this.fifthSize+.1
    this.sixthSize=this.sixthSize+.1
    this.accesibility.updateSize(this.secondSize,this.firstSize,this.thirdSize,this.fourthSize,this.fifthSize,this.sixthSize)
    this.updateData()
  }

  updateData(){
    const user = localStorage.getItem("NombreUsuario");
    if(!user){
      return
    }
    let loadedData = this.getData();
   
    loadedData[user] = {
      secondSize:this.secondSize,
      firstSize:this.firstSize,
      thirdSize:this.thirdSize,
      fourthSize:this.fourthSize,
      fifthSize:this.fifthSize,
      sixthSize:this.sixthSize
    }
    this.saveData(loadedData)
  }

  saveData(obj){
    console.log("save")
    localStorage.setItem("accessibility",JSON.stringify(obj || {}))
  }

}
