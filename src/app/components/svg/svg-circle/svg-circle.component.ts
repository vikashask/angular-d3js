import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-svg-circle',
  templateUrl: './svg-circle.component.html',
  styleUrls: ['./svg-circle.component.css']
})
export class SvgCircleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const width = 300;
    const height = 300;
    const svg = d3.select('#svgcontainer')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // append circle
    svg.append('circle')
      .attr('cx', 200)
      .attr('cy', 50)
      .attr('r', 20)
      .attr('fill', 'green');

  }

}
