import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorBannerComponent } from './error-banner/error-banner.component';

@NgModule({
  declarations: [ErrorBannerComponent],
  imports: [CommonModule],
  exports: [ErrorBannerComponent],
})
export class CoreModule {}
