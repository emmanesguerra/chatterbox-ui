<template>
    <div class="chat-input">
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const message = ref('');
  const emit = defineEmits(['send-message']);
  
  const sendMessage = () => {
    if (message.value.trim() !== '') {
      emit('send-message', message.value);
      message.value = '';
    }
  };
  </script>
  