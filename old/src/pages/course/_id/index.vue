<template>
  <div class="course-detail">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          @click="$router.push('/')"
          size="large"
          color="normal"
          iconName="arrow_back"
        ></IconButton>
      </template>
      <template #title>授業詳細</template>
      <template #right-button-icon>
        <div v-click-away="closePopup">
          <ToggleIconButton
            ref="btnRef"
            class="header__right-button-icon"
            @click="toggleShowPopup"
            size="large"
            color="normal"
            iconName="more_vert"
            :isActive="showPopup"
          ></ToggleIconButton>
          <Popup v-show="showPopup">
            <PopupContent
              v-for="data in popupData"
              :key="data.value"
              @click="data.onClick"
              :link="data.link"
              :value="data.value"
              :color="data.color"
              :gtm-marker="data.gtmMarker"
            ></PopupContent>
          </Popup>
        </div>
      </template>
    </PageHeader>
    <article class="main">
      <div class="main__contents">
        <p class="main__code">{{ displayCourse.code }}</p>
        <h1 class="main__name">{{ displayCourse.name }}</h1>
        <section class="main__details">
          <CourseDetail item="開講時限" :value="displayCourse.date">
            <DecoratedIcon iconName="schedule"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="単位数" :value="displayCourse.credit">
            <DecoratedIcon iconName="payments"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="担当教員" :value="displayCourse.instructor">
            <DecoratedIcon iconName="person"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="授業場所" :value="displayCourse.room">
            <DecoratedIcon iconName="room"></DecoratedIcon>
          </CourseDetail>
          <CourseDetail item="授業形式" :value="displayCourse.method">
            <DecoratedIcon iconName="category"></DecoratedIcon>
          </CourseDetail>
        </section>
        <TagEditor @create-tag="onCreateTag" v-model:add="add" heading="タグ">
          <template #tags>
            <Tag
              v-for="tag in displayTags"
              :key="tag.id"
              @click="() => onClickTag(tag)"
              :assign="tag.assign"
              >{{ tag.name }}
            </Tag>
            <template v-if="displayTags.length === 0">
              作成済みのタグがありません。<br />
              タグを作成すると授業を分類することができます。
            </template>
          </template>
          <template #btn>タグを新たに作成する</template>
        </TagEditor>
        <TextFieldMultilines
          class="main__memo"
          v-model="displayCourse.memo"
          @update:modelValue="update"
          placeholder="メモを入力"
          height="10.3rem"
          style="width: 100%"
        ></TextFieldMultilines>
        <section class="main__attendance attendance">
          <div class="attendance__item">
            <p class="attendance__state">出席</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('attendance', -1)"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.attendance }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('attendance', 1)"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">欠席</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('absence', -1)"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.absence }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('absence', 1)"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">遅刻</p>
            <IconButton
              class="attendance__minus-btn"
              @click="updateCounter('late', -1)"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.late }}</p>
            <IconButton
              class="attendance__plus-btn"
              @click="updateCounter('late', 1)"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
            ></IconButton>
          </div>
        </section>
      </div>
    </article>
    <Modal
      v-if="deleteCourseModal"
      class="delete-course-modal"
      @click="closeDeleteCourseModal"
      size="small"
    >
      <template #title>授業の削除</template>
      <template #contents>
        <p class="modal__text">
          「{{
            displayCourse.name
          }}」を削除しますか？(編集した情報や記録したメモ、出欠記録も削除されます。)
        </p>
      </template>
      <template #button>
        <Button
          @click="closeDeleteCourseModal"
          size="medium"
          layout="fill"
          color="base"
        >
          キャンセル
        </Button>
        <Button
          @click="deleteCourse"
          size="medium"
          layout="fill"
          color="danger"
        >
          削除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Button from "~/components/Button.vue";
import CourseDetail from "~/components/CourseDetail.vue";
import DecoratedIcon from "~/components/DecoratedIcon.vue";
import IconButton from "~/components/IconButton.vue";
import Modal from "~/components/Modal.vue";
import PageHeader from "~/components/PageHeader.vue";
import Popup from "~/components/Popup.vue";
import PopupContent, {
  Color as popupContentColor,
} from "~/components/PopupContent.vue";
import Tag from "~/components/Tag.vue";
import TagEditor from "~/components/TagEditor.vue";
import TextFieldMultilines from "~/components/TextFieldMultilines.vue";
import ToggleIconButton from "~/components/ToggleIconButton.vue";
import { displayToast } from "~/entities/toast";
import { getSyllbusUrl } from "~/entities/courseCard";
import { useSwitch } from "~/hooks/useSwitch";
import { usePorts } from "~/usecases";
import { deleteCourse as apiDeleteCourse } from "~/usecases/deleteCourse";
import { getCourseById } from "~/usecases/getCourseById";
import { openUrl } from "~/usecases/openUrl";
import { updateCourse } from "~/usecases/updateCourse";
import { extractMessageOrDefault } from "~/usecases/error";
import {
  apiToDisplayCourse,
  displayCourseToApi,
} from "~/usecases/useDisplayCourse";
import { RegisteredCourse, TagIdOnly } from "~/api/@types";
import { DisplayCourse } from "~/entities/course";
import { DisplayTag, NEW_TAG_ID } from "~/entities/tag";
import { getTags } from "~/usecases/getTags";
import { ApiTag, apiToDisplayTags } from "~/usecases/creditPageFunctions";
import { createTag } from "~/usecases/createTag";
import { updateCourseTags } from "~/usecases/updateCourseTags";

export default defineComponent({
  name: "Details",
  components: {
    Button,
    CourseDetail,
    DecoratedIcon,
    IconButton,
    Modal,
    PageHeader,
    Popup,
    PopupContent,
    Tag,
    TagEditor,
    TextFieldMultilines,
    ToggleIconButton,
  },
  setup: async () => {
    const ports = usePorts();
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params as { id: string };

    const baseCourse = ref<RegisteredCourse>(await getCourseById(ports)(id));
    const updateBaseCourse = async () => {
      baseCourse.value = await getCourseById(ports)(id);
    };
    const displayCourse = ref<DisplayCourse>(
      reactive(apiToDisplayCourse(baseCourse.value, "-"))
    );
    const updateDisplayCourse = () => {
      displayCourse.value = reactive(apiToDisplayCourse(baseCourse.value, "-"));
    };

    const updateCounter = (
      key: "attendance" | "late" | "absence",
      value: number
    ) => {
      if (displayCourse.value[key] + value < 0) return;
      displayCourse.value[key] += value;
      update();
    };

    const update = async () => {
      const course = displayCourseToApi(displayCourse.value, baseCourse.value);
      try {
        await updateCourse(ports)(id, course);
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        updateDisplayCourse();
        return;
      }
    };

    /** tag */
    const apiTags = ref<ApiTag[]>([]);
    const updateApiTags = async () => {
      apiTags.value = (await getTags(ports))
        .map(({ id, name, position }) => ({
          id,
          name,
          order: position ?? 0,
        }))
        .sort((a, b) => a.order - b.order);

      // console.log("update api tags", apiTags.value);
    };
    const displayTags = ref<DisplayTag[]>([]);
    const updateDisplayTags = () => {
      const assingedTagIds = baseCourse.value.tags.map(({ id }) => id);
      displayTags.value = reactive(
        apiToDisplayTags(assingedTagIds, apiTags.value)
      );
    };
    // initialization
    await updateApiTags();
    updateDisplayTags();

    const add = ref(false);
    const onCreateTag = async (name: string) => {
      // console.log("create tag");

      const assignedTagIds = displayTags.value.map(({ id }) => ({ id }));
      // api を叩く前に View を変更する
      displayTags.value.push({ id: NEW_TAG_ID, name, assign: true });

      let newTagId: string | undefined = undefined;
      try {
        newTagId = (await createTag(ports)(name)).id;
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
        updateDisplayTags();
        return;
      }
      if (newTagId === undefined) return;
      await updateApiTags();

      assignedTagIds.push({ id: newTagId });

      try {
        await updateCourseTags(ports)({
          courseId: baseCourse.value.id,
          assignedTags: assignedTagIds,
        });
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
        updateDisplayTags();
        return;
      }

      await updateBaseCourse();
      updateDisplayTags();
    };
    const onClickTag = async (clickedTag: DisplayTag) => {
      const assignedTags: TagIdOnly[] = displayTags.value
        .filter(({ id, assign }) => clickedTag.id !== id && assign)
        .map(({ id }) => ({ id }));
      if (!clickedTag.assign) assignedTags.push({ id: clickedTag.id });

      // api を叩く前に View を変更する
      clickedTag.assign = !clickedTag.assign;

      try {
        await updateCourseTags(ports)({
          courseId: baseCourse.value.id,
          assignedTags,
        });
      } catch (error) {
        displayToast(ports)(extractMessageOrDefault(error));
        updateDisplayTags();
        return;
      }

      await updateBaseCourse();
      updateDisplayTags();
    };

    /** delete-course-modal */
    const [
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
    ] = useSwitch();

    /** 授業を削除する */
    const deleteCourse = async () => {
      try {
        await apiDeleteCourse(ports)(id);
      } catch (error) {
        console.error(error);
        displayToast(ports)(extractMessageOrDefault(error));
        return;
      }
      closeDeleteCourseModal();
      router.push("/");
    };

    /** popup */
    const [showPopup, , closePopup, toggleShowPopup] = useSwitch(false);
    const popupData: {
      onClick: () => void;
      link: boolean;
      value: string;
      color: popupContentColor;
      gtmMarker: string;
    }[] = [
      {
        onClick: () => router.push(`/course/${id}/edit`),
        link: false,
        value: "編集する",
        color: "normal",
        gtmMarker: "course-edit",
      },
      {
        onClick: () =>
          openUrl(
            getSyllbusUrl(displayCourse.value.code, baseCourse.value.year)
          ),
        link: true,
        value: "シラバス",
        color: "normal",
        gtmMarker: "course-syllabus",
      },
      {
        onClick: () => openUrl("https://atmnb.tsukuba.ac.jp"),
        link: true,
        value: "出席(respon)",
        color: "normal",
        gtmMarker: "course-respon",
      },
      {
        onClick: () =>
          openUrl(
            `https://www.google.com/maps/search/筑波大学+${displayCourse.value.room}`
          ),
        link: true,
        value: "地図",
        color: "normal",
        gtmMarker: "course-map",
      },
      {
        onClick: openDeleteCourseModal,
        link: false,
        value: "削除する",
        color: "danger",
        gtmMarker: "course-delete",
      },
    ];

    // 手動で追加した授業はシラバスへ遷移できない
    if (baseCourse.value.course == undefined) popupData.splice(1, 1);

    return {
      displayCourse,
      updateCounter,
      showPopup,
      closePopup,
      toggleShowPopup,
      popupData,
      deleteCourseModal,
      openDeleteCourseModal,
      closeDeleteCourseModal,
      update,
      deleteCourse,
      displayTags,
      add,
      onCreateTag,
      onClickTag,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/styles";

.course-detail {
  @include max-width;
}

@include header-left-button-delete;
.header {
  &__right-button-icon {
    margin: $spacing-0 $spacing-0 $spacing-2 auto;
  }
}

.main {
  display: block;
  height: calc(#{$vh} - 8rem /*Headerとmargin-top*/);
  margin-top: $spacing-5;
  overflow-y: auto;
  @include max-width;
  @include scroll-mask;
  &__contents {
    padding-top: $spacing-3;
    overflow-y: auto;
  }
  &__code {
    font-size: $font-small;
    font-weight: 400;
    line-height: $fit;
    color: getColor(--color-text-sub);
  }
  &__name {
    font-size: $font-maximum;
    font-weight: 500;
    line-height: $multi-line;
    color: getColor(--color-text-main);
  }
  &__details {
    display: grid;
    gap: $spacing-4;
    margin: $spacing-5 $spacing-0 $spacing-8;
  }
  &__memo {
    margin: $spacing-8 $spacing-0;
  }
  &__attendance {
    margin-bottom: 4.1rem;
  }
  .attendance {
    display: grid;
    gap: $spacing-5;
    padding: $spacing-4 $spacing-6;
    background: inherit;
    box-shadow: $shadow-base;
    border-radius: $radius-3;
    &__item {
      display: grid;
      grid-template:
        "state ... minus-btn count plus-btn" $spacing-7
        / auto 1fr auto 5.9rem auto;
      justify-items: center;
      align-items: center;
    }
    &__state {
      grid-area: state;
      font-size: $font-medium;
      font-weight: 500;
      color: getColor(--color-text-main);
    }
    &__plus-btn {
      grid-area: plus-btn;
    }
    &__count {
      grid-area: count;
      font-size: $font-maximum;
      font-weight: 500;
      @include text-liner;
    }
    &__minus-btn {
      grid-area: minus-btn;
    }
  }
}

.delete-course-modal .modal {
  .button {
    width: calc(50% - $spacing-3);
    &:first-child {
      margin-right: $spacing-3;
    }
    &:last-child {
      margin-left: $spacing-3;
    }
  }
}
</style>
