// 在此绘制散点图
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        init: {
            cbView: true, //DMA界面条形统计图
            dmaMapView: true, //DMA界面地图
            dmaltView: true, //DMA界面排行榜组件
            dmalbView: true, //DMA界面DMA关键漏损指标

            meterInf: true, //水表在线详情
            lfBuild: true, //流芳建筑地图
            wcBuild: true, //武昌建筑地图
            buildLtView: true, //建筑柱状图
            meterlbView: true, //水表顶部柱状图
            sdLf: true, //流芳散点图
            sdWc: true, //武昌散点图
            zhWc: true, //武昌综合地图
            zhLf: true, //流芳综合地图
        },

        config: {
            fontSize: 9.5, //水表
            fontSize2: 9.5 //建筑
        },

        data: {
            skData: [], //色卡值

            //折线图数据
            zx: {
                de: [], //每月用水定额
                ysl: [], //每月用水量
                jsl: [], //每月节水量
                bnde: 0, //本年定额
                ylj: 0, //已累计
                yyjs: 0, //以用节水
                yyjsl: 0, //已用节水率
            },

            //学校信息
            sc: [{
                label: "占地面积：",
                val: "加载中"
            },
                {
                    label: "建筑面积：",
                    val: "加载中"
                },
                {
                    label: "学生人数：",
                    val: "加载中"
                },
                {
                    label: "教职工人数：",
                    val: "加载中"
                },
            ],

            //校区用水漏损概况
            gk: [{
                title: "全校区",
                data: [{
                    label: "综合测漏指数：",
                    val: "加载中"
                },
                    {
                        label: "日用量隔周增量：",
                        val: "加载中"
                    },
                    {
                        label: "日用量隔周增幅：",
                        val: "加载中"
                    },
                    {
                        label: "日最小量隔周增量：",
                        val: "加载中"
                    },
                    {
                        label: "日最小量隔周增幅：",
                        val: "加载中"
                    },
                ]
            },
                {
                    title: "武昌区",
                    data: [{
                        label: "综合测漏指数：",
                        val: "加载中"
                    },
                        {
                            label: "日用量隔周增量：",
                            val: "加载中"
                        },
                        {
                            label: "日用量隔周增幅：",
                            val: "加载中"
                        },
                        {
                            label: "日最小量隔周增量：",
                            val: "加载中"
                        },
                        {
                            label: "日最小量隔周增幅：",
                            val: "加载中"
                        },
                    ]
                },
                {
                    title: "流芳区",
                    data: [{
                        label: "综合测漏指数：",
                        val: "加载中"
                    },
                        {
                            label: "日用量隔周增量：",
                            val: "加载中"
                        },
                        {
                            label: "日用量隔周增幅：",
                            val: "加载中"
                        },
                        {
                            label: "日最小量隔周增量：",
                            val: "加载中"
                        },
                        {
                            label: "日最小量隔周增幅：",
                            val: "加载中"
                        },
                    ]
                },


            ],

            //DMA关键漏损指标
            ViewData: [{
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            },],

            //建筑关键漏损指标
            ViewData2: [{
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            },],

            //水表关键漏损指标
            ViewData3: [{
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            }, {
                label: "加载中",
                data: ["加载中", "加载中"]
            },],

            //总体用水指标
            indicator: [{
                label: "昨日总量(T)",
                data: ["加载中", "加载中", "加载中"]
            }, {
                label: "本月已用(T)",
                data: ["加载中", "加载中", "加载中"]
            }, {
                label: "本年已用(T)",
                data: ["加载中", "加载中", "加载中"]
            }, {
                label: "生均单耗(L/P.D)",
                data: ["加载中", "加载中", "加载中"]
            }, {
                label: "建筑单耗(L/㎡.D)",
                data: ["加载中", "加载中", "加载中"]
            }, {
                label: "已用节水率(%)",
                data: ["加载中", "加载中", "加载中"]
            },],

            frameLf: [
                ['流芳-体育场东总表', 114.4431581, 30.467628],
                ['东进生活常压A01', 114.4416418, 30.46699467],
                ['2教学楼生活（南）', 114.4414076, 30.46773479],
                ['3教学楼生活（南）', 114.4413014, 30.4686711],
                ['3教学楼消防（北）', 114.4412632, 30.46898398],
                ['4B实验楼消防（东）', 114.4409198, 30.46980477],
                ['4B实验楼生活（西）', 114.4402229, 30.46971632],
                ['4A实验楼生活-1（东）', 114.4387699, 30.46940038],
                ['4A实验楼生活-2（西）', 114.4387488, 30.46939635],
                ['4A实验楼消防-1（西）', 114.4387458, 30.46940554],
                ['4A实验楼消防-2（东）', 114.4387233, 30.46940313],
                ['3实验楼生活（北）', 114.4381681, 30.46874995],
                ['3实验楼消防（南）', 114.4381697, 30.46875783],
                ['铸造车间', 114.4372463, 30.46825298],
                ['东进生活常压A02', 114.441645, 30.46697544],
                ['1教学楼消防（东）', 114.4415204, 30.46686072],
                ['1教学楼生活（西）', 114.4415209, 30.4668534],
                ['图书馆生活加压（南）', 114.4391983, 30.46672099],
                ['图书馆生活常压（北）', 114.4391988, 30.4667172],
                ['1实验楼消防（南）', 114.4390702, 30.46700038],
                ['1实验楼生活（南）', 114.4388132, 30.46725152],
                ['1实验楼生活（北）', 114.4388083, 30.46726151],
                ['2实验楼消防（南）', 114.4385536, 30.46746796],
                ['2实验楼生活（南）', 114.4383447, 30.46783068],
                ['2实验楼生活（北）', 114.4383518, 30.46784106],
                ['2实验楼消防（北）', 114.4381241, 30.46806416],
                ['大礼堂消防（东北）', 114.4387017, 30.4661765],
                ['大礼堂消防（东南）', 114.439101, 30.46581484],
                ['大礼堂生活（东南）', 114.4391002, 30.46581022],
                ['钟楼消防（东）', 114.4405654, 30.46528915],
                ['钟楼生活（西）', 114.4405613, 30.46529561],
                ['钟楼游泳馆水表', 114.4401122, 30.46415514],
                ['外环生活常压', 114.4413752, 30.46992034],
                ['机电大楼生活（东）', 114.4401117, 30.47073705],
                ['4教学楼生活（北）', 114.438205, 30.47047778],
                ['外环生活加压', 114.441376, 30.46991384],
                ['外环消防', 114.4413806, 30.46991091],
                ['机电大楼消防（西）', 114.4401152, 30.47073493],
                ['4教学楼消防（南）', 114.4382071, 30.47046994],
                ['宿舍生活（西）', 114.4360525, 30.46805738],
                ['宿舍消防（东）', 114.4360541, 30.4680612],
                ['一教辅北', 114.4360346, 30.46804855],
                ['嘉庭苑', 114.4364421, 30.46793517],
                ['中快食堂', 114.4366673, 30.46796433],
                ['保卫处及运动场', 114.4418456, 30.46690695],
                ['流芳-校医院总表', 114.4376784, 30.4659546],
                ['流芳-西北区总表', 114.4330028, 30.46840878],
                ['流芳-大化工总表', 114.4325952, 30.46887607],
                // ['流芳-加星耐火总表', 114.4428532, 30.46253397],
                ['中快餐厅东生活常压',114.437368743641,30.4680658662701],
                ['中快餐厅东生活加压',114.437369546883,30.4680520372313],
                ['中快餐厅东消防',114.43737062087,30.4680384821203],
                ['机电大楼绿化',114.44021040059,30.4707336051134],
                ['机电大楼加压',114.440134128236,30.4707126282762],
                ['1教学楼绿化',114.441595228521,30.466843494639],
                ['1实验楼绿化',114.438782064117,30.4672794024862],
                ['4A实验楼绿化',114.438761781986,30.4694537372666],

            ],

            frameWc: [
                ['武昌-南大门总表', 114.3972027, 30.50529385],
                ['学生宿舍7栋篮球场边', 114.3961279, 30.50624501],
                ['学生宿舍3、4栋', 114.3956234, 30.50696267],
                ['学生二食堂', 114.3964509, 30.50737545],
                ['行政楼', 114.3964311, 30.50582069],
                ['学生宿舍7栋南', 114.3962325, 30.50607981],
                ['学生宿舍7栋北', 114.396274, 30.50624565],
                ['武昌-北门总表', 114.3962877, 30.51070337],
                ['北泵房出水', 114.396153, 30.51062086],
                ['老二教', 114.3959532, 30.51059568],
                ['孵化楼', 114.3966813, 30.51057126],
                ['综合楼', 114.3969239, 30.51056177],
                ['实验楼西北（西配楼）', 114.3958931, 30.50988136],
                ['实验楼西南', 114.3963704, 30.50928819],
                ['实验楼正南', 114.3959596, 30.50929011],
                ['一教学楼西北', 114.3956278, 30.50903261],
                ['一教学楼东北', 114.3970528, 30.50900686],
                ['学生宿舍1、2栋', 114.3955918, 30.5089619],
                ['学生宿舍8、9栋', 114.397108, 30.50795026],
                ['实验楼西北', 114.3959364, 30.50981466],
                ['实验楼东北（东配楼）', 114.3967454, 30.50986449],
                ['实验楼东北', 114.3966707, 30.50981835],
                ['武昌-孵化楼总表', 114.3963033, 30.51070363],
                ['武昌-西门点总表', 114.3963013, 30.51070529],
                ['武昌-家属区总表', 114.3988727, 30.51044157],
                ['西配楼北',114.395724894216,30.5098838205311],
                ['西配楼南',114.395734507676,30.5092884314599],
                ['学生宿舍5、6栋',114.395212614805,30.5068066822469],
                ['学生一食堂东',114.396305986271,30.5070239955875],
                ['学生一食堂北',114.395985868861,30.5073593511476],
                ['学生宿舍6栋东南绿化',114.397086129386,30.506550186383],
                ['井泵房旁绿化',114.397111575147,30.5079889878017],
                ['东配楼西南绿化',114.396959963034,30.509251600457],

            ],

            weterMapData: [], //水表地图数据

            qyMapData: [], //DMA界面地图数据
            dmaLtViewData: [], //DMA界面排行榜数据
            //DMA界面 DMA关键漏损指标
            dmaLbViewData: {
                lineData: [], //条形长度数据
                textData: [], //显示的文字
                name: [],
                max: [], //统计图最大值
                margin: [] //距离圆点的距离，标准为最大值的1/10
            },

            //建筑界面柱状图
            buildLbViewData: {
                lineData: [], //条形长度数据
                textData: [], //显示的文字
                name: [],
                max: [], //统计图最大值
                margin: [] //距离圆点的距离，标准为最大值的1/10
            },

            buildMapData: [], //武昌建筑界面地图数据
            buildMapData2: [], //流芳建筑界面地图数据

            meterInf: {
                total: 0, //总数
                inline: 0, //在线
                offline: 0 //掉线
            },

            weterMapData: [], //水表数据
            //建筑界面柱状图
            weterLbViewData: {
                lineData: [], //条形长度数据
                textData: [], //显示的文字
                name: [],
                max: [], //统计图最大值
                margin: [] //距离圆点的距离，标准为最大值的1/10
            },

            //综合地图
            zhMapData: {
                wc: {},
                lf: {}
            }
        }
    },

    mutations: {

        setZhMapData: function (state, args) {
            if (args.type == "wc") {
                state.data.zhMapData.wc = args.val
            } else if (args.type == "lf") {
                state.data.zhMapData.lf = args.val
            }
            if (args.success) {
                args.success()
            }

        },

        setMaterMapData: function (state, args) {
            if (args.type == "wuchang") {
                try {
                    state.data.frameWc[args.index][3] = args.data
                } catch {
                    console.log(state.data.frameWc[args.index])
                }
            } else if (args.type == "liufang") {
                state.data.frameLf[args.index][3] = args.data
            }
            if (args.success) {
                args.success()
            }

        },

        setViewState: function (state, args) {
            state.init[args] = false
            console.log(state.init)
        },

        setFontSize: function (state, args) {
            state.config[args.item] = args.val
        },

        setMeterInf: function (state, args) {
            state.data.meterInf = args
            state.init.meterInf = false
            args.success()
        },

        setData: function (state, args) {
            state.data.zx.de = args.de
            state.data.zx.ysl = args.ysl
            state.data.zx.jsl = args.jsl
            state.data.zx.bnde = args.bnde
            state.data.zx.ylj = args.ylj
            state.data.zx.yyjs = args.yyjs
            state.data.zx.yyjsl = args.yyjsl
            args.success()
        },

        setBuildPaiHangData: function (state, args) {
            state.data.buildLbViewData.lineData = args.tranArr
            state.data.buildLbViewData.textData = args.val
            state.data.buildLbViewData.name = args.names
            state.data.buildLbViewData.max = args.max_
            state.data.buildLbViewData.margin = args.margin
            args.success()
        },

        setWeterPaiHangData: function (state, args) {
            state.data.weterLbViewData.lineData = args.tranArr
            state.data.weterLbViewData.textData = args.val
            state.data.weterLbViewData.name = args.names
            state.data.weterLbViewData.max = args.max_
            state.data.weterLbViewData.margin = args.margin
            args.success()
        },

        setDmaPaiHangData: function (state, args) {
            state.data.dmaLbViewData.lineData = args.tranArr
            state.data.dmaLbViewData.textData = args.val
            state.data.dmaLbViewData.name = args.names
            state.data.dmaLbViewData.max = args.max_
            state.data.dmaLbViewData.margin = args.margin
            args.success()
        },

        setZbData: function (state, args) {
            state.data.indicator[3].data = args
        },

        addBuildData: function (state, args) {
            if (args.type == "wuchang") {
                state.data.buildMapData.push(args.data)
            } else if (args.type == "liufang") {
                state.data.buildMapData2.push(args.data)
            }
            args.success()
        },

        //更新总体用水指标数据
        setZhData: function (state, args) {
            state.data.indicator[args.line].data[args.index] = args.data
            state.data.indicator.push({}) //用于更新界面
            state.data.indicator.pop()
            if (args.success) {
                args.success(state.data.indicator)
            }

        },

        addWaterData: function (state, args) {
            state.data.weterMapData.push(args.data)
            args.success()
        }
    },


})
