import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LucentSegmentOption {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'lucent-segmented-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-segmented-control" [class.disabled]="disabled">
      <button 
        *ngFor="let option of options"
        type="button"
        class="lucent-segment-button"
        [class.selected]="option.value === selectedValue"
        (click)="selectOption(option.value)"
        [disabled]="disabled"
      >
        <span *ngIf="option.icon" class="lucent-segment-icon material-symbols-outlined">{{ option.icon }}</span>
        <span class="lucent-segment-label">{{ option.label }}</span>
      </button>
    </div>
  `,
  styleUrls: ['./lucent-segmented-control.component.scss']
})
export class LucentSegmentedControlComponent {
  @Input() options: LucentSegmentOption[] = [];
  @Input() selectedValue: string | null = null;
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<string>();

  selectOption(value: string) {
    if (this.disabled) return;
    this.selectedValue = value;
    this.selectionChange.emit(value);
  }
}
