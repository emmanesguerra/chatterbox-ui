import ApiService from "@/core/services/ApiService";

const ConversationService = {
    async createConversation(message: string) {
        return await ApiService.post("/conversations-create", { message });
    },

    async fetchConversations() {
        return await ApiService.get("/conversations");
    },

    async deleteConversation(id: number) {
        return await ApiService.delete(`/conversations/${id}`);
    }
};

export default ConversationService;
