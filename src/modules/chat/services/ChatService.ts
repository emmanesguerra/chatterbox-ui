import ApiService from "@/core/services/ApiService";

const ChatService = {
    async createConversation(title: string) {
        return await ApiService.post("/conversations-create", { title });
    },

    async sendMessage(conversationId: number, message: string) {
        const payload = { conversation_id: conversationId, message: message };
        const response = await ApiService.post("/chat", payload);
        return response.data;
    },
};

export default ChatService;
