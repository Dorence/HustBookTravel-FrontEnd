import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import Auth from '@/components/views/Auth'
import PasswordReset from '@/components/views/PasswordReset'


export default new Router({
    routes: [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path:"/Auth",
        name:'Auth',
        component:Auth
    },
    {
        path:"/PasswordReset",
        name:'PasswordReset',
        component:PasswordReset
    }
    ]
})