import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LucentMenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

@Component({
  selector: 'lucent-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lucent-menu-container" (click)="$event.stopPropagation()">
      <button class="lucent-menu-trigger" (click)="toggleMenu()" [class.active]="isOpen">
        <ng-content></ng-content>
      </button>

      <div class="lucent-menu-dropdown" *ngIf="isOpen">
        <ul class="lucent-menu-list">
          <li 
            *ngFor="let item of items" 
            class="lucent-menu-item"
            [class.disabled]="item.disabled"
            [class.destructive]="item.destructive"
            (click)="onItemClick(item)"
          >
            <span *ngIf="item.icon" class="lucent-menu-item-icon material-symbols-outlined">{{ item.icon }}</span>
            <span class="lucent-menu-item-label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./lucent-menu.component.scss']
})
export class LucentMenuComponent {
  @Input() items: LucentMenuItem[] = [];
  @Input() isOpen: boolean = false;
  
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClickOutside(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  onItemClick(item: LucentMenuItem) {
    if (item.disabled) return;
    
    if (item.action) {
      item.action();
    }
    
    this.closeMenu();
  }
}
