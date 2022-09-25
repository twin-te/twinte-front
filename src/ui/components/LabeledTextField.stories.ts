import { Story } from "@storybook/vue3";
import LabeledTextField from "./LabeledTextField.vue";
import TextFieldSingleLine from "./TextFieldSingleLine.vue";

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
