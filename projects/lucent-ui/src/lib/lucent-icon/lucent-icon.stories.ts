import { Meta, StoryObj } from '@storybook/angular';
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
