import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*same as ./router/index.js */
import store from "./store";
import '@/styles/index.css'

createApp(App).use(store).use(router).mount("#app");
