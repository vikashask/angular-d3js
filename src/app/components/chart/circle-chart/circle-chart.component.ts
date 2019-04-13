import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.css']
})
export class CircleChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
//  Define variables 
    var width = 400;
   var height = 400;
   var data = [10, 20, 30];
   var colors = ['green', 'purple', 'yellow'];

  //  Append SVG elements
  var svg = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

  //  Apply transformation
  var g = svg.selectAll('g')  //Creates group element to hold the circles.
  .data(data)                 // Binds our data array to the group elements.
  .enter()                    // Creates placeholders for our group elements.
  .append('g')                // Appends group elements to our page.
  .attr('transform',function(d,i){
    return "translate(0,0)";
  })        // translate is used to position your elements with respect to the origin.
  
  //Append circle elements
  g.append('circle')
  .attr('cx',function (d,i) {
    return i*75+50;
  })      //add the attributes to the group 
  .attr('cy',function(d,i){
    return 75;
  })
  .attr('r',function(d,i){
    return d*1.5;
  })
  .attr('fill',function(d,i){
    return colors[i];
  })

// Display data
g.append('text')
.attr('x',function(d,i){
  return i*75+25;
})
.attr('y',80)
.attr('stroke','teal')
.attr('font-size','10px')
.attr('font-family','sans-serif')
.text(function(d){
  return d;
})


  }

}
