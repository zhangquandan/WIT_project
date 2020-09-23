<template>
    <div id="UNs">
        <div class="chat_content">
            <!-- <div style="position: absolute;right: 0px;bottom: 60px;  color: #F0F8FF; cursor: pointer;">
                <img style="width: 20px;height: 20px;" src="../static/images/qp.png" @click="screen"></img>
            </div> -->
            <div :style="{backgroundImage: 'url(' + (isSc ? '' : bgurl) + ')',paddingTop:top+'px'}" class="bg" ref="tt">
                <!-- 	<div id="un" ref="chart2"></div>
                    <div id="un2" ref="chart3"></div> -->

                <div :style="{'left':(isSc ? '504px' : '288px'),'bottom':(isSc ? lengthBottom : '168px')}" id="title">
                    <div v-for="item in $store.state.data.skData" class="i">{{item}}</div>
                </div>
                <div :style="{'left':(isSc ? '245px' : '12px'),'top':(isSc ? '70px' : '30px')}" id="legend"
                     ref="chart4">
                </div>
            </div>


            <!-- <div id="legend" ref="chart4"></div> -->

        </div>
    </div>
</template>

<script>
    import data from '../static/mock/wuchang_dma.json';
    import data2 from '../static/mock/liufang_dma.json';

    export default {
        name: 'Un',
        data() {
            return {
                isSc: false,
                fullscreen: false,
                scale: {
                    chart1: 0.95,
                    chart2: 0.9,
                },
                bgurl: "/img/starry.64a631ca.png",
                top: 0,
                cantop: 40,
                //chart1: "",
                canLeft: "1100px",
                visLeft: 50,
                visBottom: 25,
                left: "140",
                lengthBottom: "155px"
            }
        },

        methods: {

            tranData: function (arr) {
                try {
                    var data = []
                    for (var item of arr) {
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
                    }
                    return data
                } catch {
                }
            },

            setData: function () {
                //console.log(this.$data.chart1.setOption)
                var that = this
                var dom3 = this.$refs.chart4;
                var myChart3 = this.echarts.init(dom3);
                myChart3.setOption({
                    series: [{
                        data: that.tranData(that.$store.state.data.qyMapData),
                    }, {
                        data: that.tranData(that.$store.state.data.qyMapData),
                    }]
                })
                that.initCharts()
            },
            initCharts() {
                // var dom = this.$refs.chart2;
                // var dom2 = this.$refs.chart3;
                var dom3 = this.$refs.chart4;
                // var myChart = this.echarts.init(dom);
                // var myChart2 = this.echarts.init(dom2);
                var myChart3 = this.echarts.init(dom3);
                var arr = this.$store.state.data.skData
                var that = this;
                var uploadedDataURL = './static/mock/wuchang_dma.json';
                var uploadedDataURL2 = './static/mock/liufang_dma.json';

                function showProvince() {
                    var name1 = 'wuchang';
                    var name = 'liufang';
                    // myChart.showLoading();
                    // myChart.hideLoading();
                    var colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
                        '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000']
                    that.echarts.registerMap(name1, data);
                    that.echarts.registerMap(name, data2);
                    var option = {
                        //backgroundColor: 'rgba(8,24,66,.5)',
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
                            zoom: that.$data.scale.chart2,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 20,
                                        position: ['50%', '50%']
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 20
                                    }
                                },
                                position: 'inside'
                            },
                            itemStyle: {
                                normal: {
                                    //borderColor: '#5bd1f9',
                                    borderWidth: '0.8',
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowBlur: 10,
                                    //areaColor: '#01176a'
                                },
                                emphasis: {
                                    areaColor: '#a50026',
                                    borderWidth: 1,
                                    fontSize: 20,
                                    borderColor: '#5ecef4',
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.qyMapData),
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }, {
                            type: 'map',
                            mapType: name,
                            left: that.$data.canLeft,
                            zoom: that.$data.scale.chart2,
                            top: that.$data.cantop,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 20,
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        color: '#51b5df',
                                        fontSize: 20,
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    //borderColor: '#5bd1f9',
                                    borderWidth: '0.8',
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowBlur: 10
                                    //areaColor: '#01176a'
                                },
                                emphasis: {
                                    areaColor: '#0628a6',
                                    borderWidth: 1,
                                    borderColor: '#5ecef4',
                                }
                            },
                            animation: true,
                            data: that.tranData(that.$store.state.data.qyMapData),
                            // animationDurationUpdate: 1000,
                            // animationEasingUpdate: 'quinticInOut'
                        }]
                    };
                    myChart3.setOption(option);
                }

                showProvince();
            },

            // screen: function() {
            // 	let element = this.$refs.tt; //设置后就是   id==con_lf_top_div 的容器全屏
            // 	if (this.$data.fullscreen) {
            // 		if (document.exitFullscreen) {
            // 			document.exitFullscreen();
            // 		} else if (document.webkitCancelFullScreen) {
            // 			document.webkitCancelFullScreen();
            // 		} else if (document.mozCancelFullScreen) {
            // 			document.mozCancelFullScreen();
            // 		} else if (document.msExitFullscreen) {
            // 			document.msExitFullscreen();
            // 		}
            // 	} else {
            // 		if (element.requestFullscreen) {
            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var dom = this.$refs.chart4
            // 			var dom1 = this.$refs.chart2;
            // 			var dom2 = this.$refs.chart3;
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			dom1.style.width = "600px"
            // 			dom1.style.height = "580px"
            // 			dom2.style.width = "600px"
            // 			dom2.style.height = "580px"
            // 			this.$data.scale.chart2 = 0.9
            // 			this.$data.top = 100
            // 			this.$data.canLeft = "600px"
            // 			this.$data.left = "0"
            // 			this.$data.cantop = 60
            // 			this.$data.visBottom = 0
            // 			this.$data.visLeft = 240

            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			element.requestFullscreen();
            // 		} else if (element.webkitRequestFullScreen) {
            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			this.$data.lengthBottom = "120px"
            // 			var dom = this.$refs.chart4
            // 			var dom1 = this.$refs.chart2;
            // 			var dom2 = this.$refs.chart3;
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			dom1.style.width = "600px"
            // 			dom1.style.height = "580px"
            // 			dom2.style.width = "600px"
            // 			dom2.style.height = "580px"
            // 			this.$data.scale.chart2 = 0.9
            // 			this.$data.top = 100
            // 			this.$data.canLeft = "600px"
            // 			this.$data.left = "0"
            // 			this.$data.cantop = 60
            // 			this.$data.visBottom = 0
            // 			this.$data.visLeft = 240
            // 			element.style.backgroundColor = "#000"
            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			element.webkitRequestFullScreen();
            // 		} else if (element.mozRequestFullScreen) {
            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var dom = this.$refs.chart4
            // 			var dom1 = this.$refs.chart2;
            // 			var dom2 = this.$refs.chart3;
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			dom1.style.width = "600px"
            // 			dom1.style.height = "580px"
            // 			dom2.style.width = "600px"
            // 			dom2.style.height = "580px"
            // 			this.$data.scale.chart2 = 0.9
            // 			this.$data.top = 100
            // 			this.$data.canLeft = "600px"
            // 			this.$data.left = "0"
            // 			this.$data.cantop = 60
            // 			this.$data.visBottom = 0
            // 			this.$data.visLeft = 240

            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			element.mozRequestFullScreen();
            // 		} else if (element.msRequestFullscreen) {
            // 			// IE11
            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var dom = this.$refs.chart4
            // 			var dom1 = this.$refs.chart2;
            // 			var dom2 = this.$refs.chart3;
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			dom1.style.width = "600px"
            // 			dom1.style.height = "580px"
            // 			dom2.style.width = "600px"
            // 			dom2.style.height = "580px"
            // 			this.$data.scale.chart2 = 0.9
            // 			this.$data.top = 100
            // 			this.$data.canLeft = "600px"
            // 			this.$data.left = "0"
            // 			this.$data.cantop = 60
            // 			this.$data.visBottom = 0
            // 			this.$data.visLeft = 240

            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			element.msRequestFullscreen();
            // 		}
            // 	}
            // },

            getColor: function (val) {
                var color
                var arr = this.$store.state.data.skData
                var colors = ['#07076A', '#000099', '#006699', '#009999', '#00CC00', '#CCFF33', '#FFCC00', '#ff6600',
                    '#F48E16', '#FF6600', '#FF0000', '#CC0000', '#7D0022', '#4B0909', '#000000']
                if (val <= arr[0]) {
                    color = colors[0]
                } else if (val > arr[1] && val <= arr[2]) {
                    color = colors[1]
                } else if (val > arr[2] && val <= arr[3]) {
                    color = colors[2]
                } else if (val > arr[3] && val <= arr[4]) {
                    color = colors[3]
                } else if (val > arr[4] && val <= arr[5]) {
                    color = colors[4]
                } else if (val > arr[5] && val <= arr[6]) {
                    color = colors[5]
                } else if (val > arr[6] && val <= arr[7]) {
                    color = colors[6]
                } else if (val > arr[7] && val <= arr[8]) {
                    color = colors[7]
                } else if (val > arr[8] && val <= arr[9]) {
                    color = colors[8]
                } else if (val > arr[9] && val <= arr[10]) {
                    color = colors[9]
                } else if (val > arr[10] && val <= arr[11]) {
                    color = colors[10]
                } else if (val > arr[11] && val <= arr[12]) {
                    color = colors[11]
                } else if (val > arr[12] && val <= arr[13]) {
                    color = colors[12]
                } else if (val > arr[13] && val <= arr[14]) {
                    color = colors[13]
                } else if (val > arr[14] && val <= arr[15]) {
                    color = colors[14]
                }
                return color
            },

            // checkFull() {
            // 	//判断浏览器是否处于全屏状态 （需要考虑兼容问题）
            // 	//火狐浏览器
            // 	var isFull = document.mozFullScreen ||
            // 		document.fullScreen ||
            // 		//谷歌浏览器及Webkit内核浏览器
            // 		document.webkitIsFullScreen ||
            // 		document.webkitRequestFullScreen ||
            // 		document.mozRequestFullScreen ||
            // 		document.msFullscreenEnabled
            // 	if (isFull === undefined) {
            // 		isFull = false
            // 	}
            // 	return isFull;
            // },

        },
        mounted() {
            this.initCharts();
        }
    };
</script>

<style>
    #un {
        width: 700px;
        height: 680px;
        display: inline-block;
        background-image: url(../assets/texiao.png), url(../static/images/frame.png);
        background-repeat: no-repeat;
        background-size: 60%, 100% 100%;
        background-position: 38px -0px, center;
        margin-right: 145px;
    }

    #un2 {
        width: 700px;
        height: 680px;
        display: inline-block;
        background-image: url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-repeat: no-repeat;
        background-size: 60%, 100% 100%;
        background-position: 38px -0px, center;
    }

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

    #legend {
        width: 1800px;
        height: 900px;
        display: inline-block;
        background-image: url(../assets/texiao.png), url(../static/images/frame.png), url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-position: 0px -20px, left 0px, 91% -20px, right 0px;
        background-size: 40%, 45% 87%, 40%, 45% 87%;
        background-repeat: no-repeat;
    }
</style>
