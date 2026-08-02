import { Meta, StoryObj } from '@storybook/angular';
import { LucentInputComponent } from './lucent-input.component';

const meta: Meta<LucentInputComponent> = {
  title: 'Lucent UI/Input',
  component: LucentInputComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI?node-id=4431-243&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<LucentInputComponent>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: true,
    errorMessage: 'Invalid email address',
    value: 'wrong-email',
  },
};

// --- Advanced Storybook Features --- //

import { userEvent, within, expect } from '@storybook/test';

/**
 * Story for demonstrating Interaction Testing
 */
export const Interactive: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type something...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    // Simulate user typing
    await userEvent.type(input, 'Hello Storybook', { delay: 100 });
    
    // Assert value
    await expect(input).toHaveValue('Hello Storybook');
  },
};

/**
 * Story deliberately failing Accessibility rules (Low Contrast)
 */
export const AccessibilityFail: Story = {
  args: {
    label: 'Low Contrast Label',
    placeholder: 'Hard to read',
  },
  parameters: {
    a11y: { disable: true } // Disable so test-runner doesn't fail the CI pipeline, but keep for manual demo
  },
  // Injecting inline styles purely for demo purpose to fail a11y checks
  render: (args) => ({
    props: args,
    template: `
      <div style="color: #ccc; background-color: #ddd; padding: 20px;">
        <lib-lucent-input [label]="label" [placeholder]="placeholder"></lib-lucent-input>
        <p>This text contrast will fail the a11y addon checks.</p>
      </div>
    `
  })
};
