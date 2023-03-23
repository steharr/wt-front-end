import { TestBed } from '@angular/core/testing';

import { ErrorBannerService } from './error-banner.service';

describe('ErrorBannerService', () => {
  let service: ErrorBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
