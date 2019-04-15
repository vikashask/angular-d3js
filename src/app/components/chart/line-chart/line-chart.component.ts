import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%d/%m/%y"),
      bisectDate = d3.bisector(function (d) { return d.module; }).left;

    var clinicalCutOffValue = 70;

    var x = d3.scaleLinear().range([0, width - (margin.left + margin.right)]);
    var y = d3.scaleLinear().range([height - (margin.top * 2), 0]);

    var line = d3.line()
      .x(function (d) { return x(d.module); })
      .y(function (d) { return y(d.value); });

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("/assets/line-chart-data.json", function (error, data) {
      if (error) throw error;

      data.forEach(function (d) {
        d.value = +d.value;
        d.module = +d.module;
      });

      x.domain(d3.extent(data, function (d) { return d.module; }));
      y.domain([
        (Math.floor(d3.min(data, function (d) { return d.value; }) / 10) * 10),
        (Math.ceil(d3.max(data, function (d) { return d.value; }) / 10) * 10)
      ]);

      // add the Y gridlines
      g.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat("")
          .ticks(6)
        );

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(" + ((margin.left + margin.right) / 2) + "," + (height - margin.top) + ")")
        .call(d3.axisBottom(x)
          .ticks(6)
          .tickFormat(function (d) { return 'Module ' + d; })
        )
        .selectAll('.axis--x .tick text')
        .append('tspan')
        .attr("class", "axis-tspan")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", margin.top * 2)
        .text(function (d) { return data[d].date; });

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .text("T Scores");

      // Clinicial cut off line and text group
      var clinicalCutOffLineAndText = g.append("g")
        .attr("class", "clinical-cut-off-line-and-text")

      // Clinicial cut off line
      clinicalCutOffLineAndText.append("line")
        .attr("class", "clinical-cut-off-line")
        .attr("x1", 0)
        .attr("y1", y(clinicalCutOffValue))
        .attr("x2", width)
        .attr("y2", y(clinicalCutOffValue));

      // Clinicial cut off text
      clinicalCutOffLineAndText.append("text")
        .attr("class", "clinical-cut-off-text")
        .attr("y", y(clinicalCutOffValue))
        .attr("dy", "20px")
        .text("Clinical Cut-off");

      // Data line and dots group
      var lineAndDots = g.append("g")
        .attr("class", "line-and-dots")
        .attr("transform", "translate(" + ((margin.left + margin.right) / 2) + "," + 0 + ")")

      // Data line
      lineAndDots.append("path")
        .datum(data)
        .attr("class", "data-line")
        .attr("d", line);

      // Data dots
      lineAndDots.selectAll("line-circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "data-circle")
        .attr("r", 5)
        .attr("cx", function (d) { return x(d.module); })
        .attr("cy", function (d) { return y(d.value); });

    });

  }

}
