<template>
  <Button @click="clickHandler" size="small">Back to Home</Button>
  <Button @click="openModal" size="small">Open Modal</Button>
  <Modal v-if="modal" @click="closeModal" size="large">
    <div class="title">title</div>
    <div class="contents">contents</div>
    <Button @click="closeModal" layout="fill" size="medium">OK</Button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../../components/Button.vue";
import Modal from "../../components/Modal.vue";

export default defineComponent({
  name: "Add",
  components: {
    Button,
    Modal,
  },
  setup: () => {
    const router = useRouter();

    const clickHandler = async () => {
      await router.push("/");
    };

    const modal = ref(false);

    const openModal = () => {
      modal.value = true;
    };

    const closeModal = () => {
      modal.value = false;
    };

    return { clickHandler, modal, openModal, closeModal };
  },
});
</script>

<style lang="scss" scoped>
@import "../../scss/main.scss";

.modal {
  .title {
    font-size: 2rem;
    font-weight: 500;
    line-height: $multi-line;
    color: $text-main;
    text-align: left;
  }
  .contents {
    width: 100%;
    margin: 4rem 0 2.8rem 0;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: $multi-line;
    color: $text-main;
    text-align: left;
    overflow: scroll;
  }
  // コンテンツの高さ
  &--large {
    .contents {
      height: calc(56.7rem - 20.8rem);
      @include tab-and-pc {
        height: calc(51.58334rem - 20.8rem);
      }
    }
  }
  &--small {
    .contents {
      height: calc(39.5rem - 20.8rem);
      @include tab-and-pc {
        height: calc(30.33334rem - 20.8rem);
      }
    }
  }
}
</style>
