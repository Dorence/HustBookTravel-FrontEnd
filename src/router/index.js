import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '@/components/views/HomePage'
import AllComments from '@/components/views/AllComments'
import ComContent from '@/components/views/ComContent'
import MyComments from '@/components/views/MyComments'
import IndexRL from '@/components/views/IndexRL'
import bookManager from "@/components/views/bookManager"
import bookList from "@/components/views/bookManager/bookList"
import bookDetail from "@/components/views/bookManager/bookDetail"
import myAppointment from "@/components/views/bookManager/myAppointment"
import VentPanel from '@/components/views/VentPanel'
import VentWall from '@/components/components/VentPage/RouteView/VentWall'
import SubmitVent from '@/components/components/VentPage/RouteView/SubmitVent'




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
            path: '/VentPanel',
            name: 'VentPanel',
            component: VentPanel,
            children:[
              {
                path: '/VentPanel',
                name: 'VentWall',
                component: VentWall,
              },
              {
                path: '/SubmitVent',
                name: 'SubmitVent',
                component: SubmitVent,
              },
            ]
          },
    ]
});