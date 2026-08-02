import type { Meta, StoryObj } from '@storybook/angular';
import { LucentSegmentedControlComponent } from './lucent-segmented-control.component';

const meta: Meta<LucentSegmentedControlComponent> = {
  title: 'Lucent UI/Segmented Control',
  component: LucentSegmentedControlComponent,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=3482-228&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentSegmentedControlComponent>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Map', value: 'map' },
      { label: 'Transit', value: 'transit' },
      { label: 'Satellite', value: 'satellite' }
    ],
    selectedValue: 'map',
    disabled: false,
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { label: 'Grid', value: 'grid', icon: 'grid_view' },
      { label: 'List', value: 'list', icon: 'view_list' }
    ],
    selectedValue: 'grid',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' }
    ],
    selectedValue: 'week',
    disabled: true,
  },
};
