import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Reader from './views/Reader.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        // {
        //     path: '/importEpub',
        //     name: 'importEpub',
        //     component: () => import('./views/ImportEpub.vue'),
        // }
        {
            path: '/reader/:bookname',
            name: 'reader',
            component: Reader,
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})