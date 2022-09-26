import { store } from './store/index';
import { router } from './router/index';
import { createApp } from 'vue'
import App from './App'
import './main.less'

createApp(App).use(router).use(store).mount('#app')
