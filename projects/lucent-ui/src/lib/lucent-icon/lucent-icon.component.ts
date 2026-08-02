import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="lucent-icon" [ngClass]="['size-' + size]">
      <!-- Placeholder SVG - in a real app, this would dynamically load SVGs -->
      <svg *ngIf="name === 'chevron/right'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      <svg *ngIf="name === 'heart'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      <svg *ngIf="name !== 'chevron/right' && name !== 'heart'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    </span>
  `,
  styleUrls: ['./lucent-icon.component.scss']
})
export class LucentIconComponent {
  @Input() name = 'info';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
