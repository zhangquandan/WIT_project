<template>
    <el-container id="app">
        <el-header style="height: 185px;">
            <topView></topView>
        </el-header>
        <el-main style="padding: 0;">
            <router-view class="page"/>
        </el-main>
    </el-container>
</template>

<script>
    import {
        request
    } from './api/request.js'
    import topView from '@/components/topView.vue'

    const util = require("./util/util.js")
    export default {

        components: {
            topView,
        },

        mounted() {
            var that = this
            if (localStorage.getItem("token")) {
                this.indicator()
                this.scinit()
                this.scInfo()
                this.getVisMapData()
            } else {
                var that = this
                // request("leakagelndex", "login", {}, function(res) {
                // 	//获取token，写入缓存
                // 	localStorage.setItem("token", res.data.data)
                // 	setTimeout(function(){
                // 		console.log(localStorage.getItem("token"))
                // 		that.indicator()
                // 		that.scinit()
                // 		that.scInfo()
                // 		that.getVisMapData()
                // 	},1000)
                // })
            }

        },

        data() {
            return {
                zl: [], //昨日用水量 0位全小区 1：武昌区 2：流芳区
                byzl: [], //本月总量
                bnzl: [], //本年总量
                sjdh: [], //生均单耗
                yyjsl: [], //已用节水率
                de: [], //用水定额


            }
        },

        methods: {
            //获取卡尺刻度
            getVisMapData: function () {
                var that = this
                request("leakagelndex", "getColor", {
                    category: 70
                }, function (res) {
                    var arr = []
                    for (let i = 1; i <= 14; i++) {
                        arr.push(res.data.data[0]["range" + i])
                    }
                    that.$store.state.data.skData = arr
                })
            },


            //校区用水漏损概况
            scinit: function () {
                var that = this
                for (let i = 1; i <= 3; i++) {
                    request("leakagelndex", "area", {
                        waterregionid: i,
                        time: util.getYesFormatDay() //获取当前日期 格式YYYY-MM-DD
                    }, function (res) {
                        var data = res.data.data;
                        //console.log(data)
                        var index;
                        if (data.name == "流芳校区") {
                            index = 2
                        } else if (data.name == "武汉工程大学") {
                            index = 0
                        } else if (data.name == "武昌校区") {
                            index = 1
                        }
                        that.$store.state.data.gk[index].data[0].val = (data.leakageIndex).toFixed(1)
                        that.$store.state.data.gk[index].data[1].val = (data.addTotal).toFixed(1) + " 吨"
                        that.$store.state.data.gk[index].data[2].val = parseFloat(data.addRangeTotal.split("%")[0]).toFixed(1) + "%"
                        that.$store.state.data.gk[index].data[3].val = (data.addMin).toFixed(1) + " 吨"
                        that.$store.state.data.gk[index].data[4].val = parseFloat(data.addRangeMin.split("%")[0]).toFixed(1) + "%"
                    })
                }
            },

            //学校基本信息
            scInfo: function () {
                var that = this
                request("leakagelndex", "getSchoolInfo", {}, function (res3) {
                    that.$store.state.data.sc[0].val = res3.data[0].value + "㎡"
                    that.$store.state.data.sc[1].val = res3.data[2].value + "㎡"
                    that.$store.state.data.sc[2].val = res3.data[9].value + "人"
                    that.$store.state.data.sc[3].val = res3.data[10].value + "人"
                })
            },

            //总体用水指标
            indicator: function () {
                var store = this.$store.state.data.indicator
                var time1 = util.getNowFormatDay()
                var time2 = util.getYesFormatDay()
                var that = this
                //昨日用水量
                for (let i = 1; i <= 3; i++) {
                    request("leakagelndex", "CustomTimeDay", {
                        pageNum: 1,
                        pageSize: 5,
                        waterregionid: i,
                        starttime: time2,
                        endtime: time1
                    }, function (res) {
                        var data = res.data.data.list[0]
                        var index;
                        if (data.name == "流芳校区") {
                            index = 2
                        } else if (data.name == "武汉工程大学") {
                            index = 0
                        } else if (data.name == "武昌校区") {
                            index = 1
                        }
                        var val = data.data
                        // if (parseInt(data.data).toString().length < 6) {
                        // 	var ws = 6 - parseInt(data.data).toString().length
                        // 	val = data.data.toFixed(ws)
                        // } else {
                        // 	val = parseInt(data.data)
                        // }
                        that.$store.commit("setZhData", {
                            line: 0,
                            index: index,
                            data: val.toFixed(1)
                        })
                    })
                }

                var benyue = [] //本月已用
                //本月已用
                var time2 = util.getNextMonth(util.getNowFormatDay())
                for (let i = 1; i <= 3; i++) {
                    request("leakagelndex", "CustomTimeMonth", {
                        pageNum: 1,
                        pageSize: 5,
                        waterregionid: i,
                        starttime: util.getNowFormatDayNoDay(),
                        endtime: time2
                    }, function (res) {
                        var data
                        var index;
                        var val;
                        console.log("sss")
                        console.log(res)
                        try {
                            data = res.data.data.list[0]
                            if (data.name == "流芳校区") {
                                index = 2
                            } else if (data.name == "武汉工程大学") {
                                index = 0
                            } else if (data.name == "武昌校区") {
                                index = 1
                            }
                            val = data.data
                            benyue[index] = data.data
                            that.$store.commit("setZhData", {
                                line: 1,
                                index: index,
                                data: val.toFixed(1)
                            })
                        } catch {
                            benyue[i - 1] = 0
                            that.$store.commit("setZhData", {
                                line: 1,
                                index: i - 1,
                                data: "-"
                            })
                        }

                    })
                }


                //本年生均单耗数据
                //本年已过天数
                var days = Math.ceil((new Date() - new Date(new Date().getFullYear().toString())) / (24 * 60 * 60 * 1000)) + 1;
                //获取各区人数
                var rs = []
                var mj = []
                var yy = [] //已用水
                var jsl_ = [] //节水量
                var preBnzl = [] //截至到上一个月的用水总量
                request("leakagelndex", "getSchoolInfo", {}, function (res) {
                    rs[0] = res.data[9].value
                    rs[1] = res.data[17].value
                    rs[2] = res.data[21].value
                    mj[0] = res.data[2].value
                    mj[1] = res.data[16].value
                    mj[2] = res.data[20].value
                    //本年已用
                    var timeNowYear = new Date().getFullYear()
                    var timeNextYear = new Date().getFullYear() + 1
                    for (let i = 1; i <= 3; i++) {
                        request("leakagelndex", "CustomTimeYear", {
                            pageNum: 1,
                            pageSize: 5,
                            waterregionid: i,
                            startyy: timeNowYear,
                            endyy: timeNextYear
                        }, function (res) {
                            var data = res.data.data.list[0]
                            var index;
                            if (data.name == "流芳校区") {
                                index = 2
                            } else if (data.name == "武汉工程大学") {
                                index = 0
                            } else if (data.name == "武昌校区") {
                                index = 1
                            }
                            yy[index] = data.data
                            preBnzl[index] = data.data - benyue[index] //本年已用-本月已用得到截止到上个月的用水量
                            var val = data.data;
                            // if (parseInt(data.data).toString().length < 8) {
                            // 	var ws = 7 - parseInt(data.data).toString().length
                            // 	val = data.data.toFixed(ws)
                            // } else {
                            // 	val = parseInt(data.data)
                            // }
                            that.$store.commit("setZhData", {
                                line: 2,
                                index: index,
                                data: val.toFixed(1)
                            })

                            //生均单耗
                            var val2 = val / rs[index] / days * 1000
                            // if (parseInt(val2).toString().length < 7) {
                            // 	var ws = 6 - parseInt(val2).toString().length
                            // 	val2 = val2.toFixed(ws)
                            // }
                            that.$store.commit("setZhData", {
                                line: 3,
                                index: index,
                                data: val2.toFixed(1)
                            })
                            //建筑单耗
                            var val3 = val / mj[index] / days * 1000
                            that.$store.commit("setZhData", {
                                line: 4,
                                index: index,
                                data: val3.toFixed(1)
                            })


                            //节水率
                            var mon = new Date().getMonth() + 1
                            var y = new Date().getFullYear()
                            for (let i = 1; i <= 3; i++) {
                                request("leakagelndex", "waterregionWaterquotaList", {
                                    waterregionid: i,
                                    quotayear: y
                                }, function (res) {
                                    var index
                                    var data = res.data.data[0]
                                    if (data.waterregionname == "流芳校区") {
                                        index = 2
                                    } else if (data.waterregionname == "武汉工程大学") {
                                        index = 0
                                    } else if (data.waterregionname == "武昌校区") {
                                        index = 1
                                    }
                                    var de = 0 //到该月定额总量
                                    for (let j = 1; j <= mon - 1; j++) {
                                        var ind = "m" + j
                                        de += data[ind]
                                    }
                                    that.$data.de[index] = de
                                    //目前节水率 = （目前定额总量 - 目前用水总量）/ 目前用水总量
                                    var val3 = (de - preBnzl[index]) / de / 0.01
                                    // if (parseInt(val3).toString().length < 6) {
                                    // 	var ws = 6 - parseInt(val3).toString().length
                                    // 	val3 = val3.toFixed(ws)
                                    // } else {
                                    // 	val3 = parseInt(val3)
                                    // }
                                    that.$store.commit("setZhData", {
                                        line: 5,
                                        index: index,
                                        data: val3.toFixed(1),
                                    })
                                })
                            }
                        })
                    }

                })
            },

        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        height: 1080px;
    }

    #app {
        min-width: 3840px;
        max-width: 3840px;
        min-height: 2160px;
        max-height: 2160px;
        background-color: #0f152F;
        margin: 0 auto;
        /* 	background-image: url(static/images/beijing.png);
            background-size: 100% 100%;
            background-repeat: no-repeat; */
        /* 	padding-left: 150px;
            padding-right: 150px; */
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        transform: scale(0.5, 0.5);
        transform-origin: left top 0
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .page {
        margin: 0 auto;
        height: 1973px;
        width: 100%;
        padding-left: 44px;
        overflow: hidden;
    }
</style>
