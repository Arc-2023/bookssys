
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/Home'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '@/components/homepage/Login'
import Signin from '@/components/homepage/Signin'
import index from '@/components/homepage/Index'
import Detail from '@/components/homepage/Detail'
import Manage from '@/components/manage//Manage'
import Book from '@/components/manage/Book'
import User from '@/components/manage/User'
import Power from '@/components/manage/Power'
import Personal from '@/components/personal/Personal'
import personalDetail from '@/components/personal/personalDetail'
import background from '@/components/homepage/background'
Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/manage',
      component: Manage,
      children: [
        {
          path: 'book',
          name: '书籍管理',
          component: Book
        },
        {
          path: 'user',
          name: '用户管理',
          component: User
        },
        {
          path: 'power',
          name: '权限管理',
          component: Power
        }
      ]
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'signin',
          component: Signin
        },
        {
          path: 'home',
          component: Home
        },
        {
          path: 'background',
          component: background
        },
        {
          path: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/personal',
      component: Personal,
      children: [
        {
          path: 'detail',
          component: personalDetail
        }
      ]
    }
  ]
})
