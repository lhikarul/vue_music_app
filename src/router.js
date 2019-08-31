import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recommend from './views/Recommend.vue'
import Singer from './views/Singer.vue'
import SingerDetail from 'components/singer-detail/SingerDetail'
import Rank from './views/Rank.vue'
import Search from './views/Search.vue'

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
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'SingerDetail',
          component: SingerDetail
        }
      ]
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
