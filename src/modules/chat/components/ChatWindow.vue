<template>
  <div class="chat-messages">
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      :class="['message', message.sender]"
    >
      <span v-html="message.text"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";

const useChatStore = ChatStore();
const messages = computed(() => useChatStore.messages);
</script>
