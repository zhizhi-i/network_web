<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="king-page-box">
                    <div class="king-layout1-header">
                        <nav class="">
                            <div style="overflow:hidden; z-index: inherit;" class="navbar king-horizontal-nav1  f14">
                                <div class="navbar-container">
                                    <div class="navbar-header pull-left">
                                        <a class="navbar-brand" href="javascript:;">
                                            <img src="https://magicbox.bk.tencent.com/static_api/v3/bk/images/logo.png"
                                                class="logo"> </a>
                                    </div>
                                    <ul class="nav navbar-nav pull-left m0">
                                        <li class=" opens"><a @click="goToHome">首页</a></li>
                                        <li class="active opens"><a>IDC基础信息 </a></li>
                                        <li class="opens"><a>IDC网络交付</a></li>
                                        <li><a>IDC运维执行</a></li>
                                        <li><a>商务</a></li>
                                    </ul>
                                    <div class="navbar-header pull-right">
                                        <ul class="nav">
                                            <li class="user-info">
                                                <a>
                                                    <img class="img-rounded"
                                                        src="https://magicbox.bk.tencent.com/static_api/v3/components/horizontal_nav1/images/avatar.png">
                                                    <span>admin</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="260px">
                    <AsideApp />
                </el-aside>
                <el-main>
                    <DataFrom />
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>


<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'

import AsideApp from './AsideApp.vue'
import DataFrom from './DataForm.vue'


const router = useRouter();

const goToHome = () => {
    router.push('/home').then(() => {
        window.location.reload();
    })
}


</script>
<style scoped>
.el-header {
    padding: 0;
}

.el-aside {
    height: 100vh;
}

.common-layout {

    height: 100vh;
}
</style>