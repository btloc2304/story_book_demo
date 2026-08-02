import { Meta, StoryObj } from '@storybook/angular';
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
