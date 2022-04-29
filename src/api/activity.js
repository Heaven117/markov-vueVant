import instance from "../util/http";
import apiConfig from '../config/http.js';


//创建志愿
export const insertActivity = function (params) {
    return new Promise((resolve, reject) => {
        params.userId = JSON.parse(window.localStorage.getItem('userMsg')).userId;
        var formData = new FormData();
        formData.append('photos', params.imgList);

        instance({
            method: "post",
            url: `${apiConfig.apiVersions}/activity/insert/${params.teamId}`,
            headers: {
                'Content-type': 'application/json',
                'photos': formData
            },
            data: params
        }).then(res => {
            resolve(res);
        }).catch( err =>{
            reject(err)
        })
    })
}
