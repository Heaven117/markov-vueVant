// api 的配置变量
import apiConfig from '../config/http.js';
import instance from '../util/http.js';

// 创建组织时获取组织类型
export const getTeamTypeListOption = function (){
    return new Promise((resolve,reject)=>{
        instance.get(`${apiConfig.apiVersions}/team/getTeamTypes`)
            .then(res =>{
                resolve(res.data)
            })
            .catch(err =>{reject(err)})
    })
}

//创建组织
export const insertTeam = function (params) {
    return new Promise((resolve) => {
        instance({
            method: "post",
            url: `${apiConfig.apiVersions}/team/insert`,
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify(params)
        }).then(res => {
            resolve(res);
        })
    })
}

// 获取组织列表
export const getOrganizationList = function () {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/list`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//查看组织申请列表
export const getTeamJoiningRequest = function (teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/leaders/checkRequest/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//通过组织申请
export const acknowledgeTeamJoiningRequest = function (teamMemberId,teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/leaders/acknowledge/${teamMemberId}/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//拒绝组织申请
export const refuseTeamJoiningRequest = function (teamMemberId,teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/leaders/refuse/${teamMemberId}/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//修改成员等级
export const alterTeamMemberLevel = function (newLevel,userId,teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/leader/${newLevel}/${userId}/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

// 获取组织详情
export const getOrganizationDetail = function (teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/detail/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//用户申请加入组织
export const requestJoiningOrganization = function (teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/user/join/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//退出组织、踢出组织成员
export const quitOrganization = function (teamMemberId,teamId) {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/user/quit/${teamMemberId}/${teamId}`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//获取用户参与的组织列表-全部
export const getUserOrganizationALl = function () {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/list/joined/all`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//获取用户参与的组织列表-已通过
export const getUserOrganizationInvolved = function () {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/list/joined/involved`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//获取用户参与的组织列表-审核中
export const getUserOrganizationApplying = function () {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/list/joined/applying`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}

//获取用户参与的组织列表-未通过
export const getUserOrganizationRefused = function () {
    return new Promise((resolve, reject) => {
        instance.get(`${apiConfig.apiVersions}/team/list/joined/refused`).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err);
        })
    })
}


