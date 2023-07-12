import { Component, Input, OnInit } from '@angular/core';
import { ErrorType } from '../error-banner/enums/error-type.enum';
import { ErrorBannerService } from '../error-banner/services/error-banner.service';
import { HealthService } from './health.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent implements OnInit {
  @Input() displayError: boolean = false;

  serverAlive$ = this.healthService.serviceAvailable$;
  serverHealthLoading$ = this.healthService.loading$;

  constructor(
    private healthService: HealthService,
    private errorBannerService: ErrorBannerService
  ) {}
  ngOnInit(): void {
    this.healthService.checkHealthStatus();

    this.serverAlive$.subscribe({
      next: (alive) => {
        if (!alive && this.displayError) {
          this.errorBannerService.displayError({
            err: new Error(
              'Our services are not available right now, please try again later'
            ),
            type: ErrorType.WARNING,
          });
        }
      },
    });
  }
}
