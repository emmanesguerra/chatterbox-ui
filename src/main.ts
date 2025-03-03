import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import '@/assets/styles/global.scss';
import "remixicon/fonts/remixicon.css";
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@/assets/styles/toast.scss';


const app = createApp(App);
const pinia = createPinia();

app.use(Toast);
app.use(pinia);
app.use(router);
app.mount("#app");
