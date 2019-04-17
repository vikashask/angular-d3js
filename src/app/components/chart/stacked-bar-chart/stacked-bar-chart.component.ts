import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

import { SAMPLE_DATA } from '../../../shared/data04';


export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-stacked-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {


  title = 'Stacked Bar Chart';

  private margin: Margin;

  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type

  private x: any;
  private y: any;
  private z: any;
  private g: any;

  constructor() { }

  ngOnInit() {
    this.initMargins();
    this.initSvg();
    this.drawChart(SAMPLE_DATA);

  }

  private initMargins() {
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
  }

  private initSvg() {
    this.svg = d3.select('#stacked-bar-chart');

    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.x = d3Scale.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.05)
      .align(0.1);
    this.y = d3Scale.scaleLinear()
      .rangeRound([this.height - 100, 0]);
    this.z = d3Scale.scaleOrdinal()
      .range(['red', 'blue', 'green', 'black', '#a05d56', '#d0743c', '#ff8c00']);
  }

  private drawChart(data: any[]) {

    let keys = Object.getOwnPropertyNames(data[0]).slice(1);

    data = data.map(v => {
      v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
      return v;
    });
    data.sort((a: any, b: any) => b.total - a.total);

    this.x.domain(data.map((d: any) => d.State));
    this.y.domain([0, d3Array.max(data, (d: any) => d.total)]).nice();
    this.z.domain(keys);

    this.g.append('g')
      .selectAll('g')
      .data(d3Shape.stack().keys(keys)(data))
      .enter().append('g')
      .attr('fill', d => this.z(d.key))
      .selectAll('rect')
      .data(d => d)
      .text('Pop')
      .enter()

      .append('rect')
      .attr('x', d => this.x(d.data.State))
      .attr('y', d => this.y(d[1]))
      .attr('height', d => this.y(d[0]) - this.y(d[1]))
      .attr('width', this.x.bandwidth() - 10);

    this.g.append('g')
      .selectAll('g')
      .data(d3Shape.stack().keys(keys)(data))
      .enter().append('g')
      .attr('fill', d => this.z(d.key))
      .selectAll('rect')
      .data(d => d)

      // writing label in rec
      .enter()
      .append('g')
      .append('text')
      .text((d, i) => {
        // console.log('data',d.data);
        return 'abc';
      })
      .attr('x', d => {
        return this.x(d.data.State) + this.x.bandwidth() / 2 - 10
      }
      )
      .attr('y', d => {
        let height = this.y(d[0]) - this.y(d[1]);
        let y = this.y(d[1]);
        let final = y + height / 2;
        return final;
      }
      )
      .attr('fill', 'white');

    // drar x axis
    this.g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (this.height - 100) + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
      .attr('class', 'axis')
      .call(d3Axis.axisLeft(this.y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', this.y(this.y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')

    // Y axix text
    this.g.append('text')
      .attr('x', -140)
      .attr('y', -30)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('(Millions)');


    // creating a line below chart
    this.g.append('g')
      .append('line')
      .attr("x1", (d) => {
        return this.x(data[0].State);
      })
      .attr("y1", this.height - 60)
      .attr("x2", d => {
        return this.x(data[data.length - 1].State) + 200;
      })
      .attr("y2", this.height - 60)
      .attr('stroke', 'gray')
      .attr('stroke-width', 2);

    // creating text below line
    // <text x="50" y="50" font-family="sans-serif" font-size="12px" fill="red">Circle<text>
    this.g.append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => {
        return this.x(d.State) + 50;
      }
      )
      .attr('y', 410)
      .text(d => d.State)

    // appending text
    this.g.append('text')
      .data(data)
      .attr('x', d => {
        console.log(d);
        return this.x(d.State)
      }
      )
      .attr('y', 410)
      .text("limits")

    // subhakaer
    // used for short note in right side
    // let legend = this.g.append('g')
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 10)
    //   .attr('text-anchor', 'end')
    //   .selectAll('g')
    //   .data(keys.slice().reverse())
    //   .enter().append('g')
    //   .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    // legend.append('rect')
    //   .attr('x', this.width - 19)
    //   .attr('width', 40)
    //   .attr('height', 19)
    // .attr('transform', (d, i) => 'translate(0,400)')
    // .attr('fill', this.z);

    // legend.append('text')
    //   .attr('x', this.width - 24)
    //   .attr('y', 9.5)
    //   .attr('dy', '0.32em')
    //   .text(d => d);

  }
  drawLine() {
    
  }

}
