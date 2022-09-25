import { Story } from "@storybook/vue3";
import TertiaryButton from "./TertiaryButton.vue";

export default {
  components: TertiaryButton,
};

const Template: Story = (args) => ({
  components: { TertiaryButton },
  setup() {
    return { args };
  },
  template: `
    <TertiaryButton color="${args.color}" iconPosition="${args.iconPosition}">
      <template #text>${args.slot.text}</template>
      <template #icon>${args.slot.icon}</template>
    </TertiaryButton>
  `,
});

export const Default = Template.bind({});

Default.args = {
  color: "ghost",
  iconPosition: "left",
  slot: {
    text: "追加する",
    icon: "add",
  },
};

export const Primary = Template.bind({});

Primary.args = {
  color: "primary",
  iconPosition: "left",
  slot: {
    text: "追加する",
    icon: "add",
  },
};

export const Open = Template.bind({});

Open.args = {
  color: "ghost",
  iconPosition: "right",
  slot: {
    text: "開く",
    icon: "expand_more",
  },
};

export const Close = Template.bind({});

Close.args = {
  color: "primary",
  iconPosition: "right",
  slot: {
    text: "閉じる",
    icon: "expand_less",
  },
};
