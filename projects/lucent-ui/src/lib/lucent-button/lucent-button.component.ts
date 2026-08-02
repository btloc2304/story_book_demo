import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [ngClass]="classes"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
      {{ label }}
    </button>
  `,
  styleUrls: ['./lucent-button.component.scss']
})
export class LucentButtonComponent {
  /**
   * The text to display inside the button
   */
  @Input() label = 'Button';

  /**
   * Whether the button is disabled
   */
  @Input() disabled = false;

  /**
   * Is this the principal call to action on the page?
   */
  @Input() primary = false;

  /**
   * The size of the button
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Optional click handler
   */
  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'lucent-button--primary' : 'lucent-button--secondary';
    return ['lucent-button', `lucent-button--${this.size}`, mode];
  }
}
