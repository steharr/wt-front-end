import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AvatarEditorComponent } from './avatar-editor/avatar-editor.component';
import { ErrorBannerComponent } from './error-banner/error-banner.component';
import { HealthComponent } from './health/health.component';
import { IconComponent } from './icon/icon.component';
import { ToastComponent, WtToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    ErrorBannerComponent,
    IconComponent,
    ToastComponent,
    WtToastComponent,
    HealthComponent,
    AvatarEditorComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ErrorBannerComponent,
    IconComponent,
    ToastComponent,
    HealthComponent,
    AvatarEditorComponent,
  ],
})
export class CoreModule {}
