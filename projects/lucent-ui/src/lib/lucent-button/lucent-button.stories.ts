import { Meta, StoryObj } from '@storybook/angular';
import { LucentButtonComponent } from './lucent-button.component';

const meta: Meta<LucentButtonComponent> = {
  title: 'Lucent UI/Button',
  component: LucentButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4441-75&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentButtonComponent>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Secondary Button',
  },
};
