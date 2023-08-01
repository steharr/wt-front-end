import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ErrorType } from './enums/error-type.enum';
import { ErrorBanner } from './models/error-banner.model';
import { ErrorBannerService } from './services/error-banner.service';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss'],
})
export class ErrorBannerComponent implements OnInit {
  errors: ErrorBanner[] = [];
  show: boolean = false;
  id = 0;
  types = ErrorType;
  navigationEnd$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  );

  constructor(
    private errorBannerService: ErrorBannerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.errorBannerService.error$.subscribe({
      next: (e) => {
        this.show = true;
        this.errors.push({
          ...e,
          id: this.id++,
        });
      },
      complete: () => {
        this.show = false;
      },
    });
    this.navigationEnd$.subscribe({
      next: () => {
        this.errors.forEach((e) => {
          if (e.temporary) {
            this.close(e);
          }
        });
      },
    });
  }

  close(errorBanner: ErrorBanner) {
    this.errors = this.errors.filter((elem) => elem.id !== errorBanner.id);
  }
}
