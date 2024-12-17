
        // 创建图表
        function createKendoBarChart(conf) {
            $(conf.selector).kendoChart({
                legend: {
                    position: "bottom"
                },
                theme: 'bootstrap',
                categoryAxis: {
                    majorGridLines: {
                        visible: false
                    },
                    categories: conf.data.categories
                },
                seriesDefaults: {
                    type: "column"
                },
                series: conf.data.series,
                valueAxis: {
                    max: 200,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: false
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name # #= value #"
                }
            });
            $(window).resize(function () {
                $(conf.selector).data("kendoChart").refresh();
            });
        }

        function initKendoBarChart(conf) {
            // 异步请求后台数据
            $.ajax({
                url: conf.url,
                type: 'GET',
                dataType: conf.dataType,
                success: function (res) {
                    //获取数据成功
                    if (res.result) {
                        var data = {
                            series: res.data.series,
                            categories: res.data.categories
                        };
                        createKendoBarChart({
                            selector: conf.container, // 图表窗器
                            data: data // 图表数据
                        });
                    }
                }
            });
        }
        $(function () {
            initKendoBarChart({
                url: 'https://magicbox.bk.tencent.com/static_api/v3/components/charts_bar/demo.json',
                dataType: 'json',
                container: '#chart_1733795950540'
            });
        });
        function createEStandLineChart(conf) {
            var myChart = echarts.init(document.getElementById(conf.selector));
            var legendData = []
            for (var i = 0; i < conf.data.series.length; i++) {
                legendData.push(conf.data.series[i].name)
            }
            myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    y: 'bottom',
                    data: legendData
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['bar', 'line'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: conf.data.xAxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitArea: { show: true }
                    }
                ],
                series: conf.data.series
            });
        }
        function initEStandLineChart(conf) {
            $.ajax({
                url: conf.url,
                type: 'GET',
                dataType: conf.dataType,
                success: function (res) {
                    //获取数据成功
                    if (res.result) {
                        createEStandLineChart({
                            selector: conf.containerId, // 图表容器
                            data: res.data, // 图表数据
                        });
                    }
                }
            })
        }
        $(function () {
            initEStandLineChart({
                url: 'https://magicbox.bk.tencent.com/static_api/v3/components/chart3/demo.json',
                dataType: 'json',
                containerId: 'chart_1733795955393'
            });
        });
        // 创建图表
        function createKendoPieChart(conf) {
            $(conf.selector).kendoChart({
                title: {
                    text: conf.data.title
                },
                legend: {
                    position: "bottom"
                },
                theme: 'bootstrap',
                seriesDefaults: {
                    labels: {
                        template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        position: "outsideEnd",
                        visible: true,
                        background: "transparent"
                    }
                },
                series: [{
                    type: 'pie',
                    data: conf.data.series
                }],
                tooltip: {
                    visible: true,
                    template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                }
            });
            $(window).resize(function () {
                $(conf.selector).data("kendoChart").refresh();
            });
        }

        function initKendoPieChart(conf) {
            // 异步请求后台数据
            $.ajax({
                url: conf.url,
                type: 'GET',
                dataType: conf.dataType,
                success: function (res) {
                    //获取数据成功
                    if (res.result) {
                        var data = {
                            series: res.data.series
                        };
                        createKendoPieChart({
                            selector: conf.container, // 图表容器
                            data: data // 图表数据
                        });
                    }
                }
            });
        }


        $(function () {
            initKendoPieChart({
                url: 'https://magicbox.bk.tencent.com/static_api/v3/components/charts_pie/demo.json',
                dataType: 'json',
                container: '#chart_1733796033555'
            });
        });
        // 创建图表
        function createEPieChart(conf) {
            var myChart = echarts.init(document.getElementById(conf.selector));
            var aLegend = [];
            var series = conf.data.series;
            for (var i = 0; i < series.length; i++) {
                aLegend[i] = series[i].name;
            };
            // 填入数据
            myChart.setOption({
                title: {
                    text: conf.data.title,
                    subtext: '',
                    x: 'center'
                },
                legend: {
                    y: 'bottom',
                    data: aLegend
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} {b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                series: [{
                    // 根据名字对应到相应的系列
                    name: '访问来源',
                    type: 'pie',
                    data: series
                }]
            });
        }

        function initEPieChart(conf) {
            $.ajax({
                url: conf.url,
                type: 'GET',
                dataType: conf.dataType,
                success: function (res) {
                    //获取数据成功
                    if (res.result) {
                        var data = res.data;
                        createEPieChart({
                            selector: conf.containerId, // 图表容器
                            data: data, // 图表数据
                        });
                    }
                }
            });
        }
        $(function () {
            initEPieChart({
                url: 'https://magicbox.bk.tencent.com/static_api/v3/components/chart4/demo.json',
                dataType: 'json',
                containerId: 'chart_1733796035525'
            });
        });