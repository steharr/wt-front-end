import { TestBed } from '@angular/core/testing';

import { WorkoutStepperUiService } from './workout-stepper-ui.service';

describe('WorkoutStepperUiService', () => {
  let service: WorkoutStepperUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutStepperUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
