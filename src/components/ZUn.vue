<template>
    <div id="UNs">
        <div class="chat_content">
            <div :style="{backgroundImage: 'url(' + (isSc ? '' : bgurl) + ')' , paddingTop : top+'px'}" class="bg"
                 ref="tt">
                <!-- <div style="position: absolute;right: 0px;bottom: 60px;  color: #F0F8FF; cursor: pointer;">
                    <img style="width: 20px;height: 20px;" src="../static/images/qp.png" @click="screen"></img>
                </div> -->
                <!-- <div :style="{backgroundPosition:(isSc ? 'center 80px, 38px -0px,center' : 'center 35px, 38px -0px,center')}" ref="jun1"
                 class="point1">
                    <div :style="{marginLeft:(isSc ? '100px' : '20px'),marginTop:(isSc ? '90px' : '35px')}" class="s2" ref="chart2"></div>
                </div>
                <div :style="{backgroundPosition:(isSc ? 'center 100px, 38px -0px,center' : 'center 44px, 38px -0px,center')}" ref="jun2"
                 class="point2">
                    <div :style="{marginLeft:(isSc ? '95px' : '20px'),marginTop:(isSc ? '120px' : '40px')}" class="s3" ref="chart3"></div>
                </div> -->
            </div>
            <div :style="{'left':(isSc ? '504px' : '288px'),'bottom':(isSc ? lengthBottom : '168px')}" id="title">
                <div v-for="item in $store.state.data.skData" class="i">{{item}}</div>
            </div>
            <div :style="{'left':(isSc ? '245px' : '12px'),'top':(isSc ? '70px' : '30px')}" id="legend2" ref="chart4">
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../static/mock/wuchang_xiaoqu.json';
    import data2 from '../static/mock/liufang_xiaoqu.json';

    export default {
        name: 'Un',
        data() {
            return {
                isSc: false,
                fullscreen: false,
                scale: 7,
                bgurl: "/img/starry.64a631ca.png",
                top: 0,
                cantop: 42,
                visLeft: 50,
                visBottom: 25,
                left: "95",
                lengthBottom: "155px",
                canLeft: "960px",
            }
        },
        methods: {

            tranData: function (arr) {
                try {
                    var data = []
                    var val = []
                    val.push(arr.addMin.toFixed(1))
                    val.push(parseFloat(arr.addRangeMin.split("%")[0]).toFixed(1) + "%")
                    val.push(parseFloat(arr.addRangeTotal.split("%")[0]).toFixed(1) + "%")
                    val.push(arr.addTotal.toFixed(1))
                    val.push(arr.min.toFixed(1))
                    val.push(arr.total.toFixed(1))
                    val.push(arr.leakageIndex.toFixed(1))
                    data.push({
                        name: arr.name,
                        value: val,
                        itemStyle: arr.itemStyle
                    })
                    return data
                } catch {
                }
            },

            initCharts() {
                var arr = this.$store.state.data.skData
                var dom3 = this.$refs.chart4;
                var myChart3 = this.echarts.init(dom3);
                var that = this;
                var uploadedDataURL = './static/mock/geoman.json';
                var uploadedDataURL2 = './static/mock/liufang_dma.json';

                function showProvince() {
                    var name1 = 'geoman';
                    var name = 'liufang';
                    var colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
                        '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000']
                    that.echarts.registerMap(name1, data);
                    that.echarts.registerMap(name, data2);
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
                            mapType: name1,
                            left: that.$data.left,
                            top: that.$data.cantop,
                            zoom: 0.8,
                            aspectScale: 0.85,
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
                                    borderColor: '#5bd1f9',
                                    borderWidth: '0.8',
                                    areaColor: '#ffffff',
                                    opacity: "0.6",
                                },
                                emphasis: {
                                    areaColor: '#a50026',
                                    borderWidth: 1,
                                    borderColor: '#5ecef4',
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.zhMapData.wc),
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }, {
                            type: 'map',
                            mapType: name,
                            left: that.$data.canLeft,
                            top: that.$data.cantop,
                            zoom: 0.72,
                            aspectScale: 0.87,
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
                                    borderColor: '#5bd1f9',
                                    borderWidth: '0.8',
                                    areaColor: 'none',
                                    opacity: "0.6",
                                },
                                emphasis: {
                                    areaColor: '#0628a6',
                                    borderWidth: 1,
                                    borderColor: '#5ecef4',
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.zhMapData.lf),
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }]
                    };
                    myChart3.setOption(option);
                };
                showProvince();
            },

            getColor: function (val) {
                var color
                var colors = ['#226e4b', '#34a471', '#9adfbf', '#bbead5', '#ddf4ea', '#ffcccc', '#fea78f', '#ff6600', '#ff0000',
                    '#cc0000', '#a40035', '#7d0022', '#000000'
                ]
                if (val <= -400) {
                    color = colors[0]
                } else if (val > -400 && val <= -200) {
                    color = colors[1]
                } else if (val > -200 && val <= -100) {
                    color = colors[2]
                } else if (val > -100 && val <= -50) {
                    color = colors[3]
                } else if (val > -50 && val <= 0) {
                    color = colors[4]
                } else if (val > 0 && val <= 50) {
                    color = colors[5]
                } else if (val > 50 && val <= 100) {
                    color = colors[6]
                } else if (val > 100 && val <= 200) {
                    color = colors[7]
                } else if (val > 200 && val <= 400) {
                    color = colors[8]
                } else if (val > 400 && val <= 800) {
                    color = colors[9]
                } else if (val > 800 && val <= 1600) {
                    color = colors[10]
                } else if (val > 1600 && val <= 3200) {
                    color = colors[11]
                } else {
                    color = colors[12]
                }
                return color
            },

            setData: function () {
                //console.log(this.$data.chart1.setOption)
                var that = this
                var dom3 = this.$refs.chart4;
                var myChart3 = this.echarts.init(dom3);
                myChart3.setOption({
                    series: [{
                        data: that.tranData(that.$store.state.data.zhMapData.wc),
                    }, {
                        data: that.tranData(that.$store.state.data.zhMapData.lf),
                    }]
                })
                that.initCharts()
            },
        },
        mounted() {
            this.initCharts();
            this.setData();
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

    .point1 {
        width: 290px;
        height: 260px;
        display: inline-block;
        background-image: url(../static/images/wcbg.png), url(../assets/texiao.png), url(../static/images/frame.png);
        background-repeat: no-repeat;
        background-size: 70% 80%, 60%, 100% 100%;
        background-position: center 35px, 38px -0px, center;
        margin-right: 20px;
    }

    .point2 {
        width: 290px;
        height: 260px;
        display: inline-block;
        background-image: url(../static/images/liufbg.png), url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-repeat: no-repeat;
        background-size: 80% 70%, 60%, 100% 100%;
        background-position: center 44px, 38px -0px, center;
    }

    .s3 {
        width: 240px;
        height: 180px;
        margin-top: 40px;
        margin-left: 20px;
    }

    .s2 {
        width: 270px;
        height: 230px;
        margin-top: 35px;
        margin-left: 25px;
    }

    #legend2 {
        width: 1800px;
        height: 900px;
        display: inline-block;
        background-image: url(../assets/texiao.png), url(../static/images/frame.png), url(../assets/texiao.png), url(../static/images/frame_2.png), url(../static/images/wcbg.png), url(../static/images/liufbg.png);
        background-position: 0px -20px, left 0px, 91% -20px, right 0px, 162px 122px, 93% 152px;
        background-size: 40%, 45% 87%, 40%, 45% 87%, 29%, 34%;
        background-repeat: no-repeat;
    }
</style>
