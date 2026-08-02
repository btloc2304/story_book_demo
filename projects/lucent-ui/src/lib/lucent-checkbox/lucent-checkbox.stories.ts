import { Meta, StoryObj } from '@storybook/angular';
import { LucentCheckboxComponent } from './lucent-checkbox.component';

const meta: Meta<LucentCheckboxComponent> = {
  title: 'Lucent UI/Checkbox',
  component: LucentCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4428-1317&m=dev' },
  },
};
export default meta;
type Story = StoryObj<LucentCheckboxComponent>;

export const Default: Story = { args: { label: 'Remember me', checked: false } };
export const Checked: Story = { args: { label: 'Subscribe to newsletter', checked: true } };
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } };
export const Disabled: Story = { args: { label: 'Not allowed', disabled: true } };
