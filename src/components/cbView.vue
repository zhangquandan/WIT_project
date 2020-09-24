<!--定额折线图-->
<template>
    <div id="cbView" ref="cbView" style="width:96%;height:650px;margin-left: 2%;"></div>
</template>

<script>
    import echarts from "echarts"

    export default {
        name: 'cbView',

        props: {
            title: {
                type: Object,
                default: function () {
                    return {
                        nde: 100,
                        ylj: 100,
                        yyjs: 100,
                        yyjsl: 100
                    }
                }
            },
        },

        data() {
            return {}
        },

        methods: {
            init: function () {
                var dom = this.$refs.cbView
                var myChart = this.echarts.init(dom)
                var that = this
                myChart.setOption({
                    title: {
                        text: '本年定额：' + that.$store.state.data.zx.bnde + '吨     已累计：' + that.$store.state.data.zx.ylj + '吨     已用节水：' +
                            that.$store.state.data.zx.yyjs + '吨     已用节水率：' + that.$store.state.data.zx.yyjsl + '%',
                        x: 'center',
                        y: 'top',
                        padding: [0, 0, 0, 0],
                        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            color: '#fff',
                        },
                    },

                    grid: {
                        // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
                        left: "12%", // 默认10%，给24就挺合适的。
                        bottom: "16%",
                    },

                    tooltip: {
                        trigger: 'axis',
                        textStyle: {
                            fontSize: 30,
                        },
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        icon: "circle",
                        data: ['用水定额', '用水量', '节水量'],
                        textStyle: { //图例文字的样式
                            color: '#ccc',
                            fontSize: 30,
                        },
                        itemHeight: 40,
                        bottom: 0
                    },
                    xAxis: {
                        boundaryGap: false,
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                        offset: 20,
                        axisLine: {
                            lineStyle: {
                                color: '#5ecef4',
                                width: 4,
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },

                        axisLabel: {
                            show: true,
                            fontSize: 25, //字体大小
                        },
                    },

                    yAxis: {
                        name: '水量(吨)',
                        nameTextStyle: {
                            fontSize: 25,
                        },
                        nameGap: 30,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#364f71'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5ecef4',
                                width: 4,
                            },
                        },

                        axisLabel: {
                            margin: 30,
                            show: true,
                            fontSize: 25, //字体大小
                        },

                    },

                    series: [{
                        data: this.$store.state.data.zx.de,
                        name: "用水定额",
                        type: 'line',
                        showBackground: false,
                        symbol: "circle",
                        symbolSize: 20,

                    },
                        {
                            data: this.$store.state.data.zx.ysl,
                            name: "用水量",
                            type: 'line',
                            stack: '1',
                            showBackground: false,
                            symbol: "circle",
                            symbolSize: 20,
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: '#0099ff',
                                        },
                                            {
                                                offset: 0.4,
                                                color: '#0099ff',
                                            },
                                            {
                                                offset: 0.8,
                                                color: '#152242',
                                            },
                                            {
                                                offset: 1,
                                                color: '#152242'
                                            },
                                        ]
                                    ),
                                    opacity: 0.7,

                                }
                            },

                            itemStyle: {
                                normal: {
                                    color: "#0099ff",
                                    lineStyle: {
                                        color: "#0099ff"
                                    },
                                }
                            },

                        },
                        {
                            data: this.$store.state.data.zx.jsl,
                            name: "节水量",
                            type: 'line',
                            showBackground: false,
                            symbol: "circle",
                            symbolSize: 20,
                            stack: '2',
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: '#01dff4',
                                    },
                                        {
                                            offset: 0.6,
                                            color: '#152242',
                                        },
                                        {
                                            offset: 0.8,
                                            color: '#152242',
                                        },
                                        {
                                            offset: 1,
                                            color: '#152242'
                                        },
                                    ]
                                ),
                                opacity: 0.7,
                                origin: 'start',
                            },
                            itemStyle: {
                                normal: {
                                    color: "#01dff4",
                                    lineStyle: {
                                        color: "#01dff4"
                                    }
                                }
                            },
                        },
                    ]
                });
            }
        },

        mounted() {
            if (this.$store.state.data.zx.jsl.length > 0) {
                this.init()
            }
        }
    }
</script>

<style>
</style>
