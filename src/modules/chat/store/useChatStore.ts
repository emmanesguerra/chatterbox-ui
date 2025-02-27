import { defineStore } from "pinia";
import ChatService from "@/modules/chat/services/ChatService";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as { sender: "user" | "bot"; text: string }[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async sendMessage(message: string) {
      this.messages.push({ sender: "user", text: message });
      this.loading = true;
      try {
        const response = await ChatService.sendMessage(message);
        this.messages.push({ sender: "bot", text: response.message });
      } catch (error) {
        this.error = "Failed to get response.";
      } finally {
        this.loading = false;
      }
    },
  },
});
