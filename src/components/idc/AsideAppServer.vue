<template> 
    <el-row class="tac">
        <el-col>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="border-right: none;">
                <el-menu-item class="centered-text" index="1">
                    <span @click="goToIDCBaseinfo">{{ isOpenApp.a ? isOpenApp.a :'IDC网络设备'}}</span>
                </el-menu-item>
                <el-menu-item class="centered-text" index="2">

                    <span @click="goToServerInfo">{{ isOpenApp.b ? isOpenApp.b : '服务器信息' }}</span>
                </el-menu-item>
                <el-menu-item class="centered-text" index="3">

                    <span @click="goToNetworkDedicatedLineInfo">{{ isOpenApp.c ? isOpenApp.c : '专线信息' }}</span>
                </el-menu-item>
                <el-menu-item class="centered-text" index="4">

                    <span @click="goToIDC">{{ isOpenApp.d ? isOpenApp.d : 'IDC机房信息' }}</span>
                </el-menu-item>
                <el-menu-item class="centered-text" index="5">

                    <span @click="goToCabinet">{{ isOpenApp.e ? isOpenApp.e : 'IDC机柜信息' }}</span>
                </el-menu-item>
                <el-menu-item class="centered-text" index="6"></el-menu-item>

            </el-menu>
        </el-col>

    </el-row>
</template>


<script setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// 使用 useRouter 和 useRoute 钩子
const router = useRouter();
const route = useRoute(); // 获取当前路由对象

// const index = ref('1');
const isOpenApp = reactive({
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
});

const goToIDCBaseinfo = () => {
    router.push('/idc_baseinfo')
}
const goToServerInfo = () => {
    router.push('/idc_baseinfo/server_info')
}
const goToNetworkDedicatedLineInfo = () => {
    router.push('/idc_baseinfo/network_dedicated_line_info')
}
const goToIDC = () => {
    router.push('/idc_baseinfo/idc')
}
const goToCabinet = () => {
    router.push('/idc_baseinfo/cabinet')
}


</script>

<style>
/* 可以根据需要添加样式 */
.el-row {
    height: 100vh;
}

.el-menu {
    height: 100%;
}

.centered-text {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
