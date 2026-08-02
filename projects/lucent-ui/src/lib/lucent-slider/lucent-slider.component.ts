import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lucent-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-slider-container" [class.disabled]="disabled">
      <input 
        #sliderInput
        type="range" 
        class="lucent-slider-input"
        [min]="min" 
        [max]="max" 
        [step]="step" 
        [value]="value"
        [disabled]="disabled"
        (input)="onInput($event)"
      />
      <div class="lucent-slider-track">
        <div class="lucent-slider-fill" [style.width.%]="percentage"></div>
      </div>
      <div class="lucent-slider-thumb" [style.left.%]="percentage"></div>
    </div>
  `,
  styleUrls: ['./lucent-slider.component.scss']
})
export class LucentSliderComponent {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() value: number = 50;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<number>();

  get percentage(): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    const clamped = Math.max(this.min, Math.min(this.max, this.value));
    return ((clamped - this.min) / range) * 100;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
