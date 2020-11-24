<template>
    <div>
        <div class="left">
            <div class="lt">
                <Comp :fontSize="22" type="shuibiao" v-loading="$store.state.init.meterlbView"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(15,21,47,0)" element-loading-text="拼命加载中"
                      Cstyle="40%" ref="comp" :val="$store.state.data.weterLbViewData" :icon="icon[3]"
                      title="水表综合漏损指数"></Comp>
            </div>
            <div class="lb">
                <lbView valRight="50px" :left="'10'" fontStyle="right" titleRight="15px" :space="15" right="10px"
                        :labellength="10"
                        :valLenght="7" :label="dmaLabel" :val="$store.state.data.ViewData3" :icon="icon[0]"
                        title="水表关键漏损指标"></lbView>
            </div>
        </div>
        <div class="mid">
            <div class="mt" ref="mt">
                <PointUnView ref="point"></PointUnView>
                <div style="position: absolute; bottom: 113px; right: 100px; cursor: pointer;" @click="test">
                    <img style="width: 50px;height: 50px;" src="../static/images/qp.png"></img>
                </div>
            </div>
            <div class="mb">
                <cbView v-loading="$store.state.init.cbView" element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(15,21,47,0)"
                        element-loading-text="拼命加载中" ref="cbView"></cbView>
            </div>
        </div>
        <div class="right">
            <div class="rt">
                <rtView :val="$store.state.data.sc" :icon="icon[1]" title="学校基本信息"></rtView>
            </div>
            <div class="rb">
                <lbView fristTitleLeft="10px" fontStyle="left" top="60px" left="30px" :space="50"
                        :val="$store.state.data.indicator"
                        :label="ztLabel" :labellength="8" :valLenght="5" :icon="icon[2]" title="总体用水指标"></lbView>
            </div>
        </div>
        <div style="width: 200vw; height: 100%; background-color: #0F152F; position: absolute;" v-show="isSc"></div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import lbView from '@/components/lbView.vue'
    import rtView from '@/components/rtView.vue'
    import cbView from '@/components/cbView.vue'
    import Comp from '@/components/Comp.vue'
    import PointUnView from '@/components/PointUnView.vue'
    import {
        request
    } from '../api/request.js'

    const util = require("../util/util.js")
    export default {
        name: 'Home',
        components: {
            lbView,
            rtView,
            cbView,
            Comp,
            PointUnView
        },
        data() {
            return {
                isSc: false,
                icon: [
                    require("../assets/Lower-left-icon.png"),
                    require("../assets/RU_icon.png"),
                    require("../assets/low-right_icon.png"),
                    require("../assets/uplefticon.png")
                ],
                dmaLabel: [{
                    text: "水表",
                    aLine: true,
                    wid: 7,
                },
                    {
                        text: "日用量隔周增量",
                        wid: 9,
                    },
                    {
                        text: "最小量隔周增量",
                        wid: 7,
                    },
                ],

                ztLabel: [{
                    text: "指标",
                    aLine: true,
                    wid: 8
                },
                    {
                        text: "全校区",
                        aLine: true,
                        wid: 5
                    },
                    {
                        text: "武昌区",
                        aLine: true,
                        wid: 5
                    },
                    {
                        text: "流芳区",
                        aLine: true,
                        wid: 5
                    },
                ],

            }
        },

        mounted() {
            if (this.$store.state.init.cbView) {
                this.init()
            }

            if (this.$store.state.init.meterlbView) {
                this.getPointData()
            }
            var time = util.getNowFormatDay()
        },

        methods: {
            init: function () {
                var that = this
                var y = new Date().getFullYear()
                request("leakagelndex", "waterregionWaterquotaList", {
                    waterregionid: 1,
                    quotayear: y
                }, function (res) {
                    var des = [] //每月用水定额
                    for (let m = 1; m <= 12; m++) {
                        var index = "m" + m
                        des.push((res.data.data[0][index]).toFixed(1))
                    }

                    request("leakagelndex", "getMwater", {
                        yy: y,
                        id: 1
                    }, (res2) => {
                        var ysls = [] //每月用水量
                        var jsls = [] //每月节水量
                        for (let i = 0; i < res2.data.data.list.length - 1; i++) {
                            ysls.push((res2.data.data.list[i].data).toFixed(1))
                            jsls.push((des[i] - res2.data.data.list[i].data).toFixed(1))
                        }

                        //计算组件title相关数据
                        var bnde = 0 //本年定额
                        var ylj = 0 //已累计
                        var yyjs = 0 //已用节水
                        var mqde = 0 //目前定额
                        for (let i = 0; i < des.length; i++) {
                            bnde += parseFloat(des[i])
                        }

                        for (let i = 0; i < ysls.length; i++) {
                            ylj += parseFloat(ysls[i])
                            yyjs += parseFloat(jsls[i])
                            mqde += parseFloat(des[i])
                        }

                        var yyjsl = ((mqde - ylj) / mqde / 0.01).toFixed(1) //已用节水率
                        bnde = bnde.toFixed(1)
                        ylj = ylj.toFixed(1)
                        yyjs = yyjs.toFixed(1)

                        //提交数据
                        that.$store.commit('setData', {
                            de: des,
                            ysl: ysls,
                            jsl: jsls,
                            bnde: bnde,
                            ylj: ylj,
                            yyjs: yyjs,
                            yyjsl: yyjsl,
                            success: function () {
                                that.$refs.cbView.init()
                                //that.$store.state.init.cbView = false
                                that.$store.commit('setViewState', 'cbView')
                                console.log("条形统计图初始化完成")
                            }
                        });
                    })
                })
            },

            //水表关键漏损指标
            getPointData: function () {
                var time = util.getYesFormatDay()
                var that = this
                var frameLf = that.$store.state.data.frameLf
                var frameWc = that.$store.state.data.frameWc

                request("leakagelndex", "meterInfo", {
                    name: '',
                    value: ''
                }, function (res2) {
                    var total = res2.data.data.total

                    //武昌
                    for (let i = 8; i <= 12; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data
                            if (data) {
                                for (let j = 0; j < frameWc.length; j++) {
                                    if (frameWc[j][0] == data.name) {
                                        frameWc[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameWc[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "wuchang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })
                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }
                        })
                    }

                    //流芳
                    for (let i = 13; i <= 17; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data

                            if (data) {
                                for (let j = 0; j < frameLf.length; j++) {
                                    if (frameLf[j][0] == data.name) {
                                        frameLf[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameLf[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "liufang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })

                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }

                        })
                    }


                    //武昌
                    for (let i = 160; i <= 179; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data
                            if (data) {
                                for (let j = 0; j < frameWc.length; j++) {
                                    if (frameWc[j][0] == data.name) {
                                        frameWc[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameWc[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "wuchang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })
                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }
                        })
                    }






                    //流芳
                    for (let i = 180; i <= 223; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data
                            if (data) {
                                for (let j = 0; j < frameLf.length; j++) {
                                    if (frameLf[j][0] == data.name) {
                                        frameLf[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameLf[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "liufang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })
                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }
                        })
                    }

                    //武昌
                    for (let i = 230; i <= 237; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data
                            if (data) {
                                for (let j = 0; j < frameWc.length; j++) {
                                    if (frameWc[j][0] == data.name) {
                                        frameWc[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameWc[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "wuchang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })
                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }
                        })
                    }


                    //流芳
                    for (let i = 238; i <= 245; i++) {
                        request("leakagelndex", "waterMeter", {
                            watermeterid: i,
                            time: time
                        }, function (res) {
                            var data = res.data.data
                            if (data) {
                                for (let j = 0; j < frameLf.length; j++) {
                                    if (frameLf[j][0] == data.name) {
                                        frameLf[j][3] = data
                                        that.$store.commit("addWaterData", {
                                            data: frameLf[j],
                                            success: function () {
                                                that.meterSort()
                                            }
                                        })

                                        that.$store.commit("setMaterMapData", {
                                            type: "liufang",
                                            index: j,
                                            data: data,
                                            success: function () {
                                                that.$refs.point.setData()
                                            }
                                        })
                                        break
                                    }
                                }
                            } else {
                                that.$store.commit("addWaterData", {
                                    data: '',
                                    success: function () {
                                        that.meterSort()
                                    }
                                })
                            }
                        })
                    }



                })
            },

            //排序
            meterSort: function () {
                var that = this
                var arr_ = that.$store.state.data.weterMapData
                //清洗数据
                for (let i = 0, len = arr_.length; i < len; i++) {
                    if (arr_[i] == '' || !arr_[i][3] || arr_[i][3] == '' || arr_[i][3] === undefined) {
                        arr_.splice(i, 1)
                        len--;
                        i--;
                    }
                }
                arr_.sort(function (a, b) {
                    return b[3].leakageIndex - a[3].leakageIndex
                })
                var arr = []
                for (let i = 0; i < 10; i++) {
                    arr.push(arr_[i][3])
                }

                //获取前十名称
                var names = []
                //获取前十的原始数据
                var val = []
                //将数据全部换算成整数
                var tranArr = []
                var fontSize = 0 //字号
                for (let a = 0; a < 10; a++) {
                    tranArr.push(parseInt(arr[a].leakageIndex - arr[9].leakageIndex) + 30) //设置一个最小值，防止第十名没有填充
                    names.push(arr[a].name)
                    if (fontSize < arr[a].name.length) {
                        fontSize = arr[a].name.length
                    }
                    val.push((arr[a].leakageIndex).toFixed(1))
                }
                if (fontSize >= 13) {
                    fontSize = 8.5
                } else if (fontSize >= 12 && fontSize < 13) {
                    fontSize = 9
                } else {
                    fontSize = 9.5
                }
                that.$store.commit('setFontSize', {
                    item: 'fontSize',
                    val: fontSize
                })
                var len = tranArr[0].toString().length
                var num = "1"
                for (let j = 0; j < len - 1; j++) {
                    num += "0"
                }
                num = parseInt(num)
                var max = Math.ceil(tranArr[0] / num) * num + num
                var max_ = []
                var margin = []
                for (let b = 0; b < 10; b++) {
                    max_[b] = max + 30
                    margin[b] = max / 10 + 30
                }
                that.$store.commit('setWeterPaiHangData', {
                    tranArr: tranArr,
                    val: val,
                    names: names,
                    max_: max_,
                    margin: margin,
                    success: function () {
                        that.$refs.comp.setData()
                        that.$store.commit('setViewState', 'meterlbView')
                    }
                })

                //水表关键漏损指标
                var LbViewData = []
                for (let c = 0; c < 10; c++) {
                    LbViewData[c] = {
                        label: arr[c].name,
                        data: [arr[c].addTotal.toFixed(1), arr[c].addMin.toFixed(1)]
                    }
                }
                that.$store.state.data.ViewData3 = LbViewData
            },
            //全屏
            test() {
                var dom = this.$refs.mt
                if (!this.$data.isSc) {
                    dom.style.transform = "translate(0,300px) scale(1.5,1.5)"
                    dom.style.zIndex = 999
                } else {
                    dom.style.transform = "translate(0,0px) scale(1,1)"
                    dom.style.zIndex = 1
                }
                this.$data.isSc = !this.$data.isSc

            }
        }
    }
</script>

<style scoped="scoped">
    .left {
        float: left;
        height: 100%;
        width: 790px;
    }

    .mid {
        float: left;
        height: 100%;
        width: 2150px;
    }

    .right {
        float: left;
        height: 100%;
        width: 820px;
    }

    .lt {
        height: 842px;
        width: 100%;
        padding-top: 80px;
        background-image: url(../assets/imgs/zs2.png);
        background-size: 95% 96%;
        background-position: 14px 30px;
        background-repeat: no-repeat;
        box-sizing: border-box;
    }

    .lb {
        height: 1102px;
        width: 100%;
        background-image: url(../assets/imgs/zx2.png);
        background-size: 96% 98%;
        background-position: 10px 18px;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding-right: 60px;
        padding-left: 30px;
        padding-top: 80px;

    }

    .mt {
        width: 100%;
        height: 1106px;
        background-image: url(../assets/imgs/midt.png);
        background-repeat: no-repeat;
        background-size: 100% 97%;
        background-position: 5px 30px;
        transition: 1s;
        position: relative;
    }

    .mb {
        width: 100%;
        height: 865px;
        background-image: url(../assets/imgs/midb.png);
        background-repeat: no-repeat;
        background-size: 100% 95%;
        background-position: 6px 9px;
        box-sizing: border-box;
        padding-top: 100px;
    }

    .rt {
        width: 100%;
        height: 765px;
        background-image: url(../assets/imgs/zuoshang.png);
        background-size: 101% 98%;
        background-repeat: no-repeat;
        background-position: 31px 11px;
        box-sizing: border-box;
        padding-top: 30px;
    }

    .rb {
        width: 100%;
        height: 1203px;
        background-image: url(../assets/imgs/zuoxia.png);
        background-size: 102% 96.7%;
        background-repeat: no-repeat;
        background-position: 24px 11px;
        box-sizing: border-box;
        padding-left: 70px;
        padding-top: 90px;
    }
</style>
