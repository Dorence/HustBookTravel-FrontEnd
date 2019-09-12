import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import AllComments from '@/components/views/AllComments'
import ComContent from '@/components/views/ComContent'
import MyComments from '@/components/views/MyComments'

export default new Router({
    routes: [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/AllComments',
        name: 'AllComments',
        component: AllComments
    },
    {
        path: '/Comcontent',
        name: 'ComContent',
        component: ComContent
    },
    {
        path: '/MyComments',
        name: 'MyComments',
        component: MyComments
    }
    ]
})