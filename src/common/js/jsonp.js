import originJSONP from 'jsonp';

export default function jsonp(url,data,option) {

    url += (url.indexOf('?') == -1 ? '?' : '&') + param(data);
    
    // url => https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1

    return new Promise((resolve,reject) => {
        originJSONP(url,option,(err,data) => {
            if (!err) {
                resolve(data);
            }else {
                reject(err);
            }
        })
    })

}

function param (data) {

    var url = '';

    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;

    }
    
    // 拼湊出的 query url 
    // &g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1

    return url ? url.substring(1) : '';

}