import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-svg-rectangle',
  templateUrl: './svg-rectangle.component.html',
  styleUrls: ['./svg-rectangle.component.css']
})
export class SvgRectangleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const height = 100;
    const width = 100;
    // creating SVG element
    var svg = d3.select('#svgcontainer')
    .append('svg')
    .attr('width',width)
    .attr('height',height);

    // create and append rectangle element
    svg.append('rect')
    .attr('x',20)
    .attr('y',20)
    .attr('width',50)
    .attr('height',50)
    .attr('fill','green');

  }

}
