import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LucentAccordionComponent } from './lucent-accordion.component';
import { CommonModule } from '@angular/common';

const meta: Meta<LucentAccordionComponent> = {
  title: 'Lucent UI/Accordion',
  component: LucentAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [CommonModule] }),
  ],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4441-666&m=dev' },
  },
};
export default meta;
type Story = StoryObj<LucentAccordionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <lib-lucent-accordion [title]="title" [expanded]="expanded">
        This is the inner content of the accordion. It can contain any HTML or other Angular components.
      </lib-lucent-accordion>
    `
  }),
  args: { title: 'Is it accessible?', expanded: false }
};

export const Expanded: Story = {
  render: (args) => ({
    props: args,
    template: `
      <lib-lucent-accordion [title]="title" [expanded]="expanded">
        Yes! It adheres to WAI-ARIA design patterns.
      </lib-lucent-accordion>
    `
  }),
  args: { title: 'Is it accessible?', expanded: true }
};
