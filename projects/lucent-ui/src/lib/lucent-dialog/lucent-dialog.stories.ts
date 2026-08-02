import type { Meta, StoryObj } from '@storybook/angular';
import { LucentDialogComponent } from './lucent-dialog.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<LucentDialogComponent> = {
  title: 'Components/Dialog',
  component: LucentDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
    isOpenChange: { action: 'isOpenChange' },
    closed: { action: 'closed' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=3537-893&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentDialogComponent>;

export const Default: Story = {
  args: {
    title: 'Confirm Deletion',
    isOpen: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lucent-dialog [title]="title" [isOpen]="isOpen" (isOpenChange)="isOpen=$event">
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <div dialog-footer>
          <button style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; background: white; cursor: pointer;" (click)="isOpen=false">Cancel</button>
          <button style="padding: 8px 16px; border-radius: 6px; border: none; background: #e53e3e; color: white; cursor: pointer;" (click)="isOpen=false">Delete</button>
        </div>
      </lucent-dialog>
    `,
  }),
};
