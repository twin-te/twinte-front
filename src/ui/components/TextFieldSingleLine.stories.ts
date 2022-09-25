import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/vue3";
import TextFieldSingleLine from "./TextFieldSingleLine.vue";

export default {
  components: TextFieldSingleLine,
};

const Template: Story = (args) => ({
  components: { TextFieldSingleLine },
  setup() {
    return { args };
  },
  template: `
    <TextFieldSingleLine
      v-model="args.value"
      :placeholder="args.placeholder"
      :type="args.type"
      :added="args.added"
      @close="action('close')()"
    ></TextFieldSingleLine>
  `,
  methods: { action },
});

export const Default = Template.bind({});

Default.args = {
  value: "",
  placeholder: "例)ゼミ",
  type: "normal",
  added: false,
};

export const Slim = Template.bind({});

Slim.args = {
  value: "",
  placeholder: "科目名または科目番号",
  type: "slim",
  added: false,
};

export const Added = Template.bind({});

Added.args = {
  value: "",
  placeholder: "例)筑波太郎",
  type: "normal",
  added: true,
};
