import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() matIconName!: string;
  @Input() iconTitle: string = '';
  @Input() lightTheme = false;
  @Output() clickEvent = new EventEmitter<void>();
  @Input() iconColorType: string = '';

  onClick() {
    this.clickEvent.emit();
  }
}
