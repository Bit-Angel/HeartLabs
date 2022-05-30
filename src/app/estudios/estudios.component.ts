import { Component, OnInit } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  misEstudios:Estudio[] = [];

  constructor(public miServicio:EstudiosService) { }

  ngOnInit(): void {
    this.misEstudios = this.miServicio.getEstudio();
  }

}
