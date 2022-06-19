import { Component, OnInit,Input } from '@angular/core';
import { AccessibilityService } from '../services/accessibility.service';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.css']
})
export class AccesibilidadComponent implements OnInit {
  
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

        this.accesibility.secondSize = secondSize
        this.accesibility.firstSize = firstSize
        this.accesibility.thirdSize = thirdSize
        this.accesibility.fourthSize = fourthSize
        this.accesibility.fifthSize = fifthSize
        this.accesibility.sixthSize = sixthSize
        this.accesibility.updateSize(this.accesibility.secondSize,this.accesibility.firstSize,this.accesibility.thirdSize,this.accesibility.fourthSize,this.accesibility.fifthSize,this.accesibility.sixthSize)
    }
  }

  getData(){
    const data = localStorage.getItem("accessibility") || '{}'
    const obj = JSON.parse(data)
    return obj
  }

  size() {
    console.log("here")
    this.accesibility.secondSize=this.accesibility.secondSize+.1;
    this.accesibility.firstSize=this.accesibility.firstSize+.1
    this.accesibility.thirdSize=this.accesibility.thirdSize+.1
    this.accesibility.fourthSize=this.accesibility.fourthSize+.1
    this.accesibility.fifthSize=this.accesibility.fifthSize+.1
    this.accesibility.sixthSize=this.accesibility.sixthSize+.1
    this.accesibility.updateSize(this.accesibility.secondSize,this.accesibility.firstSize,this.accesibility.thirdSize,this.accesibility.fourthSize,this.accesibility.fifthSize,this.accesibility.sixthSize)
    this.updateData()
  }

  updateData(){
    const user = localStorage.getItem("NombreUsuario");
    if(!user){
      return
    }
    let loadedData = this.getData();
   
    loadedData[user] = {
      secondSize:this.accesibility.secondSize,
      firstSize:this.accesibility.firstSize,
      thirdSize:this.accesibility.thirdSize,
      fourthSize:this.accesibility.fourthSize,
      fifthSize:this.accesibility.fifthSize,
      sixthSize:this.accesibility.sixthSize
    }
    this.saveData(loadedData)
  }

  saveData(obj){
    console.log("save")
    localStorage.setItem("accessibility",JSON.stringify(obj || {}))
  }

}
