const fs = require('fs');
const path = require('path');

const libPath = path.resolve(__dirname, 'projects/lucent-ui/src/lib');

const components = {
  'lucent-badge': {
    ts: `import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-badge',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <span class="lucent-badge" [ngClass]="['lucent-badge--' + status, 'lucent-badge--' + size]">
      <ng-content></ng-content>
      {{ text }}
    </span>
  \`,
  styleUrls: ['./lucent-badge.component.scss']
})
export class LucentBadgeComponent {
  @Input() text = '';
  @Input() status: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
`,
    scss: `@import '../../styles/variables';

.lucent-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-family: $font-family;
  font-weight: 500;
  line-height: 1;

  &--small { font-size: 10px; padding: 2px 6px; }
  &--medium { font-size: 12px; padding: 4px 8px; }
  &--large { font-size: 14px; padding: 6px 12px; }

  &--default { background-color: #E2E8F0; color: #1E293B; }
  &--success { background-color: #DCFCE7; color: #166534; }
  &--warning { background-color: #FEF9C3; color: #854D0E; }
  &--error { background-color: #FEE2E2; color: #991B1B; }
  &--info { background-color: #DBEAFE; color: #1E40AF; }
}
`,
    stories: `import { Meta, StoryObj } from '@storybook/angular';
import { LucentBadgeComponent } from './lucent-badge.component';

const meta: Meta<LucentBadgeComponent> = {
  title: 'Lucent UI/Badge',
  component: LucentBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=940-1&p=f&m=dev',
    },
  },
};
export default meta;
type Story = StoryObj<LucentBadgeComponent>;

export const Default: Story = { args: { text: 'New Feature', status: 'info', size: 'medium' } };
export const Statuses: Story = { args: { text: 'Error', status: 'error', size: 'medium' } };
`
  },
  'lucent-checkbox': {
    ts: `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: \`
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
  \`,
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
`,
    scss: `@import '../../styles/variables';

.lucent-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-family: $font-family;
  gap: 8px;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.lucent-checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.lucent-checkbox-custom {
  position: relative;
  height: 18px;
  width: 18px;
  background-color: white;
  border: 1px solid $secondary-color;
  border-radius: 4px;
  transition: all 0.2s;

  .lucent-checkbox-input:checked ~ & {
    background-color: $primary-color;
    border-color: $primary-color;
  }

  .lucent-checkbox-input:focus-visible ~ & {
    box-shadow: 0 0 0 3px rgba(49, 134, 255, 0.2);
  }
}

/* Create the checkmark/indicator (hidden when not checked) */
.lucent-checkbox-custom:after {
  content: "";
  position: absolute;
  display: none;
}

.lucent-checkbox-input:checked ~ .lucent-checkbox-custom:after {
  display: block;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.lucent-checkbox-input:indeterminate ~ .lucent-checkbox-custom {
  background-color: $primary-color;
  border-color: $primary-color;
}

.lucent-checkbox-input:indeterminate ~ .lucent-checkbox-custom:after {
  display: block;
  left: 4px;
  top: 8px;
  width: 8px;
  height: 2px;
  background-color: white;
  border: none;
  transform: none;
}

.lucent-checkbox-label {
  font-size: 14px;
  color: $text-color;
}
`,
    stories: `import { Meta, StoryObj } from '@storybook/angular';
import { LucentCheckboxComponent } from './lucent-checkbox.component';

const meta: Meta<LucentCheckboxComponent> = {
  title: 'Lucent UI/Checkbox',
  component: LucentCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentCheckboxComponent>;

export const Default: Story = { args: { label: 'Remember me', checked: false } };
export const Checked: Story = { args: { label: 'Subscribe to newsletter', checked: true } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };
export const Disabled: Story = { args: { label: 'Not allowed', disabled: true } };
`
  },
  'lucent-radio': {
    ts: `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-radio',
  standalone: true,
  imports: [CommonModule],
  template: \`
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
  \`,
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
`,
    scss: `@import '../../styles/variables';

.lucent-radio-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-family: $font-family;
  gap: 8px;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.lucent-radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.lucent-radio-custom {
  position: relative;
  height: 18px;
  width: 18px;
  background-color: white;
  border: 1px solid $secondary-color;
  border-radius: 50%;
  transition: all 0.2s;

  .lucent-radio-input:checked ~ & {
    border-color: $primary-color;
  }

  .lucent-radio-input:focus-visible ~ & {
    box-shadow: 0 0 0 3px rgba(49, 134, 255, 0.2);
  }
}

.lucent-radio-custom:after {
  content: "";
  position: absolute;
  display: none;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: $primary-color;
}

.lucent-radio-input:checked ~ .lucent-radio-custom:after {
  display: block;
}

.lucent-radio-label {
  font-size: 14px;
  color: $text-color;
}
`,
    stories: `import { Meta, StoryObj } from '@storybook/angular';
import { LucentRadioComponent } from './lucent-radio.component';

const meta: Meta<LucentRadioComponent> = {
  title: 'Lucent UI/Radio',
  component: LucentRadioComponent,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentRadioComponent>;

export const Default: Story = { args: { label: 'Option 1', name: 'demo', value: '1' } };
export const Selected: Story = { args: { label: 'Option 2', name: 'demo', value: '2', checked: true } };
`
  },
  'lucent-accordion': {
    ts: `import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-accordion',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="lucent-accordion">
      <div class="lucent-accordion-header" (click)="toggle()">
        <span class="lucent-accordion-title">{{ title }}</span>
        <span class="lucent-accordion-icon" [class.expanded]="expanded">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
      <div class="lucent-accordion-content" *ngIf="expanded">
        <ng-content></ng-content>
      </div>
    </div>
  \`,
  styleUrls: ['./lucent-accordion.component.scss']
})
export class LucentAccordionComponent {
  @Input() title = 'Accordion Title';
  @Input() expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
`,
    scss: `@import '../../styles/variables';

.lucent-accordion {
  border: 1px solid $secondary-color;
  border-radius: $border-radius;
  font-family: $font-family;
  overflow: hidden;
}

.lucent-accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F8FAFC;
  }
}

.lucent-accordion-title {
  font-weight: 500;
  color: $text-color;
}

.lucent-accordion-icon {
  display: flex;
  transition: transform 0.3s;
  color: #64748B;

  &.expanded {
    transform: rotate(180deg);
  }
}

.lucent-accordion-content {
  padding: 16px;
  border-top: 1px solid $secondary-color;
  background-color: #F8FAFC;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
}
`,
    stories: `import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LucentAccordionComponent } from './lucent-accordion.component';
import { CommonModule } from '@angular/common';

const meta: Meta<LucentAccordionComponent> = {
  title: 'Lucent UI/Accordion',
  component: LucentAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [CommonModule] }),
  ],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentAccordionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: \`
      <lib-lucent-accordion [title]="title" [expanded]="expanded">
        This is the inner content of the accordion. It can contain any HTML or other Angular components.
      </lib-lucent-accordion>
    \`
  }),
  args: { title: 'Is it accessible?', expanded: false }
};

export const Expanded: Story = {
  render: (args) => ({
    props: args,
    template: \`
      <lib-lucent-accordion [title]="title" [expanded]="expanded">
        Yes! It adheres to WAI-ARIA design patterns.
      </lib-lucent-accordion>
    \`
  }),
  args: { title: 'Is it accessible?', expanded: true }
};
`
  },
  'lucent-tab': {
    ts: `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-tab',
  standalone: true,
  imports: [CommonModule],
  template: \`
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
  \`,
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
`,
    scss: `@import '../../styles/variables';

.lucent-tabs {
  font-family: $font-family;
}

.lucent-tab-list {
  display: flex;
  border-bottom: 1px solid $secondary-color;
  gap: 24px;
}

.lucent-tab-button {
  background: none;
  border: none;
  padding: 12px 4px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  margin-bottom: -1px;

  &:hover {
    color: $text-color;
  }

  &--active {
    color: $primary-color;
    border-bottom-color: $primary-color;
  }
}

.lucent-tab-panel {
  padding: 16px 0;
  color: $text-color;
  font-size: 14px;
}
`,
    stories: `import { Meta, StoryObj } from '@storybook/angular';
import { LucentTabComponent } from './lucent-tab.component';

const meta: Meta<LucentTabComponent> = {
  title: 'Lucent UI/Tab',
  component: LucentTabComponent,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentTabComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: \`
      <lib-lucent-tab [tabs]="tabs" [activeIndex]="activeIndex">
        Content for the selected tab appears here.
      </lib-lucent-tab>
    \`
  }),
  args: { tabs: ['Account', 'Password', 'Notifications'], activeIndex: 0 }
};
`
  },
  'lucent-icon': {
    ts: `import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-lucent-icon',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <span class="lucent-icon" [ngClass]="['size-' + size]">
      <!-- Placeholder SVG - in a real app, this would dynamically load SVGs -->
      <svg *ngIf="name === 'chevron/right'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      <svg *ngIf="name === 'heart'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      <svg *ngIf="name !== 'chevron/right' && name !== 'heart'" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    </span>
  \`,
  styleUrls: ['./lucent-icon.component.scss']
})
export class LucentIconComponent {
  @Input() name = 'info';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
`,
    scss: `.lucent-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &.size-small { width: 16px; height: 16px; }
  &.size-medium { width: 24px; height: 24px; }
  &.size-large { width: 32px; height: 32px; }
}
`,
    stories: `import { Meta, StoryObj } from '@storybook/angular';
import { LucentIconComponent } from './lucent-icon.component';

const meta: Meta<LucentIconComponent> = {
  title: 'Lucent UI/Icon',
  component: LucentIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ['heart', 'chevron/right', 'info'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentIconComponent>;

export const Default: Story = { args: { name: 'heart', size: 'medium' } };
`
  }
};

for (const [comp, files] of Object.entries(components)) {
  const dir = path.join(libPath, comp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  fs.writeFileSync(path.join(dir, \`\${comp}.component.ts\`), files.ts);
  fs.writeFileSync(path.join(dir, \`\${comp}.component.scss\`), files.scss);
  fs.writeFileSync(path.join(dir, \`\${comp}.stories.ts\`), files.stories);
  console.log(\`Generated files for \${comp}\`);
}
