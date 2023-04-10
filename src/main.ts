import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import anti from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'



const app = createApp(App)

app.use(router)
app.use(anti)
app.mount('#app')

router.push("/about")
