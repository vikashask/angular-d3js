import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgEx1Component } from './svg-ex1.component';

describe('SvgEx1Component', () => {
  let component: SvgEx1Component;
  let fixture: ComponentFixture<SvgEx1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgEx1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgEx1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
