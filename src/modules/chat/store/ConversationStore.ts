import { defineStore } from "pinia";
import dayjs from "dayjs";

export const ConversationStore = defineStore("conversation", {
  state: () => ({
    conversations: [] as { id: number; title?: string; created_at: string }[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    groupedConversations: (state) => {
      const today: any[] = [];
      const yesterday: any[] = [];
      const last7Days: any[] = [];
      const older: Record<string, any[]> = {}; // Group by Month-Year

      state.conversations.forEach((conversation) => {
        const date = dayjs(conversation.created_at);

        if (date.isSame(dayjs(), "day")) {
          today.push(conversation);
        } else if (date.isSame(dayjs().subtract(1, "day"), "day")) {
          yesterday.push(conversation);
        } else if (date.isAfter(dayjs().subtract(7, "day"), "day")) {
          last7Days.push(conversation);
        } else {
          const monthKey = date.format("MMMM YYYY");
          if (!older[monthKey]) {
            older[monthKey] = [];
          }
          older[monthKey].push(conversation);
        }
      });

      return { today, yesterday, last7Days, older };
    },
  },

  actions: {
    async fetchConversations(conversationService: { fetchConversations: () => Promise<any> }) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await conversationService.fetchConversations();
        if (response?.data) {
          this.conversations = response.data;
        } else {
          throw new Error("Invalid response from ConversationService.");
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Failed to load conversations.";
      } finally {
        this.loading = false;
      }
    },

    async createConversation(
      message: string, 
      conversationService: { createConversation: (msg: string) => Promise<any> }
    ) {
      this.error = null;
      
      try {
        const response = await conversationService.createConversation(message);
        if (response?.data?.id) {
          this.conversations.push({ 
            id: response.data.id, 
            title: response.data.title, 
            created_at: response.data.created_at 
          });
          return response.data.id;
        } else {
          throw new Error("Failed to create conversation.");
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Failed to create conversation.";
      }
    },

    async deleteConversation(
      conversationId: number, 
      conversationService: { deleteConversation: (id: number) => Promise<any> }
    ) {
      this.error = null;
      
      try {
        await conversationService.deleteConversation(conversationId);
        
        this.conversations = this.conversations.filter(convo => convo.id !== conversationId);
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Failed to delete conversation.";
      }
    }
  },
});
