<!--水表运行情况-->
<template>
    <div id="lbView">
        <el-row style="text-align: center;">
            <el-col :span="24">
                <div style="margin-bottom: 0; font-size: 2.5rem;" class="top">
                    <img style="width: 50px; height: 50px; vertical-align: -4px; margin-right: 5px; " :src="icon"/>
                    <span>{{title}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row style="text-align: center;">
            <div style="margin-top: -10px;" id="meter" ref="meter"></div>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: 'Meter',
        props: {
            title: {
                type: String,
                required: true,
                default: "栏目标题"
            },
            icon: {
                type: String,
                required: true,
                default: "../../dist/favicon.ico"
            },
        },
        methods: {
            initCharts3() {
                var dom = this.$refs.meter;
                var myChart = this.echarts.init(dom);
                var that = this
                var echartData = [{
                    name: '掉线',
                    value: that.$store.state.data.meterInf.offline
                },
                    {
                        name: '在线',
                        value: that.$store.state.data.meterInf.online
                    }
                ];
                let title = '水表总数';
                let formatNumber = function (num) {
                    let reg = /(?=(\B)(\d{3})+$)/g;
                    return num.toString().replace(reg, ',');
                };
                let total = echartData.reduce((a, b) => {
                    return a + b.value * 1;
                }, 0);
                var option = {
                    title: {
                        text: '{val|' + formatNumber(total) + '}\n{name|' + title + '}',
                        top: 'center',
                        left: 'center',
                        textStyle: {
                            rich: {
                                name: {
                                    fontSize: 35,
                                    fontWeight: 'normal',
                                    color: '#FFFFFF',
                                    padding: [0, 0],
                                    top: '10'
                                },
                                val: {
                                    fontFamily: 'Agency FB',
                                    padding: [15, 0],
                                    fontSize: 40,
                                    fontWeight: '1000',
                                    color: '#FFFFFF'
                                }
                            }
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        right: 5,
                        bottom: '20',
                        itemGap: 10,
                        itemWidth: 50,
                        itemHeight: 20,
                        textStyle: {
                            color: '#9195a0',
                            fontSize: '20',
                            fontWeight: 1000
                        },
                        data: ['在线', '掉线']
                    },
                    series: [{
                        name: '访问来源',
                        color: ['#3268f2', '#46fdc9'],
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: params => {
                                    return '{b| ' + params.name + '}' + '{c|' + params.value + '}';
                                },
                                borderWidth: 0,
                                borderRadius: 4,
                                padding: [0, -38],
                                height: 60,
                                rich: {
                                    b: {
                                        fontSize: 25,
                                        lineHeight: 30
                                    },
                                    c: {
                                        fontFamily: '方正粗黑宋简体',
                                        fontSize: 25,
                                        lineHeight: 30
                                    }
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                normal: {
                                    formatter: params => {
                                        console.log(params)
                                        return '{b| ' + params.name + '}  ' + '{c|' + params.value + '}';
                                    },
                                    borderWidth: 0,
                                    borderRadius: 4,
                                    padding: [0, 30],
                                    height: 30,
                                    fontSize: 30,
                                    align: 'center',
                                    color: '#3494BD',
                                    rich: {
                                        b: {
                                            fontSize: 20,
                                            lineHeight: 20,
                                            padding: [0, 0, 1, 0]
                                        },
                                        c: {
                                            fontSize: 20,
                                            lineHeight: 20
                                        }
                                    }
                                }
                            }
                        },
                        labelLine: {
                            length: 50,
                            length2: 50,
                            lineStyle: {
                                type: 'solid',
                                width: '4',
                            },
                            show: true,
                            color: '#00ffff'
                        },
                        data: echartData
                    }]
                };
                myChart.setOption(option);


                window.addEventListener('resize', function () {
                    myChart.resize();
                });
            }
        },
        mounted() {
            if (!this.$store.state.init.meterInf) {
                this.initCharts3();
            }
        }
    };
</script>

<style scoped="scoped">
    #lbView {
        width: 100%;
        height: 100%;
    }

    #meter {
        width: 31.25rem;
        height: 31.25rem;
        display: inline-block;
        margin-right: 30px;
    }
</style>
