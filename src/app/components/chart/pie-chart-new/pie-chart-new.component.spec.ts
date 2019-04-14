import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartNewComponent } from './pie-chart-new.component';

describe('PieChartNewComponent', () => {
  let component: PieChartNewComponent;
  let fixture: ComponentFixture<PieChartNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
