import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="lucent-checkbox-wrapper" [class.lucent-checkbox-wrapper--disabled]="disabled">
      <input type="checkbox"
             class="lucent-checkbox-input"
             [checked]="checked"
             [disabled]="disabled"
             [indeterminate]="indeterminate"
             (change)="onChange($event)" />
      <span class="lucent-checkbox-custom"></span>
      <span class="lucent-checkbox-label" *ngIf="label">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./lucent-checkbox.component.scss']
})
export class LucentCheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() label = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
