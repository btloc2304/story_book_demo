import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="lucent-badge" [ngClass]="['lucent-badge--' + status, 'lucent-badge--' + size]">
      <ng-content></ng-content>
      {{ text }}
    </span>
  `,
  styleUrls: ['./lucent-badge.component.scss']
})
export class LucentBadgeComponent {
  @Input() text = '';
  @Input() status: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
