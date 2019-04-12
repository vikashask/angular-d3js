import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-ex2',
  templateUrl: './ex2.component.html',
  styleUrls: ['./ex2.component.css']
})
export class Ex2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.select('#list2').selectAll('li')
   .data([10, 20, 30, 25, 15])
   .text(function(d) { return 'This is pre-existing element and the value is ' + d; })
   .enter()
   .append('li')
   .text(function(d) 
      { return 'This is dynamically created element and the value is ' + d; });
  }

}
