import type { Meta, StoryObj } from '@storybook/angular';
import { LucentSliderComponent } from './lucent-slider.component';

const meta: Meta<LucentSliderComponent> = {
  title: 'Lucent UI/Slider',
  component: LucentSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: { type: 'range', min: 0, max: 100 } },
    disabled: { control: 'boolean' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=3537-1021&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentSliderComponent>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 75,
    disabled: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: -50,
    max: 50,
    step: 10,
    value: 0,
    disabled: false,
  },
};
