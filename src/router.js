import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import test from './views/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
        path: '/test/:bookname',
        name: 'test',
        component: test,
    }
  ]
})
