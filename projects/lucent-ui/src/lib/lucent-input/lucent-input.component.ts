import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-input-wrapper">
      <label *ngIf="label" class="lucent-input-label" [for]="id">{{ label }}</label>
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        class="lucent-input"
        [class.lucent-input--error]="error"
        (input)="onInput($event)"
      />
      <span *ngIf="error" class="lucent-input-error">{{ errorMessage }}</span>
    </div>
  `,
  styleUrls: ['./lucent-input.component.scss']
})
export class LucentInputComponent {
  @Input() id = `lucent-input-${Math.random().toString(36).substring(2, 9)}`;
  @Input() label = '';
  @Input() type = 'text';

  /**
   * The placeholder text when the input is empty
   */
  @Input() placeholder = '';

  /**
   * The current value of the input
   */
  @Input() value = '';

  /**
   * Disables the input preventing user interaction
   */
  @Input() disabled = false;

  /**
   * Indicates if the input contains an error
   */
  @Input() error = false;

  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
