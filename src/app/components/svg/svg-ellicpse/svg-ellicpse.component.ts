import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-svg-ellicpse',
  templateUrl: './svg-ellicpse.component.html',
  styleUrls: ['./svg-ellicpse.component.css']
})
export class SvgEllicpseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const width = 300;
    const height = 300;
    const svg = d3.select('#svgcontainer')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    svg.append('ellipse')
      .attr('cx',200)
      .attr('cy',50)
      .attr('rx',100)
      .attr('ry',50)
      .attr('fill','green');
  }

}
