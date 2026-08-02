import { Meta, StoryObj } from '@storybook/angular';
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
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4441-667&m=dev',
    },
  },
};
export default meta;
type Story = StoryObj<LucentBadgeComponent>;

export const Default: Story = { args: { text: 'New Feature', status: 'info', size: 'medium' } };
export const Statuses: Story = { args: { text: 'Error', status: 'error', size: 'medium' } };
