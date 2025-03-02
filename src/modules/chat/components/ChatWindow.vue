<template>
  <div class="chat-messages" ref="chatWindow">
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      :class="['message', message.sender]"
      :ref="index === messages.length - 1 ? 'lastMessage' : null"
    >
    <span v-html="message.displayed ? message.text : ''"></span> <!-- Only display text after it's fully typed -->
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

const useChatStore = ChatStore();
const messages = computed(() => useChatStore.messages);
const chatWindow = ref(null);

const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
  }
};

const simulateTypingEffect = (messageIndex) => {
  let message = messages.value[messageIndex];
  let currentIndex = 0;
  const originalText = message.text;
  message.text = ""; // Start with empty text
  let insideTag = false; // Flag to check if we're inside an HTML tag
  let tagBuffer = ""; // Buffer to store the current tag content

  const typingInterval = setInterval(() => {
    if (currentIndex < originalText.length) {
      const currentChar = originalText[currentIndex];

      // Handle HTML tags
      if (currentChar === '<') {
        insideTag = true; // We're inside a tag
        tagBuffer = "<"; // Start a new tag buffer
      } else if (currentChar === '>') {
        insideTag = false; // We're outside of a tag
        tagBuffer += ">";
        message.text += tagBuffer; // Append the complete tag
        tagBuffer = ""; // Reset tag buffer
      } else if (insideTag) {
        tagBuffer += currentChar; // Continue building the tag
      } else {
        message.text += currentChar; // Append normal text
      }

      currentIndex++;
    } else {
      clearInterval(typingInterval);
      message.displayed = true; // Mark as fully displayed
    }
  }, 10);
};

watch(
  () => useChatStore.messages,
  (newMessages) => {
    messages.value = newMessages;
    const lastMessageIndex = messages.value.length - 1;
    const lastMessage = messages.value[lastMessageIndex];

    // If it's a new bot message and hasn't been displayed yet, trigger typing effect
    if (lastMessage.sender === "bot" && !lastMessage.displayed) {
      lastMessage.displayed = false;
      simulateTypingEffect(lastMessageIndex);
    }
  },
  { deep: true }
);

onUpdated(async () => {
  await nextTick();
  scrollToBottom();
});
</script>
