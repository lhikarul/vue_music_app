import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';
import axios from 'axios';

export function getHotKey() {

    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    });

    return jsonp(url, data, options);
}

export function search(query, page, zhida, perpage) {
    // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

    const url = 'api/search';

    const data = Object.assign({}, commonParams, {
        // w: query,
        // p: page,
        // catZhida: zhida ? 1 : 0,
        // zhidaqu: 1,
        // t: 0,
        // flag: 1,
        // ie: 'utf-8',
        // sem: 1,
        // aggr: 0,
        // perpage: perpage,
        // n: perpage,
        // remoteplace: 'txt.mgg.all',
        // uid: 0,
        // needNewCode: 1,
        // platform: 'h5'
        g_tk: 1928093487,
        inCharset: "utf-8",
        outCharset: 'utf-8',
        notice: 0,
        format: 'json',
        w: query,
        p: page,
        // perpage: 20,
        perpage,
        // n: 20,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
    });
    // return jsonp(url, data, options);
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}