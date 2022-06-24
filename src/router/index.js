import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/departments',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Departments',
        component: () => import('@/views/departments/index'),
        meta: { title: '组织架构', icon: 'tree' }
      }
    ]
  },

  {
    path: '/employees',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Employees',
        component: () => import('@/views/employees/index'),
        meta: { title: '员工', icon: 'people' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '公司设置', icon: 'setting' }
      }
    ]
  },

  {
    path: '/salarys',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Salarys',
        component: () => import('@/views/salarys/index'),
        meta: { title: '工资', icon: 'money' }
      }
    ]
  },

  {
    path: '/social',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Social',
        component: () => import('@/views/social/index'),
        meta: { title: '社保', icon: 'table' }
      }
    ]
  },

  {
    path: '/attendances',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Attendances',
        component: () => import('@/views/attendances/index'),
        meta: { title: '考勤', icon: 'skill' }
      }
    ]
  },

  {
    path: '/approvals',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Approvals',
        component: () => import('@/views/approvals/index'),
        meta: { title: '审批', icon: 'tree-table' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Permission',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限管理', icon: 'lock' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
