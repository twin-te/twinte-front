<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import { Room } from "~/domain/room";
import { isEqualSchedule, Schedule, sortSchedules } from "~/domain/schedule";
import { schedulesToFullString } from "~/presentation/presenters/schedule";
import CheckContent from "./CheckContent.vue";
import Label from "./Label.vue";
import TertiaryButton from "./TertiaryButton.vue";
import TextFieldSingleLine from "./TextFieldSingleLine.vue";

export default defineComponent({
  name: "RoomEditor",
  components: {
    CheckContent,
    Label,
    TextFieldSingleLine,
    TertiaryButton,
  },
  props: {
    rooms: {
      type: Array as PropType<Room[]>,
      required: true,
    },
    schedules: {
      type: Array as PropType<Schedule[]>,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<"normal" | "slim">,
      default: "normal",
    },
  },
  emits: ["update:rooms"],
  setup(props, { emit }) {
    const data = computed(() =>
      props.rooms.map((room) => {
        const contents = props.schedules.map((schedule) => ({
          label: schedulesToFullString([schedule]),
          checked: room.schedules.some((target) =>
            isEqualSchedule(target, schedule)
          ),
        }));

        return {
          name: room.name,
          contents,
        };
      })
    );

    watch(
      () => props.schedules,
      (newSchedules) => {
        const newRooms = props.rooms.map(({ name, schedules }) => ({
          name,
          schedules: schedules.filter((target) =>
            newSchedules.some((schedule) => isEqualSchedule(schedule, target))
          ),
        }));
        emit("update:rooms", newRooms);
      }
    );

    const addRoom = () => {
      const newRooms = [...props.rooms, { name: "", schedules: [] }];
      emit("update:rooms", newRooms);
    };

    const updateName = (i: number, v: string) => {
      const targetRoom = props.rooms[i];
      const newRooms = [...props.rooms];
      newRooms.splice(i, 1, { ...targetRoom, name: v });
      emit("update:rooms", newRooms);
    };

    const updateChecked = (i: number, j: number, checked: boolean) => {
      const targetRoom = props.rooms[i];
      const targetSchedule = props.schedules[j];
      const k = targetRoom.schedules.findIndex((schedule) =>
        isEqualSchedule(schedule, targetSchedule)
      );
      const newRooms = [...props.rooms];

      if (checked && k === -1) {
        const newRoom = {
          name: targetRoom.name,
          schedules: sortSchedules([...targetRoom.schedules, targetSchedule]),
        };
        newRooms.splice(i, 1, newRoom);
        emit("update:rooms", newRooms);
      } else if (!checked && k !== -1) {
        const newRoom = {
          name: targetRoom.name,
          schedules: targetRoom.schedules.filter((_, l) => l !== k),
        };
        newRooms.splice(i, 1, newRoom);
        emit("update:rooms", newRooms);
      }
    };

    const deleteRoom = (i: number) => {
      const newRooms = [...props.rooms];
      newRooms.splice(i, 1);
      emit("update:rooms", newRooms);
    };

    return {
      data,
      addRoom,
      updateName,
      updateChecked,
      deleteRoom,
    };
  },
});
</script>

<template>
  <div class="room-editor">
    <Label
      v-if="label !== ''"
      :value="label"
      :mandatory="mandatory"
      :size="size"
    ></Label>
    <div class="room-editor__container">
      <div
        v-for="({ name, contents }, i) in data"
        :key="i"
        class="room-editor__box"
      >
        <TextFieldSingleLine
          :model-value="name"
          :placeholder="placeholder"
          added
          @update:model-value="(v) => updateName(i, v)"
          @close="deleteRoom(i)"
        ></TextFieldSingleLine>
        <div class="room-editor__checkboxes">
          <CheckContent
            v-for="(content, j) in contents"
            :key="content.label"
            :checked="content.checked"
            @update:checked="(checked) => updateChecked(i, j, checked)"
            >{{ content.label }}</CheckContent
          >
        </div>
      </div>
    </div>
    <TertiaryButton color="ghost" icon-position="left" @click="addRoom">
      <template #icon>add</template>
      <template #text>追加する</template>
    </TertiaryButton>
  </div>
</template>

<style scoped lang="scss">
@import "~/ui/styles";

.room-editor {
  display: grid;
  gap: $spacing-2;

  &__container {
    display: grid;
    gap: $spacing-8;
  }

  &__box {
    display: grid;
    gap: $spacing-3;
  }

  &__checkboxes {
    display: grid;
    gap: $spacing-5;
  }
}
</style>
