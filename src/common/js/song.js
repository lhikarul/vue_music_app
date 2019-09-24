import {getLyric} from 'api/song';
import {ERR_OK} from 'api/config';
import {Base64} from 'js-base64';

export default class Song {
    constructor({id,mid,singer,name,album,duration,image,url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }

    getLyric () {
        
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve,reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric);
                    resolve(this.lyric)
                }
                else {
                    reject('no lyric')
                }
            })
        })


    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003NGKTc2tabpb.m4a?guid=7791912279&vkey=BF324E1CA5001F8D0FF472F7246B8AED1E9B0670796F02D70D1C3164C78A3EB8F974DCAA09695AA1328876D3618320264FBC193C6CEE8847&uin=0&fromtag=38'
    })
}

export function filterSinger(singer) {

    var ret = [];
    if (!singer) return '';

    singer.forEach((item) => {
        ret.push(item.name);
    })

    return ret.join('/');

}