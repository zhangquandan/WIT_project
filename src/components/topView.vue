<!--顶部导航栏-->
<template>
    <div id="header">
        <div class="column" style="padding-top: 14px;">
            <!-- <img src="../static/images/logo.png" /> -->
            <img src="../static/images/logo2.png"/>
            <div style="display: inline-block; vertical-align: 44px;">
                <div style="color: #33ccff; font-size: 2.6rem; font-weight: 600; width: 280px; text-align-last: justify;">
                    武汉工程大学
                </div>
                <div style="color: #33ccff; font-size: 2.1rem; width: 280px; text-align-last: justify;">智慧节水管控平台</div>
            </div>
        </div>
        <div class="column">
            <div id="nav">
                <div class="navs">
                    <router-link to="/" :style="{'color': ($route.path == '/' ?'white':'#33ccff')}">校区管控</router-link>
                </div>
                <div class="navs">
                    <router-link to="/Home" :style="{'color': ($route.path == '/Home' ?'white':'#33ccff')}">DMA管控
                    </router-link>
                </div>
                <div class="navs">
                    <router-link to="/jianzhu" :style="{'color': ($route.path == '/jianzhu' ?'white':'#33ccff')}">建筑管控
                    </router-link>
                </div>
                <div class="navs">
                    <router-link to="/shuibiao" :style="{'color': ($route.path == '/shuibiao' ?'white':'#33ccff')}">
                        水表管控
                    </router-link>
                </div>
            </div>
        </div>
        <div class="column">
            <div id="User">
                <div id="hy"></div>
                <div id="back" @click="goBack"> 返回首页</div>
            </div>
            <div class="time">
                <div>
                    {{year}}
                    <span style="font-size: 2.8rem;font-weight: 600; vertical-align: 4px;">年</span>
                    {{month}}
                    <span style="font-size: 2.8rem;font-weight: 600; vertical-align: 4px;">月</span>
                    {{day}}
                    <span style="font-size: 2.8rem;font-weight: 600; vertical-align: 4px;">日</span>
                </div>
                <div style="position: relative;">
                    <span style="position: absolute; left: 17px; width: 80px; display: inline-block;">{{hour}} :</span>
                    <span style="position: absolute; left: 98px; width: 80px; display: inline-block;">{{minute}} :</span>
                    <span style="position: absolute; left: 159px; width: 80px; display: inline-block;">{{second}}</span>
                    <span style="position: absolute; left: 217px; width: 200px; display: inline-block; font-size: 2.8rem;font-weight: 600;">{{week}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'topView',
        data() {
            return {
                timer: "", //定义一个定时器的变量
                currentTime: "", // 获取当前时间
                year: "",
                month: "",
                day: "",
                hour: "",
                minute: "",
                second: "",
                week: ""
            }
        },

        mounted() {
            this.setTime()
        },


        methods: {
            //返回首页
            goBack: function () {
                //this.$router.push({path:'/'})
                //返回程序外的页面
                window.location.href = API.HomeUrl
            },

            //实时时间
            setTime: function () {
                var _this = this;
                var date;
                var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
                this.timer = setInterval(function () {
                    date = new Date()
                    _this.year = _this.appendZer(date.getFullYear())
                    _this.month = (_this.appendZer(date.getMonth() + 1))
                    _this.day = _this.appendZer(date.getDate())
                    _this.hour = _this.appendZer(date.getHours())
                    _this.minute = _this.appendZer(date.getMinutes())
                    _this.second = _this.appendZer(date.getSeconds());
                    _this.week = weeks[date.getDay()];
                }, 1000);
            },

            //过滤加0
            appendZer: function (obj) {
                if (obj < 10) {
                    return "0" + obj;
                } else {
                    return obj;
                }
            },
        }
    }
</script>

<style>
    #header {
        display: flex;
        min-width: 3840px;
        max-width: 3840px;
        background-image: url(../assets/imgs/top.png);
        background-size: 74% 100%;
        background-repeat: no-repeat;
        background-position: 480px 0px;
        height: 185px;
    }

    #header .column {
        flex: 3;
    }

    #header .column img {
        width: 130px;
        margin: 20px;
        margin-left: 180px;
    }

    #nav {
        width: 100%;
        height: 5rem;
        box-sizing: border-box;
        padding: 1.5625rem 1.25rem 0;
        padding-right: 4.4rem;
        margin-top: 60px;
    }

    .navs {
        width: 25%;
        text-align: center;
        float: left;
        font-size: 2.2rem;
    }

    .navs a {
        text-decoration: none;
        color: #33ccff;
    }

    .navs a:hover {
        color: white;
    }

    #User {
        width: 100%;
        height: 5rem;
        padding: 7rem 8% 0 30%;
        box-sizing: border-box;
    }

    #hy {
        width: 60%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        float: left;
        color: #F0F8FF;
        font-size: 1.6rem;
    }

    #back {
        width: 40%;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        float: left;
        color: #F0F8FF;
        font-size: 1.6rem;
        cursor: pointer;
    }

    .time {
        width: 26rem;
        text-align: right;
        color: #F0F8FF;
        font-size: 3.5rem;
        position: relative;
        top: -83px;
        right: -30rem;
        font-family: 'UnidreamLED';
    }


    @font-face {
        font-family: 'UnidreamLED';
        src: url(../static/fontFamily/UnidreamLED.woff); /***兼容ie9***/
        src: url(../static/fontFamily/UnidreamLED.woff?#iefix) format('embedded-opentype'), /***兼容ie6-ie8***/ url('../static/fontFamily/UnidreamLED.woff') format('woff'),
        local('UnidreamLED'), url("../static/fontFamily/UnidreamLED.woff");/***默认使用本地的***/
    }
</style>
