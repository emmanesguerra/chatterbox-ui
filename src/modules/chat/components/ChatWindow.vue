<template>
  <div class="chat-messages" ref="chatWindow">
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      :class="['message', message.sender]"
      :ref="index === messages.length - 1 ? 'lastMessage' : null"
    >
      <Messages :message="message" />
    </div>

    <div v-if="useChatStore.loading" class="preloader">
      <div class="scaling-circle"></div>
      <span class="generating-text">Generating a response...</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUpdated, nextTick } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import Messages from "@/modules/chat/components/Messages.vue";

const useChatStore = ChatStore();
const messages = computed(() => useChatStore.messages);
const chatWindow = ref(null);

const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
  }
};

onUpdated(async () => {
  await nextTick();
  scrollToBottom();
});
</script>