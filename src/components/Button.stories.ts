import Button from "~/components/Button.vue";
import { Story } from "@storybook/vue3";

export default {
  component: Button,
};

const Template: Story = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: `<Button v-bind="args">${args.slot}</Button>`,
});

export const Default = Template.bind({});

Default.args = {
  slot: "現在の学期",
  size: "medium",
  layout: "flexible",
  color: "base",
};
