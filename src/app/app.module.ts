import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ex1Component } from './components/ex1/ex1.component';
import { Ex2Component } from './components/dataJoin/ex2/ex2.component';
import { SvgEx1Component } from './components/svg/svg-ex1/svg-ex1.component';
import { SvgRectangleComponent } from './components/svg/svg-rectangle/svg-rectangle.component';
import { SvgCircleComponent } from './components/svg/svg-circle/svg-circle.component';
import { SvgEllicpseComponent } from './components/svg/svg-ellicpse/svg-ellicpse.component';
import { BarChartComponent } from './components/chart/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    Ex1Component,
    Ex2Component,
    SvgEx1Component,
    SvgRectangleComponent,
    SvgCircleComponent,
    SvgEllicpseComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
