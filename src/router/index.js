import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
<<<<<<< HEAD
=======
import AllComments from '@/components/views/AllComments'
>>>>>>> bd8a41d085f10689423c3cb6109824baa5e6aacc

export default new Router({
    routes: [{
        path: '/',
        name: 'HomePage',
        component: HomePage
<<<<<<< HEAD
    }]
=======
    },
    {
        path: '/AllComments',
        name: 'AllComments',
        component: AllComments
    }
    ]
>>>>>>> bd8a41d085f10689423c3cb6109824baa5e6aacc
})