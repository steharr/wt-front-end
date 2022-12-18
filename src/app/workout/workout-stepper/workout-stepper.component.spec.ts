import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutStepperComponent } from './workout-stepper.component';

describe('WorkoutStepperComponent', () => {
  let component: WorkoutStepperComponent;
  let fixture: ComponentFixture<WorkoutStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
