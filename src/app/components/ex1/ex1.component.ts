import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-ex1',
  templateUrl: './ex1.component.html',
  styleUrls: ['./ex1.component.css']
})
export class Ex1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.select('#list').selectAll('li')
      .data([10, 20, 30, 25, 15])
      .text(function (d, i) {
        console.log('index ', i); // the index element
        console.log('data ', d); // the data element
        console.log(this); // the current DOM object
        return d;
      });
  }

}
