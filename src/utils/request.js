import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(request=>{
    if(store.getters.token){
      request.headers['Authorization']= `Bearer ${store.getters.token}`
    }
    return request //必须返回配置
},error => {
    Message.error(error.message)
    return Promise.reject(error)
}
  
)//请求拦截

// response interceptor
service.interceptors.response.use(//响应拦截

  response => {
    const {success, message, data} = response.data
    if(success){
      return data
    }else{
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
