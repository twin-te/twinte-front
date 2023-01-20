import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/vue3";
import TextFieldMutilines from "./TextFieldMultilines.vue";

export default {
  components: TextFieldMutilines,
};

const Template: Story = (args) => ({
  components: { TextFieldMutilines },
  setup() {
    return { args };
  },
  template: `
    <TextFieldMutilines
      v-model="args.value"
      :placeholder="args.placeholder"
      :renderd="args.renderd"
    ></TextFieldMutilines>
  `,
  methods: { action },
});

export const Default = Template.bind({});

Default.args = {
  value: "サンプルテキスト\nサンプルテキスト https://example.com ",
  placepholder: "テキストを入力してください",
  renderd: true,
};
