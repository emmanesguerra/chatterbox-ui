import ApiService from "@/core/services/ApiService";

const ChatService = {
    async sendMessage(conversationId: number, message: string) {
        const payload = { conversation_id: conversationId, message: message };
        const response = await ApiService.post("/send-message", payload);
        return response.data;
    },

    async fetchMessages(conversationId: number) {
        return await ApiService.get(`/conversations/${conversationId}/messages`);
    },
};

export default ChatService;
