import { createRouter, createWebHashHistory, createMemoryHistory, createWebHistory} from 'vue-router'

import home from '../components/home.vue'
import idc_baseinfo from '../components/idc_baseinfo.vue'
import server_info from '../components/server/server_info.vue'
import network_dedicated_line_info from '../components/network_dedicated_line/server_info.vue'
import idc from '../components/idc/server_info.vue'
import cabinet from '../components/cabinet/server_info.vue'


const routes = [
    
    { path: '/',redirect: { name: 'b' }},
    { path: '/home', component: home, name: 'b' },
    { path: '/idc_baseinfo', component: idc_baseinfo, name: 'a' },
    { path: '/idc_baseinfo/server_info', component: server_info, name: 'c' },
    { path: '/idc_baseinfo/network_dedicated_line_info', component: network_dedicated_line_info, name: 'd' },
    { path: '/idc_baseinfo/idc', component: idc, name: 'e' },
    { path: '/idc_baseinfo/cabinet', component: cabinet, name: 'f' },
    
]


const router = createRouter({
    routes,
    history: createWebHistory(),
})


export default router