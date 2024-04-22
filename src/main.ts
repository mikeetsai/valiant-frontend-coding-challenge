import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/styles/main.scss';
import '@/plugins';
import App from '@/App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
