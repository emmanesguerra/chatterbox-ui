import { defineStore } from "pinia";
import ChatService from "@/modules/chat/services/ChatService";

export const ChatStore = defineStore("chat", {
  state: () => ({
    conversationId: null as number | null,
    messages: [] as { sender: "user" | "bot"; text: string }[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async createConversation(message: string) {
      try {
        const response = await ChatService.createConversation(message);
        if (response && response.data.id) {
          this.conversationId = response.data.id;
        }
      } catch (error) {
        this.error = "Failed to create conversation.";
      }
    },

    async sendMessage(message: string) {
      this.messages.push({ sender: "user", text: message });
      this.loading = true;
      try {

        if (!this.conversationId) {
          await this.createConversation(message);
        }

        const response = await ChatService.sendMessage(this.conversationId, message);
        this.messages.push({ sender: "bot", text: response.message });
      } catch (error) {
        this.error = "Failed to get response.";
      } finally {
        this.loading = false;
      }
    },
  },
});
