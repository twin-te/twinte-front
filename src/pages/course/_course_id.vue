<template>
  <Button @click="openDeleteCourseModal">open Modal</Button>
  <Modal
    v-if="deleteCourseModal"
    class="delete-course-modal"
    @click="closeDeleteCourseModal"
    size="small"
  >
    <template #title>授業の削除</template>
    <template #contents>
      <p class="modal__text">
        「色彩学」を削除しますか？(編集した情報や記録したメモ、出欠記録も削除されます。)
      </p>
    </template>
    <template #button>
      <Button
        @click="closeDeleteCourseModal"
        size="medium"
        layout="fill"
        color="base"
        >キャンセル</Button
      >
      <Button @click="clickHandler" size="medium" layout="fill" color="danger"
        >削除</Button
      >
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "../../components/Button.vue";
import Modal from "../../components/Modal.vue";

export default defineComponent({
  name: "Details",
  components: {
    Button,
    Modal,
  },
  setup: () => {
    const clickHandler = () => {
      console.log("click");
    };

    // delete-course-modal
    const deleteCourseModal = ref(false);
    const openDeleteCourseModal = () => {
      deleteCourseModal.value = true;
    };
    const closeDeleteCourseModal = () => {
      deleteCourseModal.value = false;
    };

    return {
      clickHandler,
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../../scss/main.scss";

.delete-course-modal .modal {
  &__text {
    font-size: $font-large;
    line-height: $multi-line;
  }
  .button {
    width: calc(50% - 1.2rem);
    &:first-child {
      margin-right: 1.2rem;
    }
    &:last-child {
      margin-left: 1.2rem;
    }
  }
}
</style>
