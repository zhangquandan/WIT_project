<template>
    <div id="lbView">
        <el-row style="text-align: center;">
            <el-col :span="24">
                <div style="margin-bottom:0px;" class="top">
                    <img style="width: 50px; height:50px; vertical-align: -4px; margin-right: 5px;" :src="icon"/>
                    <span>{{title}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row v-for="item in val" style="text-align: left; padding-left: 6rem; margin-top: 3rem;">
            <div style="color: white; margin-bottom: 5px;font-size: 2rem;">{{item.title}}</div>
            <div style="color: #5ecef4;margin-bottom: 2px; font-size: 1.75rem;" v-for="it in item.data">
                <span>{{it.label}}</span>
                <span>{{it.val}}</span>
            </div>
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
                default: "栏目标题"
            },


            val: {
                type: Array,
                default: function () {
                    return [{
                        title: "标题1",
                        data: [{
                            label: "标签：",
                            val: "xx吨"
                        },
                            {
                                label: "标签：",
                                val: "xx吨"
                            },
                            {
                                label: "标签：",
                                val: "xx吨"
                            },
                            {
                                label: "标签：",
                                val: "xx吨"
                            },
                            {
                                label: "标签：",
                                val: "xx吨"
                            }
                        ]

                    },
                        {
                            title: "标题1",
                            data: [{
                                label: "标签：",
                                val: "xx吨"
                            },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                }
                            ]
                        },
                        {
                            title: "标题1",
                            data: [{
                                label: "标签：",
                                val: "xx吨"
                            },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                },
                                {
                                    label: "标签：",
                                    val: "xx吨"
                                }
                            ]
                        }
                    ]
                }
            },

        },

        data() {
            return {
                textTop: "",
                textBottom: ""
            }
        },

        mounted() {

        }
    }
</script>

<style scoped>
    .top {
        padding-top: 3rem;
        padding-bottom: 10px;
        background-image: url(../assets/texiao.png);
        background-repeat: no-repeat;
        background-size: 80% 100%;
        background-position: -30px 30px;
        color: white;
        font-size: 2.5rem;
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
        height: 30px;
        line-height: 30px;
        color: #5ecef4;
        font-size: 2rem;
    }

    .val:hover {
        background: linear-gradient(to right, #152242, #1e3959, #152242);
        cursor: pointer;
        color: white;
    }

    .label {
    }
</style>
