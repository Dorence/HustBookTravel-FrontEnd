import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import IndexRL from '@/components/views/IndexRL'

export default new Router({
    routes: [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path:"/IndexRL",
        name:'IndexRL',
        component: IndexRL
    }
    ]
})