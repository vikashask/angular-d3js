import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-svg-ex1',
  templateUrl: './svg-ex1.component.html',
  styleUrls: ['./svg-ex1.component.css']
})
export class SvgEx1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    var width = 200;
    var height = 200;
    var svg = d3.select('#svgcontainer')
       .append('svg').attr('width', width).attr('height', height);

       svg.append('line')
       .attr('x1', 0)
       .attr('y1', 100)
       .attr('x2', 200) 
       .attr('y2', 200)
       .style('stroke', 'rgb(255,0,0)')
       .style('stroke-width', 2);

  }

}
