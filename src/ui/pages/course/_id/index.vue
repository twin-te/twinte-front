<template>
  <div class="course-detail">
    <PageHeader>
      <template #left-button-icon>
        <IconButton
          size="large"
          color="normal"
          iconName="arrow_back"
          @click="$router.push('/')"
        ></IconButton>
      </template>
      <template #title>授業詳細</template>
      <template #right-button-icon>
        <div v-click-away="closePopup">
          <ToggleIconButton
            class="header__right-button-icon"
            size="large"
            color="normal"
            iconName="more_vert"
            :isActive="isVisiblePopup"
            @click="toggleShowPopup"
          ></ToggleIconButton>
          <Popup v-show="isVisiblePopup">
            <PopupContent
              v-for="content in popupContents"
              :key="content.value"
              :link="content.link"
              :value="content.value"
              :color="content.color"
              :gtm-marker="content.gtmMarker"
              @click="content.onClick"
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
          <CourseDetail item="開講時限" :value="displayCourse.schedule.full">
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
        <TagEditor v-model:add="add" heading="タグ" @create-tag="onCreateTag">
          <template #tags>
            <Tag
              v-for="tag in displayCourse.tags"
              :key="tag.id"
              :assign="tag.assign"
              @click="() => onClickTag(tag)"
              >{{ tag.name }}
            </Tag>
            <template v-if="displayCourse.tags.length === 0">
              作成済みのタグがありません。<br />
              タグを作成すると授業を分類することができます。
            </template>
          </template>
          <template #btn>タグを新たに作成する</template>
        </TagEditor>
        <TextFieldMultilines
          v-model="displayCourse.memo"
          class="main__memo"
          placeholder="メモを入力"
          height="10.3rem"
          style="width: 100%"
          @update:modelValue="updateMemo"
        ></TextFieldMultilines>
        <section class="main__attendance attendance">
          <div class="attendance__item">
            <p class="attendance__state">出席</p>
            <IconButton
              class="attendance__minus-btn"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('attendance', -1)"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.attendance }}</p>
            <IconButton
              class="attendance__plus-btn"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('attendance', 1)"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">欠席</p>
            <IconButton
              class="attendance__minus-btn"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('absence', -1)"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.absence }}</p>
            <IconButton
              class="attendance__plus-btn"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('absence', 1)"
            ></IconButton>
          </div>
          <div class="attendance__item">
            <p class="attendance__state">遅刻</p>
            <IconButton
              class="attendance__minus-btn"
              size="small"
              color="primary"
              iconName="remove"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('late', -1)"
            ></IconButton>
            <p class="attendance__count">{{ displayCourse.late }}</p>
            <IconButton
              class="attendance__plus-btn"
              size="small"
              color="primary"
              iconName="add"
              data-gtm-marker="attendance-record-button"
              @click="updateCounter('late', 1)"
            ></IconButton>
          </div>
        </section>
      </div>
    </article>
    <Modal
      v-if="isVisibleDeleteCourseModal"
      class="delete-course-modal"
      size="small"
      @click="closeDeleteCourseModal"
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
          size="medium"
          layout="fill"
          color="base"
          @click="closeDeleteCourseModal"
        >
          キャンセル
        </Button>
        <Button
          size="medium"
          layout="fill"
          color="danger"
          @click="onClickDeleteCourseButton"
        >
          削除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NotFoundError } from "~/domain/error";
import { registeredCourseToDisplay } from "~/presentation/presenters/course";
import Button from "~/ui/components/Button.vue";
import CourseDetail from "~/ui/components/CourseDetail.vue";
import DecoratedIcon from "~/ui/components/DecoratedIcon.vue";
import IconButton from "~/ui/components/IconButton.vue";
import Modal from "~/ui/components/Modal.vue";
import PageHeader from "~/ui/components/PageHeader.vue";
import Popup from "~/ui/components/Popup.vue";
import PopupContent from "~/ui/components/PopupContent.vue";
import Tag from "~/ui/components/Tag.vue";
import TagEditor from "~/ui/components/TagEditor.vue";
import TextFieldMultilines from "~/ui/components/TextFieldMultilines.vue";
import ToggleIconButton from "~/ui/components/ToggleIconButton.vue";
import { useSwitch } from "~/ui/hooks/useSwitch";
import {
  dropCourse,
  getCourseById,
  setCourseById,
  updateCourse,
} from "~/ui/store/course";
import { createTag, getAllTags, setAllTags } from "~/ui/store/tag";
import { getSyllabusUrl, openUrl, getResponUrl, getMapUrl } from "~/ui/url";
import type { RegisteredCourse } from "~/domain/course";
import type { DisplayCourseTag } from "~/presentation/viewmodels/tag";
import type { PopupContentColor } from "~/ui/components/PopupContent.vue";

const route = useRoute();
const router = useRouter();

/** course */
const { id } = route.params as { id: string };
try {
  await setCourseById(id);
} catch (error) {
  if (error instanceof NotFoundError) router.push("/404");
  else throw error;
}
const course = getCourseById(id) as ComputedRef<RegisteredCourse>;

/** tag */
await setAllTags();
const tags = getAllTags();

/** display course */
const displayCourse = ref(registeredCourseToDisplay(course.value, tags.value));

const updateMemo = async (newMemo: string) => {
  displayCourse.value = { ...displayCourse.value, memo: newMemo };
  await updateCourse(id, { memo: newMemo });
};

const updateCounter = async (
  key: Extract<keyof RegisteredCourse, "attendance" | "late" | "absence">,
  diff: number
) => {
  const newValue = displayCourse.value[key] + diff;
  if (newValue < 0) return;
  displayCourse.value = { ...displayCourse.value, [key]: newValue };
  await updateCourse(id, { [key]: newValue });
};

/** tag editor */
const add = ref(false);

const onCreateTag = async (name: string) => {
  displayCourse.value.tags.push({ id: "new-tag", name, assign: true });
  displayCourse.value = { ...displayCourse.value };

  let createdTag: { id: string } | undefined = undefined;
  try {
    createdTag = await createTag(name);
  } catch (error) {
    displayCourse.value = registeredCourseToDisplay(course.value, tags.value);
    throw error;
  }
  await updateCourse(id, { tagIds: [...course.value.tagIds, createdTag.id] });
};

const onClickTag = async (clickedTag: DisplayCourseTag) => {
  clickedTag.assign = !clickedTag.assign;
  displayCourse.value = { ...displayCourse.value };
  const assignedTagIds: string[] = displayCourse.value.tags
    .filter(({ assign }) => assign)
    .map(({ id }) => id);
  await updateCourse(id, { tagIds: assignedTagIds });
};

/** delete course modal */
const [
  isVisibleDeleteCourseModal,
  openDeleteCourseModal,
  closeDeleteCourseModal,
] = useSwitch();

const onClickDeleteCourseButton = async () => {
  await dropCourse(id);
  await router.push("/");
};

/** popup */
const [isVisiblePopup, , closePopup, toggleShowPopup] = useSwitch(false);

const popupContents: {
  onClick: () => void;
  link: boolean;
  value: string;
  color: PopupContentColor;
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
        getSyllabusUrl(displayCourse.value.year, displayCourse.value.code)
      ),
    link: true,
    value: "シラバス",
    color: "normal",
    gtmMarker: "course-syllabus",
  },
  {
    onClick: () => openUrl(getResponUrl()),
    link: true,
    value: "出席(respon)",
    color: "normal",
    gtmMarker: "course-respon",
  },
  {
    onClick: () => openUrl(getMapUrl(displayCourse.value.room)),
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

// If the course is added by manual, the syllabus does not exist.
if (course.value.code == undefined) popupContents.splice(1, 1);
</script>

<style scoped lang="scss">
@import "~/ui/styles";

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
