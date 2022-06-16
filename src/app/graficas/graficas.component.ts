import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  barChartData: ChartDataset[] = [
    { data: [12, 72, 78, 75, 17, 75], label: 'Estudios con Doctor.' },
    { data: [85, 12, 28, 75, 17, 75], label: 'Estudios sin Doctor' },
  ];

  barChartLabels: BaseChartDirective["labels"] = ['January', 'February', 'March', 'April', 'May', 'June'];

  barChartOptions = { responsive: true};
  barChartColors: Color[] = [];
  barChartLegend = true;
  barChartPluggins = [];
  barChartType: ChartType = 'bar';



  constructor() { }

  ngOnInit(): void {
  }

  refresh(){

    this.barChartData = [
      { data: [Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
      ], label: 'Estudios con Doctor' },
      { data: [Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0
      ], label: 'Estudios sin Doctor' },
    ];
  }

}
