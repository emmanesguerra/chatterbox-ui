<template>
    <span v-html="message.displayed ? message.text : ''"></span>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  
  const props = defineProps({
    message: {
      type: Object,
      required: true
    }
  });
  
  const simulateTypingEffect = async (message) => {
    const originalText = message.text;
    let updatedText = '';
    let currentIndex = 0;
    
    while (currentIndex < originalText.length) {
      updatedText += originalText[currentIndex];
      message.text = updatedText;
      currentIndex++;
      await new Promise(resolve => setTimeout(resolve, 1));
    }
  
    message.displayed = true;
  };
  
  watch(
    () => props.message,
    (newMessage) => {
      if (newMessage.sender === "bot" && !newMessage.displayed) {
        newMessage.displayed = false;
        simulateTypingEffect(newMessage);
      }
    },
    { immediate: true }
  );
  
  onMounted(() => {
    if (!props.message.displayed) {
      simulateTypingEffect(props.message);
    }
  });
  </script>
  