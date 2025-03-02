<script setup lang="ts">
import { onMounted, computed } from "vue";
import { ConversationStore } from "@/modules/chat/store/ConversationStore";
import ConversationService from "@/modules/chat/services/ConversationService";

const useConversationStore = ConversationStore();

const selectConversation = (conversationId: number) => {
  useConversationStore.loadMessages(conversationId);
};

const groupedConversations = computed(() => useConversationStore.groupedConversations);

// Fetch conversations when the component is mounted
onMounted(() => {
  useConversationStore.fetchConversations(ConversationService);
});
</script>

<template>
  <div class="conversation-list">

    <div v-if="groupedConversations.today.length">
      <h4>Today</h4>
      <ul>
        <li v-for="conv in [...groupedConversations.today].reverse()" :key="conv.id" @click="selectConversation(conv.id)">
          {{ conv.title || `Conversation ${conv.id}` }}
        </li>
      </ul>
    </div>

    <div v-if="groupedConversations.yesterday.length">
      <h4>Yesterday</h4>
      <ul>
        <li v-for="conv in [...groupedConversations.yesterday].reverse()" :key="conv.id" @click="selectConversation(conv.id)">
          {{ conv.title || `Conversation ${conv.id}` }}
        </li>
      </ul>
    </div>

    <div v-if="groupedConversations.last7Days.length">
      <h4>Last 7 Days</h4>
      <ul>
        <li v-for="conv in [...groupedConversations.last7Days].reverse()" :key="conv.id" @click="selectConversation(conv.id)">
          {{ conv.title || `Conversation ${conv.id}` }}
        </li>
      </ul>
    </div>

    <div v-for="(convs, month) in groupedConversations.older" :key="month">
      <h4>{{ month }}</h4>
      <ul>
        <li v-for="conv in [...convs].reverse()" :key="conv.id" @click="selectConversation(conv.id)">
          {{ conv.title || `Conversation ${conv.id}` }}
        </li>
      </ul>
    </div>

    <p v-if="!useConversationStore.conversations.length">No chat history available.</p>
  </div>
</template>
