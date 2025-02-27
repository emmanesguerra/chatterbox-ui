<template>
    <div class="chat-window">
      <div v-for="message in messages" :key="message.id" class="message">
        <span class="user">{{ message.user }}:</span> {{ message.text }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    messages: Array,
  });
  </script>