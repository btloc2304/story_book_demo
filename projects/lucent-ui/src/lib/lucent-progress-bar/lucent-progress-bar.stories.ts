import type { Meta, StoryObj } from '@storybook/angular';
import { LucentProgressBarComponent } from './lucent-progress-bar.component';

const meta: Meta<LucentProgressBarComponent> = {
  title: 'Lucent UI/Progress Bar',
  component: LucentProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showLabel: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'ghost'],
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=3537-1000&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentProgressBarComponent>;

export const Default: Story = {
  args: {
    value: 50,
    showLabel: true,
    color: 'primary',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    showLabel: true,
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 80,
    showLabel: true,
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    value: 30,
    showLabel: true,
    color: 'error',
  },
};

export const NoLabel: Story = {
  args: {
    value: 60,
    showLabel: false,
    color: 'primary',
  },
};
