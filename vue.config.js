const path    = require('path');
const express = require('express');
const axios   = require('axios');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('base', resolve('src/base'))
    },
    devServer: {
        before(app) {
            app.get('/api/getRecommendSongsList', function(req,res){
                const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data);
                }).catch((e) => {
                    console.log('geList error ',e);
                })
            })

            app.get('/api/lyric', function(req,res) {
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';

                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    
                    var ret = response.data
                    if (typeof ret === 'string') {
                        var reg = /^\w+\(({[^()]+})\)$/
                        var matches = ret.match(reg)
                        if (matches) {
                            ret = JSON.parse(matches[1])
                        }
                    }
                    res.json(ret)

                }).catch((e) => {
                    console.log(e)
                })
            })

            app.get('/api/recommendSong', function (req, res) {
                var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                    axios.get(url, {
                        headers: {
                            referer: 'https://c.y.qq.com/',
                            host: 'c.y.qq.com'
                        },
                    params: req.query
                    }).then((response) => {
                    var ret = response.data
                        if (typeof ret === 'string') {
                            var reg = /^\w+\(({[^()]+})\)$/
                            var matches = ret.match(reg)
                            if (matches) {
                            ret = JSON.parse(matches[1])
                            }
                        }
                        res.json(ret)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
        }
    }
}