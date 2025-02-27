import { setActivePinia, createPinia } from "pinia";
import { ChatStore } from "@/modules/chat/store/ChatStore";
import ChatService from "@/modules/chat/services/ChatService";
import { vi } from "vitest";

vi.mock("@/modules/chat/services/ChatService", () => ({
  default: { sendMessage: vi.fn() },
}));

describe("Chat Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
    
  it("has the correct initial state", () => {
    const useChatStore = ChatStore();
    expect(useChatStore.messages).toEqual([]);
    expect(useChatStore.loading).toBe(false);
    expect(useChatStore.error).toBeNull();
  });

  it("adds a user message", () => {
    const useChatStore = ChatStore();
    useChatStore.sendMessage("Hello");

    expect(useChatStore.messages).toHaveLength(1);
    expect(useChatStore.messages[0]).toEqual({ sender: "user", text: "Hello" });
  });

  it("adds a bot response when API call is successful", async () => {
    const useChatStore = ChatStore();
    (ChatService.sendMessage as vi.Mock).mockResolvedValue({ message: "Hi there!" });
    await useChatStore.sendMessage("Hello");

    expect(useChatStore.messages).toHaveLength(2);
    expect(useChatStore.messages[0]).toEqual({ sender: "user", text: "Hello" });
    expect(useChatStore.messages[1]).toEqual({ sender: "bot", text: "Hi there!" });
  });

  it("sets an error message when API call fails", async () => {
    const useChatStore = ChatStore();
    (ChatService.sendMessage as vi.Mock).mockRejectedValue(new Error("API Error"));
      
    await useChatStore.sendMessage("Hello");
    expect(useChatStore.error).toBe("Failed to get response.");
  });

  it("toggles loading state correctly", async () => {
    const useChatStore = ChatStore();
    (ChatService.sendMessage as vi.Mock).mockResolvedValue({ message: "Hi there!" });
    const sendMessagePromise = useChatStore.sendMessage("Hello");

    expect(useChatStore.loading).toBe(true);
    await sendMessagePromise;
    expect(useChatStore.loading).toBe(false);
  });
});
