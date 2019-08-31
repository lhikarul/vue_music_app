import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './views/recommend/Recommend';
import Singer from './views/singer/Singer';
import Rank from './views/rank/Rank';
import Search from './views/search/Search';

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
            component: Recommend
        },
        {
            path: '/singer',
            name: 'singer',
            component: Singer
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        }
    ]
})