<script setup lang="ts">
import { ref } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import ChatWindow from "@/modules/chat/components/ChatWindow.vue";
import MessageInput from "@/modules/chat/components/MessageInput.vue";
import "@/modules/chat/assets/chat.scss";

const useChatStore = ChatStore();
const messages = useChatStore.messages; // Bind messages from store

const sendMessage = async (message: string) => {
  if (!message.trim()) return;
  await useChatStore.sendMessage(message);
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-history">

    </div>
    <div class="chat-conversation">
      <ChatWindow :messages="messages" />
      <MessageInput @send-message="sendMessage" />
    </div>
  </div>
</template>