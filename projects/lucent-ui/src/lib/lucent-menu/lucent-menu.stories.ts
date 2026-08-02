import type { Meta, StoryObj } from '@storybook/angular';
import { LucentMenuComponent } from './lucent-menu.component';

const meta: Meta<LucentMenuComponent> = {
  title: 'Components/Menu',
  component: LucentMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    isOpenChange: { action: 'isOpenChange' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4552-307&m=dev',
    },
    layout: 'centered', // To see the dropdown properly
  },
};

export default meta;
type Story = StoryObj<LucentMenuComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    items: [
      { label: 'Edit Profile', icon: 'edit' },
      { label: 'Account Settings', icon: 'settings' },
      { label: 'Subscription (Locked)', icon: 'lock', disabled: true },
      { label: 'Delete Account', icon: 'delete', destructive: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <lucent-menu [items]="items" [isOpen]="isOpen" (isOpenChange)="isOpen=$event">
        <button style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; background: white; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          Options <span class="material-symbols-outlined">expand_more</span>
        </button>
      </lucent-menu>
    `,
  }),
};
