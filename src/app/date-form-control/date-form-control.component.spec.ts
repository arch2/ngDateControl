import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormControlComponent } from './date-form-control.component';

describe('DateFormControlComponent', () => {
  let component: DateFormControlComponent;
  let fixture: ComponentFixture<DateFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
