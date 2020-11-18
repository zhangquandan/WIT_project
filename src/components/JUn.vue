<!--漏损导图-->
<template>
    <div id="UNs">
        <div class="chat_content">
            <div :style="{backgroundImage: 'url(' + (isSc ? '' : bgurl) + ')' , paddingTop : top+'px'}" class="bg"
                 ref="tt">
                <!-- <div style="position: absolute;right: 0px;bottom: 60px;  color: #F0F8FF; cursor: pointer;">
                    <img style="width: 20px;height: 20px;" src="../static/images/qp.png" @click="screen"></img>
                </div> -->
                <!-- <div ref="jun1" :style="{backgroundPosition: (isSc ? 'center 70px , 38px -0px,center' : 'center 35px, 38px -0px,center')}"
                 class="jun">
                    <div class="c2" :style="{marginLeft: (isSc ? '15px' : '25px'),marginTop: (isSc ? '80px' : '35px')}" ref="chart2"></div>
                </div>
                <div ref="jun2" :style="{backgroundPosition: (isSc ? 'center 70px, 38px -0px,center' : 'center 44px, 38px -0px,center')}"
                 class="jun2">
                    <div class="c3" :style="{marginLeft: (isSc ? '110px' : '20px'),marginTop: (isSc ? '75px' : '40px')}" ref="chart3"></div>
                </div> -->
                <div :style="{'left':(isSc ? '504px' : '288px'),'bottom':(isSc ? lengthBottom : '168px')}" id="title">
                    <div v-for="item in $store.state.data.skData" class="i">{{item}}</div>
                </div>
                <div :style="{'left':(isSc ? mainLeft : '12px'),'top':(isSc ? mianTop : '30px')}" id="legend3"
                     ref="chart4">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import data from '../static/mock/wuchang_building.json';
    import data2 from '../static/mock/liufang_building.json';

    export default {
        name: 'JUn',
        data() {
            return {
                isSc: false,
                fullscreen: false,
                scale: {
                    chart1: 0.8,
                    chart2: 0.6,
                },
                bgurl: "/img/starry.64a631ca.png",
                top: 0,
                canLeft: "1160px",
                visLeft: 50,
                visBottom: 25,
                canTop: 50,
                canTop1: '50px',
                lengthBottom: "155px",
                mianTop: "140px",
                mainLeft: "275px",
                left: "240",
                lengthLeft: '504px'
            }
        },

        methods: {

            setData: function () {
                var that = this
                var dom3 = this.$refs.chart4;
                var myChart = this.echarts.init(dom3);
                myChart.setOption({
                    series: [{
                        data: that.tranData(that.$store.state.data.buildMapData)
                    }, {
                        data: that.tranData(that.$store.state.data.buildMapData2)
                    }]
                })
                this.initCharts()
            },

            //数据格式化
            tranData: function (arr) {
                var data = []
                for (var item of arr) {
                    try {
                        var val = []
                        //console.log(arr)
                        val.push(item.addMin.toFixed(1))
                        val.push(parseFloat(item.addRangeMin.split("%")[0]).toFixed(1) + "%")
                        val.push(parseFloat(item.addRangeTotal.split("%")[0]).toFixed(1) + "%")
                        val.push(item.addTotal.toFixed(1))
                        val.push(item.min.toFixed(1))
                        val.push(item.total.toFixed(1))
                        val.push(item.leakageIndex.toFixed(1))
                        data.push({
                            name: item.name,
                            value: val,
                            itemStyle: item.itemStyle
                        })
                    } catch {
                        //console.log(item)
                    }
                }
                return data
            },

            initCharts() {
                // var dom = this.$refs.chart2;
                // var dom2 = this.$refs.chart3;
                var dom3 = this.$refs.chart4;
                var arr = this.$store.state.data.skData
                // var myChart = this.echarts.init(dom);
                // var myChart2 = this.echarts.init(dom2);
                var myChart3 = this.echarts.init(dom3);
                var that = this;
                var arr = this.$store.state.data.skData
                var uploadedDataURL = './static/mock/wuchang_dma.json';
                var uploadedDataURL2 = './static/mock/liufang_dma.json';
                var colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
                    '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000']

                function showProvince() {
                    var name1 = 'wuchang';
                    var name = 'liufang';
                    that.echarts.registerMap(name, data2);
                    // myChart.showLoading();
                    // myChart.hideLoading();
                    that.echarts.registerMap(name1, data);
                    var option = {
                        title: {
                            text: '',

                            left: 'center',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        visualMap: {
                            bottom: that.$data.visBottom,
                            left: that.$data.visLeft,
                            right: 10,
                            show: true,
                            orient: 'horizontal',
                            itemGap: 2,
                            itemHeight: 16,
                            itemWidth: 110,
                            itemSymbol: 'rect',
                            borderWidth: 1,
                            showLabel: false,
                            align: "auto",
                            // target: {
                            // 	inRange: {
                            // 		symbolSize: [60, 200]
                            // 	}
                            // },
                            // controller: {
                            // 	inRange: {
                            // 		color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                            // 		symbolSize: [30, 100]
                            // 	}
                            // },
                            padding: [1, 1, 1, 1],
                            backgroundColor: "#FFFFFF",
                            textStyle: {
                                color: '#000',
                                fontSize: 7,
                                lineHeight: '12px',
                            },

                            pieces: [{
                                lte: arr[0],
                                color: colors[0]
                            },
                                {
                                    gt: arr[0],
                                    lte: arr[1],
                                    color: colors[1]
                                },
                                {
                                    gt: arr[1],
                                    lte: arr[2],
                                    color: colors[2]
                                },
                                {
                                    gt: arr[2],
                                    lte: arr[3],
                                    color: colors[3]
                                },
                                {
                                    gt: arr[3],
                                    lte: arr[4],
                                    color: colors[4]
                                },
                                {
                                    gt: arr[4],
                                    lte: arr[5],
                                    color: colors[5]
                                },
                                {
                                    gt: arr[5],
                                    lte: arr[6],
                                    color: colors[6]
                                },
                                {
                                    gt: arr[6],
                                    lte: arr[7],
                                    color: colors[7]
                                },
                                {
                                    gt: arr[7],
                                    lte: arr[8],
                                    color: colors[8]
                                },
                                {
                                    gt: arr[8],
                                    lte: arr[9],
                                    color: colors[9]
                                },
                                {
                                    gt: arr[9],
                                    lte: arr[10],
                                    color: colors[10]
                                },
                                {
                                    gt: arr[10],
                                    lte: arr[11],
                                    color: colors[11]
                                },
                                {
                                    gt: arr[11],
                                    lte: arr[12],
                                    color: colors[12]
                                },
                                {
                                    gt: arr[12],
                                    lte: arr[13],
                                    color: colors[13]
                                },
                                {
                                    gt: arr[13],
                                    lte: arr[14],
                                    color: colors[14]
                                },


                            ],
                            outOfRange: {
                                color: '#999'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0,0,250,0.2)',
                            formatter: function (params) {
                                if (params.data) {
                                    return (
                                        '<div class="tooltip">' +
                                        '<div style="text-align:center">' + params.name + '</div>' +
                                        '当日水量：' + params.data.value[5] + '</br>' +
                                        '日量隔周增量：' + params.data.value[3] + '</br>' +
                                        '日量隔周增幅：' + params.data.value[2] + '</br>' +
                                        '报警日最小流量：' + params.data.value[4] + '</br>' +
                                        '最小流量隔周增量：' + params.data.value[0] + '</br>' +
                                        '最小流量隔周增幅：' + params.data.value[1] + '</br>' +
                                        '综合漏损指数：' + params.data.value[6] + '</br>' +
                                        '</div>'
                                    )
                                } else {
                                    return (
                                        '<div class="tooltip">' +
                                        '<div style="text-align:center">' + params.name + '</div>' +
                                        '暂无数据' +
                                        '</div>'
                                    )
                                }

                            },
                        },
                        series: [{
                            type: 'map',
                            top: that.$data.canTop1,
                            left: that.$data.left,
                            zoom: that.$data.scale.chart1,
                            mapType: name1,
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 8,
                                        position: ['50%', '50%']
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 8
                                    }
                                },
                                position: 'inside'
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#0069ae',
                                    areaColor: '#00a0ea',
                                    shadowColor: 'rgba(100, 100, 100, 0.6)',
                                    shadowBlur: 10
                                },
                                emphasis: {
                                    areaColor: '#fd0211',
                                    borderWidth: 0
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.buildMapData)
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }, {
                            type: 'map',
                            top: that.$data.canTop,
                            left: that.$data.canLeft,
                            zoom: that.$data.scale.chart2,
                            mapType: name,
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 8
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 8
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#0069ae',
                                    areaColor: '#00a0ea',
                                    shadowColor: 'rgba(100, 100, 100, 0.6)',
                                    shadowBlur: 10
                                },
                                emphasis: {
                                    areaColor: '#f09b04',
                                    borderWidth: 0,
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.buildMapData2)
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }]
                    };
                    myChart3.setOption(option);
                }

                showProvince();
            },
        },
        mounted() {
            this.initCharts();
        }
    };
</script>

<style>

    #UNs {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
    }

    .chat_content {
        display: inline-block;
        margin-top: 70px;
    }

    .bg {
        /* background-image: url(../static/images/starry.png); */
        background-size: 100% 90%;
        background-position: 20px 20px;
        background-repeat: no-repeat;
    }

    .tooltip {
        background-image: url(../static/images/frame_3.png);
        background-size: 100% 100%;
        font-size: 1.8rem;
        text-align: left;
        padding: 20px;
        margin: 0;
        opacity: 0.8;
        line-height: 50px;

    }

    #title {
        position: absolute;
        height: 12px;
        bottom: 45px;
        font-size: 1.5rem;
        color: #FFFFFF;
        line-height: 25px;
        left: 60px;

    }

    .i {
        min-width: 107.5px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        margin-right: 5px;
        float: left;
    }

    #i {
        min-width: 32px;
        height: 12px;
        line-height: 12px;
        float: left;
    }

    .jun {
        width: 290px;
        height: 260px;
        display: inline-block;
        background-image: url(../static/images/wcbg.png), url(../assets/texiao.png), url(../static/images/frame.png);
        background-repeat: no-repeat;
        background-size: 70% 80%, 60%, 100% 100%;
        background-position: center 35px, 38px -0px, center;
        margin-right: 20px;
    }

    .jun2 {
        width: 290px;
        height: 260px;
        display: inline-block;
        background-image: url(../static/images/liufbg.png), url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-repeat: no-repeat;
        background-size: 80% 70%, 60%, 100% 100%;
        background-position: center 44px, 38px -0px, center;
    }

    .c3 {
        width: 240px;
        height: 180px;
        margin-top: 40px;
        margin-left: 20px;
    }

    .c2 {
        width: 270px;
        height: 230px;
        margin-top: 35px;
        margin-left: 25px;
    }

    #legend3 {
        width: 1800px;
        height: 900px;
        display: inline-block;
        background-image: url(../static/images/wcbg.png), url(../static/images/liufbg.png), url(../assets/texiao.png), url(../static/images/frame.png), url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-position: 110px 102px, 93% 152px, 0px -20px, left 0px, 91% -20px, right 0px;
        background-size: 32%, 37%, 40%, 45% 87%, 40%, 45% 87%;
        background-repeat: no-repeat;
    }
</style>
