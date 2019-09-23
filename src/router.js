import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend/Recommend';
import Singer from './views/singer/Singer';
import Rank from './views/rank/Rank';
import Search from './views/search/Search';
import SingerDetail from './components/singer-detail/singerDetail';
import Disc from 'components/disc/disc';
import TopList from 'components/top-list/top-list';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    name: Disc,
                    component: Disc
                }
            ]
        },
        {
            path: '/singer',
            name: 'singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    name: 'singerDetail',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    name: 'TopList',
                    component: TopList
                }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        }
    ]
})