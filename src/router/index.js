import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homePage from '@/components/views/homePage'
import AllComments from '@/components/views/AllComments'
import MyComments from '@/components/views/MyComments'
import IndexRL from '@/components/views/IndexRL'
import bookManager from "@/components/views/bookManager"
import bookList from "@/components/views/bookManager/bookList"
import bookDetail from "@/components/views/bookManager/bookDetail"
import myAppointment from "@/components/views/bookManager/myAppointment"
import VentPanel from '@/components/views/ventPanel'
import VentWall from '@/components/views/ventPanel/VentWall'
import SubmitVent from '@/components/views/ventPanel/SubmitVent'


export default new Router({
    routes: [{
            path: "/",
            name: "homePage",
            component: homePage
        },
        {
            path: '/AllComments',
            name: 'AllComments',
            component: AllComments
        },
        {
            path: '/MyComments',
            name: 'MyComments',
            component: MyComments
        },
        {
            path: "/IndexRL",
            name: 'IndexRL',
            component: IndexRL
        },
        {
            path: "/book",
            name: "bookManager",
            component: bookManager,
            children: [{
                    path: "/book/bookList",
                    name: "bookList",
                    component: bookList
                }, {
                    path: "/book/bookDetail",
                    name: "bookDetail",
                    component: bookDetail
                },
                {
                    path: "/book/myAppointment",
                    name: "myAppointment",
                    component: myAppointment
                }
            ]
        },
        {
            path: '/vent',
            name: 'ventPanel',
            component: VentPanel,
            children: [{
                    path: '/VentPanel',
                    name: 'VentWall',
                    component: VentWall,
                },
                {
                    path: '/SubmitVent',
                    name: 'SubmitVent',
                    component: SubmitVent,
                }
            ]
        },

    ]
});