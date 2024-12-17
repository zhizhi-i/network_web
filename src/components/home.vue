<template>

    <body class="bg-white" data-bg-color="bg-white">
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
                                <li class="active opens"><a>首页</a></li>
                                <li class="opens"><a @click="goToIDCBaseinfo">IDC基础信息 </a></li>
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
            <div class="king-layout1-main clearfix">
                <!-- sidebar start -->
                <div class="king-layout1-sidebar" style="width:216px;"></div>
                <!-- sidebar end -->
                <!-- content start -->
                <div class="king-content-wrap">
                    <div class="king-layout1-content">
                        <div class="container-fluid m20 ">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="height: 300px; position: relative;" id="chart_1733795950540"
                                        class="king-chart-box chart-bar  k-chart" data-role="chart"></div>
                                </div>
                            </div>
                        </div>
                        <div>机柜投产总量</div>
                        <div class="container-fluid m20 ">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; background-color: rgba(0, 0, 0, 0); cursor: default;"
                                        id="chart_1733795955393" class="king-chart-box chart-area m0"
                                        _echarts_instance_="1733792394495"></div>
                                </div>
                            </div>
                        </div>
                        <div>机柜投产趋势</div>
                        <div class="container-fluid m20 ">
                            <div class="row">
                                <div class="col-md-6">
                                    <div style="height: 300px; position: relative;" id="chart_1733796033555"
                                        class="king-chart-box chart-pie  k-chart" data-role="chart"></div>
                                </div>
                                <div class="col-md-6">
                                    <div style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; background-color: rgba(0, 0, 0, 0); cursor: default;"
                                        id="chart_1733796035525" class="king-chart-box chart-pie "
                                        _echarts_instance_="1733792394497"></div>
                                </div>
                            </div>
                        </div>
                        <div>机柜占比</div>
                    </div>
                </div>
                <!-- content end -->
            </div>
        </div>

    </body>

</template>


<script>

import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        const goToIDCBaseinfo = () => {
            router.push('/idc_baseinfo');
        };

        return {
            goToIDCBaseinfo
        };
    }
};
</script>