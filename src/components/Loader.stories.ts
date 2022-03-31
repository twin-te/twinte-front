import Loader from "~/components/Loader.vue";
import { Story } from "@storybook/vue3";

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
