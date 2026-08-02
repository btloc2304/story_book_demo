import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lucent-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-dialog-backdrop" *ngIf="isOpen" (click)="onBackdropClick()">
      <div class="lucent-dialog-panel" (click)="$event.stopPropagation()">
        <div class="lucent-dialog-header">
          <h2 class="lucent-dialog-title">{{ title }}</h2>
          <button class="lucent-dialog-close" (click)="close()">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="lucent-dialog-body">
          <ng-content></ng-content>
        </div>
        <div class="lucent-dialog-footer">
          <ng-content select="[dialog-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lucent-dialog.component.scss']
})
export class LucentDialogComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isOpen) {
      this.close();
    }
  }

  onBackdropClick() {
    this.close();
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.closed.emit();
  }
}
