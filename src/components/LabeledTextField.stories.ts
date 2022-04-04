import LabeledTextField from "~/components/LabeledTextField.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import { Story } from "@storybook/vue3";

export default {
  component: LabeledTextField,
};

const Template: Story = (args) => ({
  components: { LabeledTextField, TextFieldSingleLine },
  setup() {
    return { args };
  },
  template: `
    <LabeledTextField v-bind="args">
      <TextFieldSingleLine />
    </LabeledTextField>
  `,
});

export const Normal = Template.bind({});

Normal.args = {
  label: "キーワード",
  style: "normal",
};

export const Slim = Template.bind({});

Slim.args = {
  label: "キーワード",
  style: "slim",
};
