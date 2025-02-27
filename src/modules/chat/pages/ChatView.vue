<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "@/modules/chat/store/useChatStore";
import '@/modules/chat/assets/chat.scss';

const chatStore = useChatStore();
const newMessage = ref("");

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  await chatStore.sendMessage(newMessage.value);
  newMessage.value = "";
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-history">

    </div>
    <div class="chat-conversation">
      <div class="chat-messages">
        <div v-for="(msg, index) in chatStore.messages" :key="index" :class="['message', msg.sender]">
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>