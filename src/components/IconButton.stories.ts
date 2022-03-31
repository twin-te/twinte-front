import IconButton from "~/components/IconButton.vue";
import { Story } from "@storybook/vue3";

export default {
  component: IconButton,
};

const Template: Story = (args) => ({
  components: { IconButton },
  setup() {
    return { args };
  },
  template: `<IconButton v-bind="args" />`,
});

export const Default = Template.bind({});

Default.args = {
  size: "medium",
  iconName: "search",
  loading: false,
};
