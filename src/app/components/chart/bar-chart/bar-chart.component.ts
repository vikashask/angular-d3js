import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // declaring variable
    const data = [10, 5, 12, 15];
    const width = 300,
      scaleFactor = 20,
      barHeight = 30;

    // appending svg element
    const graph = d3.select('p')
      .append('svg')
      .attr('width', width)
      .attr('height', barHeight * data.length);

    // Apply transformation
    const bar = graph.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * barHeight + ')';
      });

    // append reactangle element to the bar
    bar.append('rect')
      .attr('width', function (d) {
        return d * scaleFactor;
      })
      .attr('height', barHeight - 1);

    // displaying data
    bar.append('text')
      .attr('x', function (d) { return (d * scaleFactor); })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(function (d) { return d; });

  }

}
