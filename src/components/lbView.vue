<template>
    <div id="lbView">
        <el-row style="text-align: center; font-size: 2.5rem;">
            <el-col :span="24">
                <div class="top">
                    <img style="width: 50px; height: 50px; vertical-align: -4px; margin-right: 5px;" :src="icon"/>
                    <span>{{title}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="this.gutter" class="title" style="margin-left: 0;margin-right: 0;"
                :style="{'padding-left':left,'text-align':fontStyle,'padding-right':right,}">
            <el-col :style="{'paddingRight':titleRight}" v-for="(item,index) in label" :span="item.wid">
                <div :style="{'padding-left':(index==0? fristTitleLeft : '')}" v-if="item.aLine">{{item.text}}</div>
                <div style="display: inline-block;" v-else>
                    <div style="width: 98px;" class="texttop">{{text[index].textTop}}</div>
                    <div style="width: 100px; text-align-last: justify;">{{text[index].textBottom}}</div>
                </div>
            </el-col>
        </el-row>

        <el-row class="val" v-for="item in val"
                :style="{ 'margin-right':right, 'margin-bottom': space + 'px','textAlign' : fontStyle,'padding-left':left,'margin-top':top}">
            <el-col :style="{'paddingRight':titleRight}" :span="labellength">
                <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{item.label}}</div>
            </el-col>
            <el-col :style="{'paddingRight':valRight}" v-for="val in item.data" :span="valLenght">
                <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{val}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'lbView',

        props: {
            icon: {
                type: String,
                required: true,
                default: "../../dist/favicon.ico"
            },
            title: {
                type: String,
                required: true,
                default: "栏目标题",
            },

            fristTitleLeft: {
                type: String,
                default: "0px"
            },

            space: {
                type: Number,
                default: 0
            },

            gutter: {
                type: Number,
                default: 0
            },

            fontStyle: {
                type: String,
                default: "center"
            },

            titleRight: {
                type: String,
                default: "0px"
            },

            valRight: {
                type: String,
                default: "0px"
            },

            left: {
                type: String,
                default: "0px"
            },

            right: {
                type: String,
                default: "0px"
            },

            top: {
                type: String,
                default: "0px"
            },

            labellength: {
                type: Number,
                default: 8
            },

            valLenght: {
                type: Number,
                default: 8
            },


            label: {
                type: Array,
                default: function () {
                    return [{
                        text: "标题1",
                        aLine: true,
                        wid: 8
                    },
                        {
                            text: "标题2",
                            aLine: true,
                            wid: 8
                        },
                        {
                            text: "标题3",
                            aLine: true,
                            wid: 8
                        }
                    ]
                }
            },

            val: {
                type: Array,
                default: function () {
                    return [{
                        label: "A01",
                        data: ["xx吨", "xx吨"]
                    },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                        {
                            label: "A01",
                            data: ["xx吨", "xx吨"]
                        },
                    ]
                }
            }

        },

        data() {
            return {
                text: [
                    {
                        textTop: "",
                        textBottom: "",
                    },
                    {
                        textTop: "",
                        textBottom: "",
                    },
                    {
                        textTop: "",
                        textBottom: "",
                    },
                ],
                valSpan: ""
            }
        },

        mounted() {
            var that = this
            for (let i = 0; i < this.label.length; i++) {
                if (!this.label[i].aLine) {
                    var len = this.label[i].text.length / 2
                    that.$data.text[i].textTop = this.label[i].text.substr(0, len)
                    that.$data.text[i].textBottom = this.label[i].text.substr(len, len * 2)
                }
            }
        }
    }
</script>

<style>
    #lbView {
    }

    .top {
        padding-top: 10px;
        padding-bottom: 10px;
        background-image: url(../assets/texiao.png);
        background-repeat: no-repeat;
        background-size: 80% 100%;
        background-position: -10px 10px;
        color: white;
        margin-bottom: 30px;
    }

    .title {
        padding-top: 30px;
        padding-bottom: 30px;
        background-image: url(../assets/titilebg.png);
        background-size: 100% 100%;
        color: #c9d2db;
        font-size: 1.5rem;
        margin-bottom: 10px;
        justify-content: center; /*子元素水平居中*/
        align-items: center; /*子元素垂直居中*/
        display: -webkit-flex;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .val {
        height: 60px;
        line-height: 60px;
        color: #5ecef4;
        font-size: 1.5rem;
    }

    .val:hover {
        background: linear-gradient(to right, rgb(21, 34, 66, 0.1), rgb(30, 57, 89, 1), rgb(21, 34, 66, 0.1));
        cursor: pointer;
        color: white;
    }

    .texttop {
        text-align: justify;
        height: 14px;
        line-height: 14px;
        width: 80%;
    }

    .texttop::after {
        content: "";
        display: inline-block;
        width: 100%;
    }

</style>
