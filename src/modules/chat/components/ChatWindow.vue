<template>
  <div class="chat-messages">
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      :class="['message', message.sender]"
    >
      <span v-html="message.text"></span>
    </div>

    <div v-if="useChatStore.loading" class="preloader">
      <div class="scaling-circle"></div>
      <span class="generating-text">Generating a response...</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";

const useChatStore = ChatStore();
const messages = computed(() => useChatStore.messages);
</script>
