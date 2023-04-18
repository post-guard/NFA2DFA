import { createApp } from 'vue'
import App from './App.vue'
import anti from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(anti)
app.mount('#app')
