<script setup lang="ts">
import { ref } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import { ConversationStore } from "@/modules/chat/store/ConversationStore";
import ChatWindow from "@/modules/chat/components/ChatWindow.vue";
import MessageInput from "@/modules/chat/components/MessageInput.vue";
import ConversationList from "@/modules/chat/components/ConversationList.vue";
import ChatService from "@/modules/chat/services/ChatService";
import ConversationService from "@/modules/chat/services/ConversationService";
import "@/modules/chat/assets/chat.scss";

const useChatStore = ChatStore();
const useConversationStore = ConversationStore();
const messages = useChatStore.messages; // Bind messages from store

const handleSendMessage = async (message: string) => {
  if (!message.trim()) return;

  try {
    // Step 1: Ensure there's an active conversation
    if (!useChatStore.conversationId) {
      const conversationId = await useConversationStore.createConversation(message, ConversationService);

      if (conversationId) {
        useChatStore.conversationId = conversationId;
      } else {
        throw new Error("Failed to create conversation.");
      }
    }

    // Step 2: Send the message
    await useChatStore.sendMessage(message, ChatService);
  } catch (error) {
    console.error("Error in sendMessage:", error);
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-history">
      <ConversationList />
    </div>
    <div class="chat-conversation">
      <ChatWindow :messages="messages" />
      <MessageInput @send-message="handleSendMessage" />
    </div>
  </div>
</template>
