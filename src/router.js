import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DispensersIndex from './components/DispensersIndex.vue'
import CreateDispenser from './components/CreateDispenser.vue'
import EditDispenser from './components/EditDispenser.vue'
import TanksIndex from './components/TanksIndex.vue'
import CreateTank from './components/CreateTank.vue'
import EditTank from './components/EditTank.vue'
import SalesForm from './components/SalesForm.vue'
import StockForm from './components/StockForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dispensers',
      name: 'dispensers.index',
      component: DispensersIndex
    },
    {
      path: '/dispensers/create',
      name: 'dispensers.create',
      component: CreateDispenser
    },
    {
      path: '/dispensers/:dispenserId',
      name: 'dispensers.edit',
      component: EditDispenser
    },
    {
      path: '/dispensers/:dispenserId/sales',
      name: 'dispensers.sales.index',
      component: CreateDispenser
    },
    {
      path: '/dispensers/:dispenserId/sales/create',
      name: 'dispensers.sales.create',
      component: SalesForm
    },
    {
      path: '/tanks',
      name: 'tanks.index',
      component: TanksIndex
    },
    {
      path: '/tanks/create',
      name: 'tanks.create',
      component: CreateTank
    },
    {
      path: '/tanks/:tankId',
      name: 'tanks.edit',
      component: EditTank
    },
    {
      path: '/tanks/:tankId/stock',
      name: 'tanks.stock.index',
      component: CreateTank
    },
    {
      path: '/tanks/:tankId/stock/create',
      name: 'tanks.stock.create',
      component: StockForm
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
