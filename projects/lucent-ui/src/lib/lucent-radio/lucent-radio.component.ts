import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="lucent-radio-wrapper" [class.lucent-radio-wrapper--disabled]="disabled">
      <input type="radio"
             class="lucent-radio-input"
             [name]="name"
             [value]="value"
             [checked]="checked"
             [disabled]="disabled"
             (change)="onChange($event)" />
      <span class="lucent-radio-custom"></span>
      <span class="lucent-radio-label" *ngIf="label">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./lucent-radio.component.scss']
})
export class LucentRadioComponent {
  @Input() name = '';
  @Input() value = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label = '';
  @Output() checkedChange = new EventEmitter<string>();

  onChange(event: Event) {
    this.checkedChange.emit(this.value);
  }
}
