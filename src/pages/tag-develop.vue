<template>
  <div class="tag-develop">
    <Tag
      v-for="tag in tags"
      :key="tag.id"
      @click="tag.assign = !tag.assign"
      :assign="tag.assign"
      >{{ tag.name }}</Tag
    >
    <TagListContent
      name="すべて"
      credit="20.0"
      mode="filtering"
      :selected="false"
      :textfield="false"
      drag-handle="show"
    ></TagListContent>
    <TagListContent
      name="すべて"
      credit="1.0"
      mode="filtering"
      :selected="true"
      :textfield="false"
      drag-handle="show"
    ></TagListContent>
    <TagListContent
      name="すべて"
      credit="1.0"
      mode="edit"
      :selected="false"
      :textfield="false"
      drag-handle="show"
    >
      <template #btns>
        <IconButton size="small" color="normal" icon-name="edit"></IconButton>
        <IconButton size="small" color="danger" icon-name="delete"></IconButton>
      </template>
    </TagListContent>
    <TagListContent
      name="必修"
      credit="1.0"
      mode="edit"
      :selected="false"
      :textfield="true"
      drag-handle="show"
    >
      <template #textfiled>
        <TextFieldSingleLine
          v-model.trim="textfieldValue1"
          placeholder="タグの名前"
        ></TextFieldSingleLine>
      </template>
      <template #btns>
        <IconButton size="small" color="normal" icon-name="check"></IconButton>
        <IconButton size="small" color="danger" icon-name="delete"></IconButton>
      </template>
    </TagListContent>
    <TagListContent
      name="必修"
      credit="1.0"
      mode="edit"
      :selected="false"
      :textfield="true"
      drag-handle="disabled"
    >
      <template #textfiled>
        <TextFieldSingleLine
          v-model.trim="textfieldValue1"
          placeholder="タグの名前"
        ></TextFieldSingleLine>
      </template>
      <template #btns>
        <IconButton size="small" color="normal" icon-name="check"></IconButton>
        <IconButton size="small" color="danger" icon-name="delete"></IconButton>
      </template>
    </TagListContent>
    <TagListContent
      name=""
      credit="1.0"
      mode="edit"
      :selected="false"
      :textfield="true"
      drag-handle="hide"
    >
      <template #textfiled>
        <TextFieldSingleLine
          v-model.trim="textfieldValue2"
          placeholder="タグの名前"
        ></TextFieldSingleLine>
      </template>
      <template #btns>
        <IconButton size="small" color="normal" icon-name="check"></IconButton>
        <IconButton size="small" color="danger" icon-name="clear"></IconButton>
      </template>
    </TagListContent>
    <TagEditor @create-tag="createTag" v-model:add="add">
      <template #tags>
        <Tag
          v-for="tag in tags"
          :key="tag.id"
          @click="tag.assign = !tag.assign"
          :assign="tag.assign"
          >{{ tag.name }}
        </Tag>
      </template>
      <template #btn>タグを新たに作成する</template>
    </TagEditor>
    <TagEditor @create-tag="createTag" v-model:add="add">
      <template #tags>作成されたタグがありません</template>
      <template #btn>タグを新たに作成する</template>
    </TagEditor>
    <CreditCourseListContent
      v-for="content in creditCourseListContents"
      :key="content.id"
      @click="
        content.state = content.state === 'selected' ? 'default' : 'selected'
      "
      :state="content.state"
      :code="content.code"
      :name="content.name"
      :credit="content.credit"
      :tags="content.tags"
    ></CreditCourseListContent>
    <CreditCourseListContent
      v-for="content in creditCourseListContents"
      :key="content.id"
      @click="
        content.state = content.state === 'selected' ? 'default' : 'selected'
      "
      :state="content.state"
      :code="content.code"
      :name="content.name"
      :credit="content.credit"
      :tags="[]"
    ></CreditCourseListContent>
    <CreditFilter
      @create-tag="createCreditFilterTag"
      @update-tag-name="updateCreditFilterTagName"
      @delete-tag="deleteCreditFilterTag"
      v-model:mode="mode"
      :year-options="yearOptions"
      v-model:selected-year="selectedYear"
      :total-credit="totalCredit"
      v-model:selected-tag-id="selectedTagId"
      :tags="creditFilterTags"
    >
    </CreditFilter>
    <draggable
      :model-value="list"
      @update:model-value="updateList"
      item-key="id"
      :animation="250"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <div
          class="list-item"
          :style="{ padding: '2rem', border: '1px solid black' }"
        >
          <span class="handle">handle</span>
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import draggable from "vuedraggable";
import Tag from "~/components/Tag.vue";
import TagListContent from "~/components/TagListContent.vue";
import TextFieldSingleLine from "~/components/TextFieldSingleLine.vue";
import IconButton from "~/components/IconButton.vue";
import TagEditor from "~/components/TagEditor.vue";
import CreditCourseListContent from "~/components/CreditCourseListContent.vue";
import CreditFilter, { CreditFilterMode } from "~/components/CreditFilter.vue";
import { CreditTag } from "~/entities/tag";
import { CreditCourseWithState } from "~/entities/course";

export default defineComponent({
  name: "TagDevelop",
  components: {
    draggable,
    Tag,
    TagListContent,
    TextFieldSingleLine,
    IconButton,
    TagEditor,
    CreditCourseListContent,
    CreditFilter,
  },
  setup() {
    /** tag */
    const tags = reactive([
      { id: "0", name: "専門", assign: false },
      { id: "1", name: "専門基礎", assign: false },
      { id: "2", name: "自由", assign: false },
      { id: "3", name: "教職", assign: false },
      { id: "4", name: "必修", assign: false },
      { id: "5", name: "選択", assign: false },
      { id: "6", name: "学士基盤", assign: false },
    ]);

    /** tag-list-content */
    const textfieldValue1 = ref("");
    const textfieldValue2 = ref("");

    /** tag-editor */
    const add = ref(false);
    const createTag = (tagName: string) => {
      const id = String(
        tags.reduce((id, tag) => {
          if (id < Number(tag.id)) id = Number(tag.id);
          return id;
        }, 0) + 1
      );
      tags.push({ id, name: tagName, assign: true });
    };

    /** credit-course-list-content */
    const creditCourseListContents: CreditCourseWithState[] = reactive([
      {
        id: "1",
        state: "default",
        code: "01EB512",
        name: "色彩計画論特講",
        credit: "1.5",
        tags: [
          { id: "0", name: "専門", assign: false },
          { id: "1", name: "専門基礎", assign: true },
          { id: "2", name: "自由", assign: false },
          { id: "3", name: "教職", assign: false },
          { id: "4", name: "必修", assign: false },
          { id: "5", name: "選択", assign: false },
          { id: "6", name: "学士基盤", assign: false },
        ],
      },
      {
        id: "2",
        state: "default",
        code: "EB51201",
        name: "応用体育シューティングスポーツ",
        credit: "2.0",
        tags: [
          { id: "0", name: "専門", assign: false },
          { id: "1", name: "専門基礎", assign: false },
          { id: "2", name: "自由", assign: false },
          { id: "3", name: "教職", assign: false },
          { id: "4", name: "必修", assign: true },
          { id: "5", name: "選択", assign: false },
          { id: "6", name: "学士基盤", assign: true },
        ],
      },
    ]);

    /** credit-filter */
    const mode = ref<CreditFilterMode>("filtering");
    const yearOptions: string[] = [
      "すべての年度",
      "2022年度",
      "2021年度",
      "2020年度",
      "2019年度",
    ];
    const selectedYear = ref(yearOptions[0]);
    const totalCredit = ref("20.0");
    const selectedTagId = ref<string | undefined>(undefined);
    const creditFilterTags = reactive<CreditTag[]>([
      { id: "0", name: "選択", credit: "7.0" },
      { id: "1", name: "選択必修", credit: "7.0" },
      { id: "2", name: "必修", credit: "0.0" },
      { id: "3", name: "自由", credit: "4.0" },
      { id: "4", name: "教職", credit: "3.0" },
      { id: "5", name: "学士基盤", credit: "1.0" },
      { id: "6", name: "GB", credit: "10.0" },
      { id: "7", name: "情報", credit: "4.0" },
      { id: "8", name: "英語", credit: "4.0" },
    ]);
    const createCreditFilterTag = (name: string) => {
      const id = String(
        creditFilterTags.reduce((id, tag) => {
          if (id < Number(tag.id)) id = Number(tag.id);
          return id;
        }, 0) + 1
      );
      creditFilterTags.push({ id, name, credit: "0.0" });
    };
    const updateCreditFilterTagName = (id: string, name: string) => {
      const idx = creditFilterTags.findIndex((tag) => tag.id === id);
      if (idx == -1) throw new Error("Not Found tag with id " + id);
      creditFilterTags[idx].name = name;
    };
    const deleteCreditFilterTag = (id: string) => {
      const idx = creditFilterTags.findIndex((tag) => tag.id === id);
      if (idx == -1) throw new Error("Not Found tag with id " + id);
      creditFilterTags.splice(idx, 1);
    };

    /** vue draggable */
    // https://sortablejs.github.io/vue.draggable.next/#/transition-example-2
    const list = ref([
      { id: "0", name: "選択" },
      { id: "1", name: "必修" },
      { id: "2", name: "自由" },
    ]);
    const updateList = (newList: any[]) => {
      list.value = newList;
    };
    const drag = ref(false);

    return {
      textfieldValue1,
      textfieldValue2,
      tags,
      createTag,
      add,
      creditCourseListContents,
      mode,
      yearOptions,
      selectedYear,
      totalCredit,
      selectedTagId,
      creditFilterTags,
      createCreditFilterTag,
      updateCreditFilterTagName,
      deleteCreditFilterTag,
      list,
      updateList,
      drag,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~/scss/main.scss";

.tag-develop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;

  padding-bottom: 50rem;
}
</style>
