import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homePage from '@/components/views/homePage'
import AllComments from '@/components/views/AllComments'
import MyComments from '@/components/views/MyComments'

import bookManager from "@/components/views/bookManager"
import bookList from "@/components/views/bookManager/bookList"
import bookDetail from "@/components/views/bookManager/bookDetail"

import VentPanel from '@/components/views/ventPanel'
import VentWall from '@/components/views/ventPanel/VentWall'
import SubmitVent from '@/components/views/ventPanel/SubmitVent'

import Auth from '@/components/views/Auth';
import Login from "@/components/views/auth/login";
import Register from "@/components/views/auth/register";
import PasswordReset from '@/components/views/auth/passwordReset';

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
        path: "/auth",
        name: 'Auth',
        component: Auth,
        children: [{
            path: "/auth",
            name: "login",
            component: Login
        }, {
            path: "/auth/register",
            name: "register",
            component: Register
        }, {
            path: "/auth/reset",
            name: "PasswordReset",
            component: PasswordReset
        }]
    },
    {
        path: "/book",
        name: "bookManager",
        component: bookManager,
        children: [{
            path: "/book",
            name: "bookList",
            component: bookList
        }, {
            path: "/book/bookDetail",
            name: "bookDetail",
            component: bookDetail
        }]
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
    }
    ]
});