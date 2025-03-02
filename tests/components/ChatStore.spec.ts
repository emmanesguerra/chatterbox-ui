import { setActivePinia, createPinia } from "pinia";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import { vi } from "vitest";

// Mock ChatService
const mockChatService = {
  fetchMessages: vi.fn().mockResolvedValue({
    data: [
      { id: 1, conversation_id: 1, content: "Hello", created_at: "2024-03-01" },
    ],
  }),
  sendMessage: vi.fn().mockResolvedValue({
    data: { id: 2, conversation_id: 1, content: "Hi!", created_at: "2024-03-02" },
  }),
};

const mockConversationService = {
    fetchConversations: vi.fn().mockResolvedValue({
      data: [
        { id: 1, title: "Chat 1", created_at: "2024-03-01" },
        { id: 2, title: "Chat 2", created_at: "2024-03-02" },
      ],
    }),
    createConversation: vi.fn().mockResolvedValue({
      data: { id: 3, title: "New Chat", created_at: "2024-03-03" },
    }),
  };

describe("Chat Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Reset Pinia before each test
  });

//   it("fetches messages successfully", async () => {
//     const useChatStore = ChatStore();
//     await useChatStore.loadMessages(1, mockChatService);
    
//     expect(useChatStore.messages).toHaveLength(1);
//     expect(useChatStore.messages[0].content).toBe("Hello");
//   });

  it("sends a message successfully", async () => {
    const useChatStore = ChatStore();
    await useChatStore.sendMessage("Hi!", mockChatService);

    expect(useChatStore.messages).toHaveLength(1);
    expect(useChatStore.messages[0].text).toBe("Hi!");
  });

//   it("handles errors when fetching messages fails", async () => {
//     mockChatService.fetchMessages.mockRejectedValueOnce(new Error("Fetch Error"));

//     const useChatStore = ChatStore();
//     await useChatStore.fetchMessages(1, mockChatService);

//     expect(useChatStore.error).toBe("Fetch Error");
//   });

  it("handles errors when sending a message fails", async () => {
    mockChatService.sendMessage.mockRejectedValueOnce(new Error("Send Error"));

    const useChatStore = ChatStore();
    useChatStore.conversationId = 123;
      
    await useChatStore.sendMessage("Hello!", mockChatService);

    expect(useChatStore.error).toBe("Send Error");
  });
    
  it("resets chat correctly", () => {
    const useChatStore = ChatStore();

    // Set initial state
    useChatStore.conversationId = 5;
    useChatStore.messages = [
      { sender: "user", text: "Test message" },
      { sender: "bot", text: "Bot response" },
    ];
    useChatStore.error = "Some error";
    useChatStore.loading = true;

    // Call reset function
    useChatStore.resetChat();

    // Expectations
    expect(useChatStore.conversationId).toBeNull();
    expect(useChatStore.messages).toHaveLength(0);
    expect(useChatStore.error).toBeNull();
    expect(useChatStore.loading).toBeFalsy();
  });
});
