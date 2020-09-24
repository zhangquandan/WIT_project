<!--漏损指数排行榜-->
<template>
    <div>
        <el-row style="text-align: center;">
            <el-col :span="24">
                <div class="top top2">
                    <img style="width: 50px; height: 50px; vertical-align: -4px; margin-right: 5px;" :src="icon"/>
                    <span>{{title}}</span>
                </div>
            </el-col>
        </el-row>
        <div id="comp" :style="{'marginLeft':canvesLeft,'width':canvesWidth}" ref="chart"></div>
    </div>
</template>

<script>
    export default {
        name: 'Comp',
        props: {
            icon: {
                type: String,
                required: true,
                default: "../../dist/favicon.ico"
            },
            title: {
                type: String,
                required: true,
                default: "栏目标题"
            },

            label: {
                type: Array
            },

            type: {
                type: String,
            },

            Cstyle: {
                type: String,
                default: "28%"
            },

            val: {
                type: Object
            },

            canvesWidth: {
                type: String,
                default: "90%"
            },

            canvesLeft: {
                type: String,
                default: "5%"
            },

            right: {
                type: String,
                default: "20%"
            },

            fontSize: {
                type: [String, Number],
                default: 25
            }
        },
        data() {
            return {
                dom: ""
            }
        },
        methods: {

            setData: function () {
                this.initCharts()
            },

            initCharts() {
                var dom = this.$refs.chart
                var myChart = this.echarts.init(dom)
                this.$data.dom = myChart
                var that = this
                var option = {
                    grid: {
                        top: '10%',
                        left: that.Cstyle,
                        bottom: '10%',
                        right: that.right,
                        containLabel: false
                    },
                    // 不显示x轴的相关信息
                    xAxis: {
                        show: false,

                    },
                    yAxis: [{
                        type: 'category',
                        inverse: true,
                        data: that.val.name,
                        // 不显示y轴的线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0068b7',
                                width: 3
                            },
                            symbolSize: [10, 15]
                        },
                        boundaryGap: false,
                        nameGap: 15,
                        offset: 20,
                        // 不显示刻度
                        axisTick: {
                            show: false
                        },
                        // 把刻度标签里面的文字颜色设置为白色
                        axisLabel: {
                            color: '#5ecef4',
                            //interval:0,
                            //margin:100,
                            textStyle: {
                                fontSize: that.fontSize, //字体大小
                                //align:'left',
                                //baseline:'middle'
                            },

                        },
                    },
                        {
                            data: that.val.textData,
                            inverse: true,
                            // 不显示y轴的线
                            axisLine: {
                                show: false
                            },
                            boundaryGap: false,
                            // 不显示刻度
                            axisTick: {
                                show: false
                            },
                            // 把刻度标签里面的文字颜色设置为白色
                            axisLabel: {
                                color: '#fff',
                                textStyle: {
                                    fontSize: 25, //字体大小
                                    //align:'left',
                                    //baseline:'middle'
                                },
                            },
                        }
                    ],
                    series: [{
                        name: '空格',
                        type: 'bar',
                        stack: 'a',
                        //barCategoryGap: '50%',
                        barWidth: 25,
                        zlevel: 5,
                        yAxisIndex: 0,
                        data: that.val.margin,
                        itemStyle: {
                            color: 'none'
                        }
                    },
                        {
                            name: '空格',
                            type: 'bar',
                            stack: 'b',
                            //barCategoryGap: '50%',
                            barWidth: 25,
                            zlevel: 5,
                            yAxisIndex: 1,
                            data: that.val.margin,
                            itemStyle: {
                                color: 'none'
                            }
                        },
                        {
                            name: '条',
                            type: 'bar',
                            data: that.val.lineData,
                            stack: 'a',
                            yAxisIndex: 0,
                            zlevel: 2,
                            // 修改第一组柱子的圆角
                            itemStyle: {
                                barBorderRadius: 20,
                                // 此时的color 可以修改柱子的颜色
                                color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#366ef3' // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: '#5de4f1' // 100% 处的颜色
                                        }
                                    ],
                                    global: false // 缺省为 false
                                }
                            },
                            // 柱子之间的距离
                            barCategoryGap: '50%',
                            barWidth: 8
                            // 显示柱子内的文字
                        },
                        {
                            name: '框',
                            type: 'bar',
                            barCategoryGap: '50%',
                            barWidth: 8,
                            stack: 'b',
                            yAxisIndex: 1,
                            zlevel: 0,
                            data: that.val.max,
                            itemStyle: {
                                color: '#003567',
                                barBorderRadius: 15
                            }
                        }, {
                            name: '外圆',
                            type: 'scatter',
                            hoverAnimation: false,
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            yAxisIndex: 0,
                            symbolSize: 28,
                            itemStyle: {
                                normal: {
                                    color: '#01b7ec',
                                    opacity: 1
                                }
                            },
                            z: 2
                        }, {
                            name: '外圆',
                            type: 'scatter',
                            hoverAnimation: false,
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            yAxisIndex: 0,
                            symbolSize: 24,
                            itemStyle: {
                                normal: {
                                    color: '#0264ae',
                                    opacity: 1
                                }
                            },
                            z: 3
                        }
                    ]
                }
                // 3. 把配置项给实例对象
                myChart.setOption(option)
                window.addEventListener('resize', function () {
                    myChart.resize()
                })
            }
        },
        mounted() {
            var that = this
            var init = that.$store.state.init
            switch (that.type) {
                case "dma":
                    if (!init.dmaltView) {
                        that.initCharts()
                    }
                    break
                case "build":
                    if (!init.buildLtView) {
                        that.initCharts()
                    }
                    break
                case "shuibiao":
                    if (!init.meterlbView) {
                        that.initCharts()
                    }
                    break
            }

        }
    }
</script>

<style>
    #comp {
        width: 90%;
        height: 600px;
        margin-left: 5%;
        text-align: center;
    }

    .top2 {
        margin-bottom: 0;
        margin-top: 10px;
        font-size: 2.5rem;
    }
</style>
