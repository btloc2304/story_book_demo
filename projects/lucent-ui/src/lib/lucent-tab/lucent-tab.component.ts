import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-tabs">
      <div class="lucent-tab-list">
        <button *ngFor="let tab of tabs; let i = index"
                class="lucent-tab-button"
                [class.lucent-tab-button--active]="i === activeIndex"
                (click)="selectTab(i)">
          {{ tab }}
        </button>
      </div>
      <div class="lucent-tab-panel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./lucent-tab.component.scss']
})
export class LucentTabComponent {
  @Input() tabs: string[] = ['Tab 1', 'Tab 2'];
  @Input() activeIndex = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  selectTab(index: number) {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
  }
}
