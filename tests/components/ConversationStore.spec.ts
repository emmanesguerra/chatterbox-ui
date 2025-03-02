import { setActivePinia, createPinia } from "pinia";
import { ConversationStore } from "@/modules/chat/store/ConversationStore";
import { vi } from "vitest";

// Mock ConversationService
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

describe("Conversation Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Create a new Pinia instance for each test
  });

  it("fetches conversations successfully", async () => {
    const useConversationStore = ConversationStore();
    await useConversationStore.fetchConversations(mockConversationService);

    expect(useConversationStore.conversations).toHaveLength(2);
    expect(useConversationStore.conversations[0].title).toBe("Chat 1");
  });

  it("creates a new conversation", async () => {
    const useConversationStore = ConversationStore();
    await useConversationStore.createConversation("Hello!", mockConversationService);

    expect(useConversationStore.conversations).toHaveLength(1);
    expect(useConversationStore.conversations[0].title).toBe("New Chat");
  });

  it("handles errors when fetching conversations fails", async () => {
    mockConversationService.fetchConversations.mockRejectedValueOnce(new Error("API Error"));
    
    const useConversationStore = ConversationStore();
    await useConversationStore.fetchConversations(mockConversationService);

    expect(useConversationStore.error).toBe("API Error");
  });

  it("handles errors when creating a conversation fails", async () => {
    mockConversationService.createConversation.mockRejectedValueOnce(new Error("Create Failed"));
    
    const useConversationStore = ConversationStore();
    await useConversationStore.createConversation("Hello!", mockConversationService);

    expect(useConversationStore.error).toBe("Create Failed");
  });
});
