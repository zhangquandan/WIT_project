<template>
    <div id="rtView">
        <el-row style="text-align: center;">
            <el-col :span="24">
                <div style="font-size: 2.5rem; margin-bottom: -10px;" class="top">
                    <img style="width: 50px; height: 50px; vertical-align: -4px; margin-right: 5px;" :src="icon"/>
                    <span>{{title}}</span>
                </div>
            </el-col>
        </el-row>
        <div class="valCont">
            <el-row v-for="(item,index) in val" class="row">
                <div :style="{'background-color':colors[index]}" class="icon"></div>
                <span>{{item.label}}</span>
                <span class="val">{{item.val}}</span>
            </el-row>
        </div>
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
                    return [
                        {
                            label: "占地面积：",
                            val: "xxxm"
                        },
                        {
                            label: "建筑面积：",
                            val: "xxxm"
                        },
                        {
                            label: "学生人数：",
                            val: "xxxm"
                        },
                        {
                            label: "教职工人数：",
                            val: "xxxm"
                        },
                    ]
                }
            }

        },

        data() {
            return {
                colors: ["#1fb233", "#fffc03", "#ee0453", "#47fcc7"]
            }
        },

        mounted() {
        }
    }
</script>

<style>
    #rtView {
        text-align: center;
        padding-top: 70px;
    }

    #rtView .row {
        text-align: left;
        color: white;
        font-size: 2rem;
        margin-bottom: 5px;
        margin-top: 40px;
    }

    #rtView .row .val {
        color: #5ecef4;
        font-size: 2rem;
    }

    #rtView .icon {
        height: 20px;
        width: 20px;
        display: inline-block;
        border-radius: 45px;
        vertical-align: 0px;
        margin-right: 5px;
    }


    #rtView .valCont {
        display: inline-block;
        margin-top: 55px;
    }


</style>
