import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {getUserInfos,getUserImg} from '@/api/user'
import {getuserinfo, setuserinfo, removeuserinfo, } from '@/utils/session'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/404',] //白名单

//前置路由守卫
router.beforeEach(async(to, from, next) => {
 
  NProgress.start()

  //获取token
//   store.state.user.token    store.getters.token
    if(store.getters.token){
        if (to.path === '/login') {
            next('/')
        }else{
            //调用获取用户信息接口
            if(!getuserinfo.userId){
                const res = await getUserInfos()
                const res1 = await getUserImg(res.userId)
                const userInfoAll={...res,...res1}
                setuserinfo(userInfoAll)
            }

            next()
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else{
            next('/login')
        }
    }
     NProgress.done()
})

//后置路由守卫
router.afterEach(() => { 
  // finish progress bar
  NProgress.done()
})
