import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import setSpider from '@/components/setSpider'
import getData from '@/components/getData'
import anlysis from '@/components/anlysis'
import Process from '@/components/Analysis/process'
import bar from '@/components/Analysis/bar'
import kind from '@/components/Analysis/kind'
import c2048 from '@/components/Analysis/c2048'

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
      component:anlysis,
      redirect:'/anlysis/process',
      children:[{
        path:'process',
        name:'process',
        component:Process,
      },
      {
        path:'bar',
        name:'bar',
        component:bar,
      },{
        path:'kind',
        name:'kind',
        component:kind,
      },{
        path:'2048',
        name:'c2048',
        component:c2048,
      }]
    }
  ]
})
