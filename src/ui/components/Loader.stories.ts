import { Story } from "@storybook/vue3";
import Loader from "./Loader.vue";

export default {
  component: Loader,
};

const Template: Story = (args) => ({
  components: { Loader },
  setup() {
    return { args };
  },
  template: `<Loader v-bind="args">${args.slot}</Loader>`,
});

export const Default = Template.bind({});

Default.args = {
  size: "150px",
};
