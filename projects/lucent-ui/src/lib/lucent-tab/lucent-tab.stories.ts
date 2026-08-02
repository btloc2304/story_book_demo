import { Meta, StoryObj } from '@storybook/angular';
import { LucentTabComponent } from './lucent-tab.component';

const meta: Meta<LucentTabComponent> = {
  title: 'Lucent UI/Tab',
  component: LucentTabComponent,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI' },
  },
};
export default meta;
type Story = StoryObj<LucentTabComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <lib-lucent-tab [tabs]="tabs" [activeIndex]="activeIndex">
        Content for the selected tab appears here.
      </lib-lucent-tab>
    `
  }),
  args: { tabs: ['Account', 'Password', 'Notifications'], activeIndex: 0 }
};
