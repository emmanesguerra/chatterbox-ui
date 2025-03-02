import { defineStore } from "pinia";

export const ChatStore = defineStore("chat", {
  state: () => ({
    conversationId: null as number | null,
    messages: [] as { sender: "user" | "bot"; text: string }[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async sendMessage(
      message: string, 
      chatService: { sendMessage: (id: number, msg: string) => Promise<any> }
    ) {
      this.messages.push({ sender: "user", text: message });
      this.loading = true;
      this.error = null;

      try {
        if (!this.conversationId) {
          throw new Error("Conversation ID is missing.");
        }

        const response = await chatService.sendMessage(this.conversationId, message);
        if (response?.message) {
          this.messages.push({ sender: "bot", text: response.message });
        } else {
          throw new Error("Invalid response from ChatService.");
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : "An unexpected error occurred.";
      } finally {
        this.loading = false;
      }
    },

    async loadMessages(
      conversationId: number, 
      chatService: { fetchMessages: (id: number) => Promise<any> }
    ) {
      this.loading = true;
      this.error = null;

      try {
        const response = await chatService.fetchMessages(conversationId);
        if (response?.data) {
          this.messages = response.data;
        } else {
          throw new Error("Failed to load messages.");
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : "An unexpected error occurred.";
      } finally {
        this.loading = false;
      }
    },

    resetChat() {
      this.conversationId = null;
      this.messages = [];
      this.error = null;
      this.loading = false;
    }
  },
});
