// api 的配置变量
import apiConfig from '../config/http.js';
import instance from '../util/http.js';
import {reanameJson} from "@/api/index";


//获取微测试题库
export const getMiniTestList = function () {
    return new Promise((resolve) => {
        instance.get(`${apiConfig.apiVersions}/test/dbs`, { params: { 'userId': JSON.parse(window.localStorage.getItem('userMsg')).userId } }).then(res => {
            let data = res.data.data
            reanameJson(data, "baseName", "title")
            reanameJson(data, "finishNum", "people_num")
            resolve(data)
        })
    })
}
//获取我的微测试题库
export const getMyMiniTestList = function () {
    return new Promise((resolve) => {
        instance.get(`${apiConfig.apiVersions}/test/records`).then(res => {
            let data = res.data.data
            reanameJson(data, "baseName", "title")
            reanameJson(data, "finishNum", "people_num")
            resolve(data)
        })
    })
}
//获取测试题目信息
export const getTestDetail = function (dbId) {
    return new Promise((resolve) => {
        instance.get(`${apiConfig.apiVersions}/test/dbs/${dbId}/test`).then(res => {
            let data = res.data.data
            resolve(data)
        })
    })
}

//获取学习题目信息
export const getStudyDetail = function (dbId) {
    return new Promise((resolve) => {
        instance.get(`${apiConfig.apiVersions}/test/dbs/${dbId}/study`).then(res => {
            let data = res.data.data
            resolve(data)
        })
    })
}

//上传做题记录
export const submitMiniTest = function (dbId, uploadData) {
    return new Promise((resolve) => {
        instance({
            method: "post",
            url: `${apiConfig.apiVersions}/test/submit/${dbId}`,
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(uploadData)
        }).then(res => {
            resolve(res.data.data);
        })
    })
}
//根据recordId获取用户答案
export const getUserAnswerByRecordId = function (recordId) {
    return new Promise((resolve) => {
        instance.get(`${apiConfig.apiVersions}/test/records/${recordId}`).then(res => {
            let data = res.data.data
            resolve(data)
        })
    })
}
