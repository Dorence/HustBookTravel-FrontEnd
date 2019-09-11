import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import AllComments from '@/components/views/AllComments'

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
    }
    ]
})