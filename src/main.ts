import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
const scripts: string[] = [
    'https://magicbox.bk.tencent.com/static_api/v3/assets/js/jquery-1.10.2.min.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/echarts-2.0/echarts-all.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/bootstrap-3.3.4/js/bootstrap.min.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/kendoui-2015.2.624/js/kendo.all.min.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/echarts-2.0/echarts-all.js',
    'https://magicbox.bk.tencent.com/static_api/v3/bk/js/bk.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/js/html5shiv.min.js',
    'https://magicbox.bk.tencent.com/static_api/v3/assets/js/respond.min.js',
];


scripts.forEach((src) => {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
});


const app =createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
