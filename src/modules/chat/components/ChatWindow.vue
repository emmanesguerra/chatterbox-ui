<template>
    <div class="chat-messages">
      <div v-for="message in messages" 
        :key="message.id" 
        :class="['message', message.sender]" >
        <span v-html="message.text"></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    messages: Array,
  });
  </script>