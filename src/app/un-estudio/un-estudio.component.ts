import { Component, OnInit, Input  } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-estudio',
  templateUrl: './un-estudio.component.html',
  styleUrls: ['./un-estudio.component.css']
})
export class UnEstudioComponent implements OnInit {
  @Input() estudio!: Estudio;
  cita:string;
  formulario:boolean;
  constructor(public estudiosService:EstudiosService, public activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe ( params => {
      this.estudio=estudiosService.getUnEstudio(params['id']);
    })
   }

  ngOnInit(): void {
  }

  agendarCita(){
    console.log(this.estudio);
    console.log(this.cita);
    this.estudio.fecha =this.cita;
    

  }

}
