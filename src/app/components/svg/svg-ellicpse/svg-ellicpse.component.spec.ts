import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgEllicpseComponent } from './svg-ellicpse.component';

describe('SvgEllicpseComponent', () => {
  let component: SvgEllicpseComponent;
  let fixture: ComponentFixture<SvgEllicpseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgEllicpseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgEllicpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
