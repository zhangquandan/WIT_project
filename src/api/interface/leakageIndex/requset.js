import axios from 'axios'
import qs from 'qs'

let login = true
var api = API

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API.baseUrl
//axios.defaults.baseURL = "/api"
axios.defaults.timeout = 15000
axios.interceptors.response.use(function (response) {
    if (response.data.errCode == 10100 || !localStorage.getItem('token')) {
        if (login) {
            axios({
                url: api.login,
                method: 'post',
                withCredentials: false,
            }).then((response) => {
                console.log(response)
                if (response.data.status == 400) {
                    alert("账号密码错误")
                } else {
                    localStorage.setItem("token", response.data.data)
                    setTimeout(function () {
                        location.reload()
                    }, 3000)
                }

            })
        }
        login = false
    }
    return response

}, function (error) {
    console.log(error)
})

function leakagelndex(url, params, callback) {
    let token = localStorage.getItem("token")
    switch (url) {
        case "login":
            axios({
                url: api.login,
                method: 'post',
                withCredentials: false,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        case "area":
            axios({
                url: api.area,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
                responseType: 'json',
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 获取水表信息
         */
        case "meterInfo":
            axios({
                url: api.meterInfo,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
                responseType: 'json',
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 区域自定义时段每天用水量
         */
        case "CustomTimeDay":
            axios({
                url: api.CustomTimeDay,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
                responseType: 'json',
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 区域自定义时段每月用水量
         */
        case "CustomTimeMonth":
            axios({
                url: api.CustomTimeMonth,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
                responseType: 'json',
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 区域自定义时段每年用水量(分页)
         */
        case "CustomTimeYear":
            axios({
                url: api.CustomTimeYear,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
                responseType: 'json',
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        case "getColor":
            axios({
                url: api.getColor,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 所有区域定额设置信息（可根据区域ID，年度查询，区域类型查询）
         * @param {Object} params :{ waterregionid（非必须), quotayear（非必须）, statisticsType（非必须）（DMA/REGION）}
         * @param {Object} callback
         */
        case "waterregionWaterquotaList":
            //?waterregionid=" + params.waterregionid + "&quotayear=" + params.quotayear
            axios({
                url: api.waterregionWaterquotaList,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 获取每月的用水量
         */
        case "getMwater":
            params.pageNum = 1
            params.pageSize = 100
            params.waterregionid = params.id
            axios({
                url: api.getMwater,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 获取学校信息
         */
        case "getSchoolInfo":
            axios({
                url: api.getSchoolInfo,
                method: 'get',
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;

        /**
         * 区域信息单条查询
         * @param {number} params : id
         * @param {Object} callback
         */
        // case "waterregion":
        // 	axios({
        // 		url: "/wsis/api/waterregion/" + params,
        // 		method: 'get',
        // 		headers: {
        // 			'access_token': token,
        // 		},
        // 		timeout: 15000,
        // 		withCredentials: true,
        // 	}).then((response) => {
        // 		if (callback) {
        // 			callback(response);
        // 		}
        // 	})
        // 	break;

        /**
         * 水表综合漏损指数
         * @param {Object} params :{watermeterid 水表ID, time 时间(yyyy-MM-dd)}
         * @param {Object} callback
         */
        case "waterMeter":
            axios({
                url: api.waterMeter,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;
        /**
         * 建筑综合漏损指数
         * @param {Object} params :{buildingid  建筑ID， time   时间（yyyy-MM-dd）}
         * @param {Object} callback
         */
        case "bulid":
            axios({
                url: api.bulid,
                method: 'get',
                params: params,
                headers: {
                    'access_token': token,
                },
                timeout: 15000,
                withCredentials: true,
            }).then((response) => {
                if (callback) {
                    callback(response);
                }
            })
            break;
    }

}

export {
    leakagelndex
}
