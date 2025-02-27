import ApiService from "@/core/services/ApiService";

const ChatService = {
  async sendMessage(message: string) {
    const response = await ApiService.post("/chat", { message });
    return response.data;
  },
};

export default ChatService;
