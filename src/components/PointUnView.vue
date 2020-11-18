<!--水表散点图-->
<template>
    <div id="UNs">
        <div class="chat_content">
            <div :style="{paddingTop : top+'px'}" class="bg" ref="tt">
                <!-- <div style="position: absolute;right: 60px;bottom: 46px;  color: #F0F8FF; cursor: pointer;">
                    <img style="width: 30px;height: 30px;" src="../static/images/qp.png" @click="screen"></img>
                </div> -->
                <!-- 	<div :style="{backgroundPosition:(isSc ? 'center 80px, 38px -0px,center' : 'center 55px, 38px -0px,center')}" ref="jun1" class="point1"></div>
                    <div :style="{backgroundPosition:(isSc ? 'center 100px, 38px -0px,center' : 'center 64px, 38px -0px,center')}" ref="jun2" class="point2"></div> -->
                <div :style="{'left':(isSc ? '504px' : '288px'),'bottom':(isSc ? lengthBottom : '168px')}" id="title">
                    <div v-for="item in $store.state.data.skData" class="i">{{item}}</div>
                </div>
                <div :style="{'left':(isSc ? '215px' : '12px'),'top':(isSc ? '110px' : '30px')}" id="legend3"
                     ref="chart4">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import data from '../static/mock/PointWC_bg.json';
    import data2 from '../static/mock/PointLF_bg.json';

    export default {
        name: 'Un',
        data() {
            return {
                isSc: false,
                fullscreen: false,
                scale: 20,
                bgurl: "/img/starry.64a631ca.png",
                top: 0,
                canLeft: "1060px",
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
        created() {
            let that = this
            // window.onresize = function() {

            // 		// 退出全屏后要执行的动作
            // 		that.$data.fullscreen = false;
            // 		that.$data.isSc = false
            // 		var domc = that.$refs.jun1;
            // 		var domc2 = that.$refs.jun2;
            // 		var dom = that.$refs.chart4
            // 		domc.style.width = "420px"
            // 		domc.style.height = "380px"
            // 		domc2.style.width = "420px"
            // 		domc2.style.height = "380px"
            // 		dom.style.width = "1000px"
            // 		dom.style.height = '470px'
            // 		that.$data.scale = 10
            // 		that.$data.canLeft = '510px'
            // 		that.$data.top = 50
            // 		that.$data.visLeft = 115
            // 		that.$data.visBottom = 0
            // 		var bg = that.$refs.tt
            // 		bg.style.backgroundColor = ""
            // 		var myChart = that.echarts.init(dom);
            // 		that.initCharts();
            // 		myChart.resize()


            // }
        },
        methods: {
            initCharts() {
                //水表百度坐标
                var dataf = this.$store.state.data.frameLf
                var dataw = this.$store.state.data.frameWc
                var arr = this.$store.state.data.skData
                //数据格式转换
                function convertdata(d) {
                    var res = [];
                    for (var i = 0; i < d.length; i++) {
                        if (d[i][3]) {
                            res.push({
                                name: d[i][0] + "," + d[i][3].addMin.toFixed(1) + "," + parseFloat(d[i][3].addRangeMin.split("%")[0]).toFixed(1) + "%" + "," + parseFloat(d[i][3].addRangeTotal.split("%")[0]).toFixed(1) + "%" + "," + d[i][3].addTotal.toFixed(1) + "," + d[i][3].min.toFixed(1) + "," + d[i][3].total.toFixed(1),
                                value: [d[i][1], d[i][2], d[i][3].leakageIndex.toFixed(1)]
                            });
                        }
                    }
                    return res
                }

                var data3 = convertdata(dataf);
                var data4 = convertdata(dataw)
                var dom3 = this.$refs.chart4;
                var myChart3 = this.echarts.init(dom3);
                var that = this;
                var uploadedDataURL = './static/mock/geoman.json';
                var uploadedDataURL2 = './static/mock/liufang_dma.json';
                var that = this
                var colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
                    '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000']

                function showProvince() {
                    var name1 = 'geoman';
                    var name = 'liufang';
                    // myChart.showLoading();
                    // myChart.hideLoading();
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
                        geo: [{
                            top: "10px",
                            show: true,
                            roam: false,
                            left: '226px',
                            zoom: 1,
                            map: name1,
                            selectedMode: true, //是否允许选中多个区域，
                            label: {
                                normal: {
                                    show: false,
                                    color: '#fff'
                                },
                                emphasis: {
                                    show: false,
                                    color: '#FFFF0F'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    borderColor: 'none',
                                    borderWidth: 2,
                                    areaColor: 'none',
                                    shadowColor: 'none',
                                    shadowBlur: 6,
                                    shadowOffsetY: 5,
                                },
                                emphasis: {
                                    show: false,
                                    areaColor: 'none)',
                                    color: '#ff0'
                                }
                            }
                        }, {
                            top: "105px",
                            left: that.$data.canLeft,
                            show: true,
                            roam: false,
                            zoom: 1,
                            map: name,
                            selectedMode: true, //是否允许选中多个区域，
                            label: {
                                normal: {
                                    show: false,
                                    color: '#fff'
                                },
                                emphasis: {
                                    show: false,
                                    color: '#FFFF0F'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    borderColor: 'none',
                                    borderWidth: 2,
                                    areaColor: 'none',
                                    shadowColor: 'none',
                                    shadowBlur: 6,
                                    shadowOffsetY: 5,
                                },
                                emphasis: {
                                    show: false,
                                    areaColor: 'none)',
                                    color: '#ff0'
                                }
                            }
                        }],

                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0,0,250,0.2)',
                            formatter: function (params) {
                                var arr = params.name.split(",")
                                //name: d[i][0]+","+d[i][3].addMin+","+d[i][3].addRangeMin+","+d[i][3].addRangeTotal+","+d[i][3].addTotal+","+d[i][3].min+","+d[i][3].total,
                                if (params.data.value[2]) {
                                    return (
                                        '<div class="tooltip">' +
                                        '<div style="text-align:center">' + arr[0] + '</div>' +
                                        '当日水量：' + arr[6] + '</br>' +
                                        '日量隔周增量：' + arr[4] + '</br>' +
                                        '日量隔周增幅：' + arr[3] + '</br>' +
                                        '报警日最小流量：' + arr[5] + '</br>' +
                                        '最小流量隔周增量：' + arr[1] + '</br>' +
                                        '最小流量隔周增幅：' + arr[2] + '</br>' +
                                        '综合漏损指数：' + params.data.value[2] + '</br>' +
                                        '</div>'
                                    )
                                } else {
                                    return (
                                        '<div class="tooltip">' +
                                        '<div style="text-align:center">' + arr[0] + '</div>' +
                                        '暂无数据' +
                                        '</div>'
                                    )
                                }
                            },
                        },

                        series: [{
                            name: 'a',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            geoIndex: "0",
                            data: data4,
                            symbolSize: that.$data.scale,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: function (e) {
                                        try {
                                            if (e.data.value[2] && e.data.value[2].leakageIndex != undefined) {
                                                return that.getColor(e.data.value[2])
                                            } else {
                                                return "#fff"
                                            }
                                        } catch {
                                        }
                                    },
                                },
                            }
                        }, {
                            name: 'a',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            geoIndex: "1",
                            data: data3,
                            symbolSize: that.$data.scale,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: function (e) {
                                        try {
                                            if (e.data.value[2]) {
                                                return that.getColor(e.data.value[2])
                                            } else {
                                                return "#fff"
                                            }
                                        } catch {
                                        }
                                    },
                                },
                            }
                        }]
                    };
                    myChart3.setOption(option);
                };
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
            // 			var domc = this.$refs.jun1;
            // 			var domc2 = this.$refs.jun2;
            // 			var dom = this.$refs.chart4
            // 			//dom.style.width = "700px"
            // 			//dom.style.height = "580px"
            // 			domc.style.width = "600px"
            // 			domc.style.height = "580px"
            // 			domc2.style.width = "600px"
            // 			domc2.style.height = "580px"
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			this.$data.canLeft = '550px'
            // 			this.$data.visLeft = 280
            // 			this.$data.scale = 14
            // 			this.$data.top = 100
            // 			this.$data.visBottom = 30
            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			//var myChart2 = this.echarts.init(dom2);
            // 			//myChart2.resize()
            // 			element.requestFullscreen();
            // 		} else if (element.webkitRequestFullScreen) {
            // 			this.$data.lengthBottom = "110px"
            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var domc = this.$refs.jun1;
            // 			var domc2 = this.$refs.jun2;
            // 			var dom = this.$refs.chart4
            // 			//dom.style.width = "700px"
            // 			//dom.style.height = "580px"
            // 			domc.style.width = "600px"
            // 			domc.style.height = "580px"
            // 			domc2.style.width = "600px"
            // 			domc2.style.height = "580px"
            // 			element.style.backgroundColor = "#000"
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			this.$data.canLeft = '550px'
            // 			this.$data.visLeft = 280
            // 			this.$data.scale = 14
            // 			this.$data.top = 100
            // 			this.$data.visBottom = 30
            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			//var myChart2 = this.echarts.init(dom2);
            // 			//myChart2.resize()
            // 			element.webkitRequestFullScreen();
            // 		} else if (element.mozRequestFullScreen) {

            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var domc = this.$refs.jun1;
            // 			var domc2 = this.$refs.jun2;
            // 			var dom = this.$refs.chart4
            // 			//dom.style.width = "700px"
            // 			//dom.style.height = "580px"
            // 			domc.style.width = "600px"
            // 			domc.style.height = "580px"
            // 			domc2.style.width = "600px"
            // 			domc2.style.height = "580px"
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			this.$data.canLeft = '550px'
            // 			this.$data.visLeft = 280
            // 			this.$data.scale = 14
            // 			this.$data.top = 100
            // 			this.$data.visBottom = 30
            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			//var myChart2 = this.echarts.init(dom2);
            // 			//myChart2.resize()
            // 			element.mozRequestFullScreen();
            // 		} else if (element.msRequestFullscreen) {

            // 			this.$data.isSc = true
            // 			this.$data.fullscreen = false;
            // 			var domc = this.$refs.jun1;
            // 			var domc2 = this.$refs.jun2;
            // 			var dom = this.$refs.chart4
            // 			//dom.style.width = "700px"
            // 			//dom.style.height = "580px"
            // 			domc.style.width = "600px"
            // 			domc.style.height = "580px"
            // 			domc2.style.width = "600px"
            // 			domc2.style.height = "580px"
            // 			dom.style.width = "1060px"
            // 			dom.style.height = '650px'
            // 			this.$data.canLeft = '550px'
            // 			this.$data.visLeft = 280
            // 			this.$data.scale = 14
            // 			this.$data.top = 100
            // 			this.$data.visBottom = 30
            // 			var myChart = this.echarts.init(dom);
            // 			this.initCharts();
            // 			myChart.resize()
            // 			//var myChart2 = this.echarts.init(dom2);
            // 			//myChart2.resize()
            // 			element.msRequestFullscreen();
            // 		}
            // 	}
            // },

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

            setData: function () {
                this.initCharts();
            }
        },
        mounted() {
            this.initCharts();
            //this.setData();
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
        width: 420px;
        height: 380px;
        display: inline-block;
        background-image: url(../static/images/wcbg.png), url(../assets/texiao.png), url(../static/images/frame.png);
        background-repeat: no-repeat;
        background-size: 70% 80%, 60%, 100% 100%;
        background-position: center 35px, 38px -0px, center;
        margin-right: 20px;

    }

    .point2 {
        width: 420px;
        height: 380px;
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

    #legend3 {
        width: 1800px;
        height: 900px;
        display: inline-block;
        background-image: url(../static/images/wcbg.png), url(../static/images/liufbg.png), url(../assets/texiao.png), url(../static/images/frame.png), url(../assets/texiao.png), url(../static/images/frame_2.png);
        background-position: 110px 82px, 90% 162px, 0px -20px, left 0px, 91% -20px, right 0px;
        background-size: 34%, 34%, 40%, 45% 87%, 40%, 45% 87%;
        background-repeat: no-repeat;
    }
</style>
