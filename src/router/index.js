import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import Auth from '@/components/views/Auth'
import FindCode from '@/components/views/FindCode'


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
        path:"/FindCode",
        name:'FindCode',
        component:FindCode
    }
    ]
})