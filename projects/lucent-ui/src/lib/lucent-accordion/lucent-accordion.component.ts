import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-accordion">
      <div class="lucent-accordion-header" (click)="toggle()">
        <span class="lucent-accordion-title">{{ title }}</span>
        <span class="lucent-accordion-icon" [class.expanded]="expanded">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
      <div class="lucent-accordion-content" *ngIf="expanded">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./lucent-accordion.component.scss']
})
export class LucentAccordionComponent {
  @Input() title = 'Accordion Title';
  @Input() expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
