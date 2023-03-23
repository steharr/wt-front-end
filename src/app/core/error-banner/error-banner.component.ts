import { Component, OnInit } from '@angular/core';
import { ErrorType } from './enums/error-type.enum';
import { ErrorBannerService } from './services/error-banner.service';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss'],
})
export class ErrorBannerComponent implements OnInit {
  message: string | undefined = '';
  errorType: ErrorType | undefined;
  show: boolean = false;

  constructor(private errorBannerService: ErrorBannerService) {}

  ngOnInit(): void {
    this.errorBannerService.error$.subscribe({
      next: (e) => {
        this.show = true;
        this.message = e?.message;
      },
      complete: () => {
        this.show = false;
      },
    });
  }

  close() {
    this.show = false;
  }
}
