import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lucent-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-progress-bar-container">
      <div class="lucent-progress-bar-track">
        <div 
          class="lucent-progress-bar-fill" 
          [style.width.%]="clampedValue" 
          [ngClass]="color">
        </div>
      </div>
      <div class="lucent-progress-bar-label" *ngIf="showLabel">
        {{ clampedValue }}%
      </div>
    </div>
  `,
  styleUrls: ['./lucent-progress-bar.component.scss']
})
export class LucentProgressBarComponent {
  /**
   * Phầm trăm tiến độ (0 - 100)
   */
  @Input() value: number = 0;

  /**
   * Hiển thị số phần trăm
   */
  @Input() showLabel: boolean = false;

  /**
   * Màu sắc của thanh tiến trình
   */
  @Input() color: 'primary' | 'success' | 'warning' | 'error' | 'ghost' = 'primary';

  get clampedValue(): number {
    return Math.max(0, Math.min(100, this.value));
  }
}
