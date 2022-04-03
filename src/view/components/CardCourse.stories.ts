import CardCourse from "~/components/CardCourse.vue";
import { CourseCard } from "~/entities/courseCard";
import { Story } from "@storybook/vue3";

export default {
  component: CardCourse,
};

const Template: Story = (args) => ({
  components: { CardCourse },
  setup() {
    return { args };
  },
  template: '<CardCourse v-bind="args"/>',
});

export const Default = Template.bind({});

const dummyCourse: CourseCard = {
  id: "FB12721",
  name: "計算機科学",
  period: "2.0",
  location: "6A203",
  url: "https://kdb.tsukuba.ac.jp/syllabi/2021/FB12721/jpn/",
  isSelected: false,
};

Default.args = {
  isChecked: false,
  course: dummyCourse,
};
