import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var svg = d3.select("svg"),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(['gray', 'green', 'brown', 'orange']);

    // Apply Transformation 
    var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Generate a pie chart

    var pie = d3.pie()
      .value(function (d) { return d.percent; });

    // Define arcs for pie wedges 
    var arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    // Add labels in wedges 
    var label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    // Read data 
    d3.csv("assets/populations.csv", function (error, data) {
      if (error) {
        console.log('error in data loading ',error);
        
        throw error;
      }


      //  Load data 
      var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      //  Append path
      arc.append("path")
        .attr("d", arc)
        .attr("fill", function (d) { return color(d.data.states); });

      //  Append text 
      arc.append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) { return d.data.states; });

      // Append group elements
      svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        .append("text")
        .text("Top population states in india")
        .attr("class", "title")

    });


  }

}
