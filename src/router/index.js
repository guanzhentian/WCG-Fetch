import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import setSpider from '@/components/setSpider'
import getData from '@/components/getData'
import anlysis from '@/components/anlysis'
import about from '@/components/about'
import management from '@/components/management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
        path:'/setSpider',
        name:'setSpider',
        component:setSpider
    },
    {
      path:"/getData",
      name:'getData',
      component:getData
    },
    {
      path:'/anlysis',
      name:'anlysis',
      component:anlysis
    },
    {
      path:'/about',
      name:'about',
      component:about
    },
    {
      path:'/management',
      name:'management',
      component:management
    }
  ]
})
