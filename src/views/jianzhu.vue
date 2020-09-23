<template>
    <div>
        <div class="left">
            <div class="lt">
                <Comp :fontSize="22" type="build" v-loading="$store.state.init.buildLtView"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(15,21,47,0)" element-loading-text="拼命加载中" Cstyle="30%" ref="comp"
                      :val="$store.state.data.buildLbViewData" :label="ltViewLabel.label" :icon="icon[3]"
                      title="建筑综合漏损指数"></Comp>
            </div>
            <div class="lb">
                <lbView fontStyle="right" titleRight="15px" :space="15" right="10px" :val="$store.state.data.ViewData2"
                        :labellength="7" :valLenght="7" :label="dmaLabel" :icon="icon[0]" title="建筑相关漏损指数"></lbView>
            </div>
        </div>
        <div class="mid">
            <div class="mt" ref="mt">
                <JUnView ref="junView"></JUnView>
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
                <rtView style="width: 100%;height: 100%;" :val="$store.state.data.sc" :icon="icon[1]"
                        title="学校基本信息"></rtView>
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
    import JUnView from '@/components/JUn.vue'
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
            JUnView
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
                    text: "建筑",
                    aLine: true,
                    wid: 5,
                },
                    {
                        text: "日用量隔周增量",
                        wid: 8,
                    },
                    {
                        text: "最小量隔周增量",
                        wid: 8,
                    },
                ],
                ltViewLabel: {
                    label: ['学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼', '学生公寓2号楼',
                        '学生公寓2号楼'
                    ],
                    ViewStyle: {
                        left: "40%"
                    }
                },

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

            if (this.$store.state.init.lfBuild || this.$store.state.init.wcBuild) {
                this.build()
            }

            if (this.$store.state.init.buildLtView) {
                this.getAllBuildData()
            }

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

            //建筑综合漏损指数
            build: function () {
                var time = util.getYesFormatDay()
                var that = this
                that.$store.state.data.buildMapData = []
                that.$store.state.data.buildMapData2 = []
                //武昌校区建筑id
                var wcBuilds = [138, 141, 139, 140, 144, 149, 145, 228, 229, 146, 147, 152, 137, 155, 154, 156, 158, 157, 231]
                var colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
                    '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000']

                request("leakagelndex", "getColor", {
                    category: 70
                }, function (res) {
                    var qjarr = []
                    for (let i = 1; i <= 14; i++) {
                        qjarr.push(res.data.data[0]["range" + i])
                    }
                    that.$store.state.data.skData = qjarr
                    for (let id of wcBuilds) {
                        request("leakagelndex", "bulid", {
                            buildingid: id,
                            time: time
                        }, function (res) {
                            let data = res.data.data
                            if (data) {
                                var color = ""
                                var val = data.leakageIndex
                                if (val <= qjarr[0]) {
                                    color = colors[0]
                                } else if (val > qjarr[0] && val <= qjarr[1]) {
                                    color = colors[1]
                                } else if (val > qjarr[1] && val <= qjarr[2]) {
                                    color = colors[2]
                                } else if (val > qjarr[2] && val <= qjarr[3]) {
                                    color = colors[3]
                                } else if (val > qjarr[3] && val <= qjarr[4]) {
                                    color = colors[4]
                                } else if (val > qjarr[4] && val <= qjarr[5]) {
                                    color = colors[5]
                                } else if (val > qjarr[5] && val <= qjarr[6]) {
                                    color = colors[6]
                                } else if (val > qjarr[6] && val <= qjarr[7]) {
                                    color = colors[7]
                                } else if (val > qjarr[7] && val <= qjarr[8]) {
                                    color = colors[8]
                                } else if (val > qjarr[8] && val <= qjarr[9]) {
                                    color = colors[9]
                                } else if (val > qjarr[9] && val <= qjarr[10]) {
                                    color = colors[10]
                                } else if (val > qjarr[10] && val <= qjarr[11]) {
                                    color = colors[11]
                                } else if (val > qjarr[11] && val <= qjarr[12]) {
                                    color = colors[12]
                                } else if (val > qjarr[12] && val <= qjarr[13]) {
                                    color = colors[13]
                                } else if (val > qjarr[13]) {
                                    color = colors[14]
                                }
                                data.itemStyle = {
                                    emphasis: {
                                        areaColor: color,
                                    }
                                }
                            }
                            that.$store.commit("addBuildData", {
                                data: data,
                                type: "wuchang",
                                success: function () {
                                    that.$refs.junView.setData()
                                    if (that.$store.state.data.buildMapData.length == wcBuilds.length) {
                                        console.log("武昌建筑地图初始化完毕")
                                        that.$store.commit('setViewState', 'wcBuild')
                                        //that.$store.state.init.wcBuild = false
                                        //that.allBuildDataSort()
                                    }
                                }
                            })
                        })
                    }

                    var lfBuilds = [199, 200, 202, 201, 204, 218, 217, 205, 221, 212, 220, 206, 209, 207, 208, 214, 213]
                    for (let id of lfBuilds) {
                        request("leakagelndex", "bulid", {
                            buildingid: id,
                            time: time
                        }, function (res) {
                            let data = res.data.data
                            var color = ""
                            if (data) {
                                var val = data.leakageIndex
                                if (val <= qjarr[0]) {
                                    color = colors[1]
                                } else if (val > qjarr[1] && val <= qjarr[2]) {
                                    color = colors[2]
                                } else if (val > qjarr[2] && val <= qjarr[3]) {
                                    color = colors[3]
                                } else if (val > qjarr[3] && val <= qjarr[4]) {
                                    color = colors[4]
                                } else if (val > qjarr[4] && val <= qjarr[5]) {
                                    color = colors[5]
                                } else if (val > qjarr[5] && val <= qjarr[6]) {
                                    color = colors[6]
                                } else if (val > qjarr[6] && val <= qjarr[7]) {
                                    color = colors[7]
                                } else if (val > qjarr[7] && val <= qjarr[8]) {
                                    color = colors[8]
                                } else if (val > qjarr[8] && val <= qjarr[9]) {
                                    color = colors[9]
                                } else if (val > qjarr[9] && val <= qjarr[10]) {
                                    color = colors[10]
                                } else if (val > qjarr[10] && val <= qjarr[11]) {
                                    color = colors[11]
                                } else if (val > qjarr[11] && val <= qjarr[12]) {
                                    color = colors[12]
                                } else if (val > qjarr[12] && val <= qjarr[13]) {
                                    color = colors[13]
                                } else if (val > qjarr[13] && val <= qjarr[14]) {
                                    color = colors[14]
                                } else if (val > qjarr[14] && val <= qjarr[15]) {
                                    color = colors[14]
                                }
                                data.itemStyle = {
                                    emphasis: {
                                        areaColor: color,
                                    }
                                }
                            }
                            that.$store.commit("addBuildData", {
                                data: data,
                                type: "liufang",
                                success: function () {
                                    that.$refs.junView.setData()
                                    if (that.$store.state.data.buildMapData2.length == lfBuilds.length) {
                                        console.log("流芳建筑地图初始化完毕")
                                        that.$store.commit('setViewState', 'lfBuild')
                                        //that.$store.state.init.lfBuild = false
                                        //that.allBuildDataSort()
                                    }
                                }
                            })
                        })
                    }
                })


            },

            //获取全部建筑物数据
            getAllBuildData: function () {
                var time = util.getYesFormatDay()
                var builds = []
                var that = this
                for (let i = 137; i <= 165; i++) {
                    request("leakagelndex", "bulid", {
                        buildingid: i,
                        time: time,
                    }, function (res) {
                        var data = res.data.data
                        builds.push(data)
                        if (builds.length == 112) {
                            that.allBuildDataSort(builds)
                        }
                    })
                }

                for (let i = 169; i <= 177; i++) {
                    request("leakagelndex", "bulid", {
                        buildingid: i,
                        time: time,
                    }, function (res) {
                        var data = res.data.data
                        builds.push(data)
                        if (builds.length == 112) {
                            that.allBuildDataSort(builds)
                        }
                    })
                }

                for (let i = 181; i <= 189; i++) {
                    if (i != 185) {
                        request("leakagelndex", "bulid", {
                            buildingid: i,
                            time: time,
                        }, function (res) {
                            var data = res.data.data
                            builds.push(data)
                            if (builds.length == 112) {
                                that.allBuildDataSort(builds)
                            }
                        })
                    }
                }

                for (let i = 193; i <= 245; i++) {
                    if (i != 194 && i != 210 && i != 211 && i != 224) {
                        request("leakagelndex", "bulid", {
                            buildingid: i,
                            time: time,
                        }, function (res) {
                            var data = res.data.data
                            builds.push(data)
                            if (builds.length == 112) {
                                that.allBuildDataSort(builds)
                            }
                        })
                    }
                }

                for (let i = 250; i <= 269; i++) {
                    if (i != 251 && i != 263 && i != 265) {
                        request("leakagelndex", "bulid", {
                            buildingid: i,
                            time: time,
                        }, function (res) {
                            var data = res.data.data
                            builds.push(data)
                            if (builds.length == 112) {
                                that.allBuildDataSort(builds)
                            }
                        })
                    }
                }
            },

            //排序
            allBuildDataSort: function (builds) {
                var that = this
                console.log("柱状图初始化")
                //判断两个地图是否全部加载完毕
                var arr = builds
                //清洗数据

                for (let i = 0, len = arr.length; i < len; i++) {
                    if (!arr[i] || arr[i] == '' || arr[i] === undefined) {
                        arr.splice(i, 1)
                        len--;
                        i--;
                    }
                }

                arr.sort(function (a, b) {
                    return b.leakageIndex - a.leakageIndex
                })

                arr.splice(10, arr.length - 1)

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
                    item: 'fontSize2',
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
                    margin[b] = max / 10 + 10
                }
                that.$store.commit('setBuildPaiHangData', {
                    tranArr: tranArr,
                    val: val,
                    names: names,
                    max_: max_,
                    margin: margin,
                    success: function () {
                        that.$refs.comp.setData()
                        //that.$store.state.init.buildLtView = false
                        that.$store.commit('setViewState', 'buildLtView')
                        console.log("建筑柱状图初始化完成")
                    }
                })

                //建筑相关漏损指数
                var LbViewData = []
                for (let c = 0; c < 10; c++) {
                    LbViewData[c] = {
                        label: arr[c].name,
                        data: [arr[c].addTotal.toFixed(1), arr[c].addMin.toFixed(1)]
                    }
                }
                that.$store.state.data.ViewData2 = LbViewData
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
