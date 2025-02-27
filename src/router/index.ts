import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '@/modules/chat/pages/ChatView.vue';

const routes = [
  { path: '/', component: ChatView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
