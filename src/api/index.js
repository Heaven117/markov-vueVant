// api 的配置变量
import apiConfig from '../config/http.js';
import instance from '../util/http.js';

//前后端接口名统一
export const reanameJson = function (data, berName, aftName) {
    let val;
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            val = data[i][berName];
            data[i][aftName] = val;
        }
    } else {
        val = data[berName];
        data[aftName] = val;
    }
}
