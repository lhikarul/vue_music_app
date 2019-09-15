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
        url: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003NGKTc2tabpb.m4a?guid=1468769492&vkey=45480A06DFA1382924049DDC28FF835B4FC7EA788AE899DB32489A935046E3C2CD068EB6E657CF1179C743B6B2C106C13E13ED4DA66C149B&uin=0&fromtag=38'
    })
}

function filterSinger(singer) {

    var ret = [];
    if (!singer) return '';

    singer.forEach((item) => {
        ret.push(item.name);
    })

    return ret.join('/');

}