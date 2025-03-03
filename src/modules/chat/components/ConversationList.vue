<script setup lang="ts">
import { onMounted, computed } from "vue";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import ChatService from "@/modules/chat/services/ChatService";
import { ConversationStore } from "@/modules/chat/store/ConversationStore";
import ConversationService from "@/modules/chat/services/ConversationService";
import ConversationItem from "@/modules/chat/components/ConversationItem.vue"; // Import new component

const useConversationStore = ConversationStore();
const useChatStore = ChatStore();

const selectConversation = (conversationId: number) => {
  useChatStore.loadMessages(conversationId, ChatService);
};

const resetChat = () => {
  useChatStore.$reset();
};

const groupedConversations = computed(() => useConversationStore.groupedConversations);

const deleteConversation = async (conversationId: number) => {
  await useConversationStore.deleteConversation(conversationId, ConversationService);

  if(useChatStore.conversationId === conversationId) {
    useChatStore.$reset();
  }
};

onMounted(() => {
  if (!useConversationStore.conversations.length) {
    useConversationStore.fetchConversations(ConversationService);
  }
});
</script>

<template>
  <div class="conversation-list">
    <div class="header">
      <ul>
        <li><span @click="resetChat">+ Start Conversation</span></li>
      </ul>
    </div>

    <div v-if="groupedConversations.today.length">
      <h4>Today</h4>
      <ul>
        <ConversationItem
          v-for="conv in [...groupedConversations.today].reverse()"
          :key="conv.id"
          :conversation="conv"
          @select="selectConversation"
          @delete="deleteConversation"
        />
      </ul>
    </div>

    <div v-if="groupedConversations.yesterday.length">
      <h4>Yesterday</h4>
      <ul>
        <ConversationItem
          v-for="conv in [...groupedConversations.yesterday].reverse()"
          :key="conv.id"
          :conversation="conv"
          @select="selectConversation"
          @delete="deleteConversation"
        />
      </ul>
    </div>

    <div v-if="groupedConversations.last7Days.length">
      <h4>Last 7 Days</h4>
      <ul>
        <ConversationItem
          v-for="conv in [...groupedConversations.last7Days].reverse()"
          :key="conv.id"
          :conversation="conv"
          @select="selectConversation"
          @delete="deleteConversation"
        />
      </ul>
    </div>

    <div v-for="(convs, month) in groupedConversations.older" :key="month">
      <h4>{{ month }}</h4>
      <ul>
        <ConversationItem
          v-for="conv in [...convs].reverse()"
          :key="conv.id"
          :conversation="conv"
          @select="selectConversation"
          @delete="deleteConversation"
        />
      </ul>
    </div>

    <p v-if="!useConversationStore.conversations.length">No chat history available.</p>
  </div>
</template>
