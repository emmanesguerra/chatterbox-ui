import ApiService from "@/core/services/ApiService";

const ChatService = {
    async createConversation(message: string) {
        return await ApiService.post("/conversations-create", { message });
    },

    async sendMessage(conversationId: number, message: string) {
        const payload = { conversation_id: conversationId, message: message };
        const response = await ApiService.post("/send-message", payload);
        return response.data;
    },
};

export default ChatService;
