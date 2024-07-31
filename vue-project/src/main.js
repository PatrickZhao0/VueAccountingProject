import './assets/reset.css'
import './assets/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './store'
import App from './App.vue' 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import SetCreation from './components/SetCreation.vue'
import PageTabs from './components/PageTabs.vue'
import PageFlipper from './components/PageFlipper.vue'

const app = createApp(App);
const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component);
}

app.component('PageFlipper', PageFlipper);
app.component('Menu', Menu);
app.component('Header', Header);
app.component('SetCreation', SetCreation);
app.component('PageTabs', PageTabs);
app.use(router);
app.use(store);
app.use(ElementPlus, {
    locale: zhCn
});
app.use(pinia);
app.mount('#app');
document.documentElement.style.fontSize = '1px';