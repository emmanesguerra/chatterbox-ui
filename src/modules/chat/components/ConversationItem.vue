<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps<{
  conversation: { id: number; title?: string };
}>();

const emit = defineEmits(["delete", "select"]);

const confirmDelete = (id: number) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this conversation?");
  if (isConfirmed) {
    emit("delete", props.conversation.id);
  }
};
</script>

<template>
  <li @click="$emit('select', conversation.id)">
    <span>{{ conversation.title }}</span>
    <i class="ri-delete-bin-line delete-icon" @click.stop="confirmDelete(conversation.id)"></i>
  </li>
</template>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

li span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-icon {
  margin-left: 10px;
  padding: 2px 4px;
  cursor: pointer;
  background: rgb(0, 0, 0);
  border-radius: 3px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  flex-shrink: 0;
}

li:hover .delete-icon {
  opacity: 1;
}
</style>
