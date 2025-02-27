import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import ChatView from '@/modules/chat/pages/ChatView.vue';

describe('ChatView.vue', () => {
  it('renders correctly', () => {
    const pinia = createPinia(); // Create a fresh Pinia instance
    const wrapper = mount(ChatView, {
      global: {
        plugins: [pinia], // Inject Pinia into Vue test instance
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
