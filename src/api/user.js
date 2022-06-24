import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

//获取用户信息getUserInfo
export function getUserInfos() {
  return request({
    url: '/sys/profile',
    method: 'post',
  })
}

export function getUserImg(id) {
    return request({
      url: `/sys/user/${id}`,
      method: 'get',
    })
  }

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
