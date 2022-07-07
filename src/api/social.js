import request from '@/utils/request'

//获取部门信息
export function getPart() {
    return request({
        url: '/company/department',
    })
}

//获取城市信息
export function getCity() {
    return request({
        url: '/sys/city',
    })
}

//获取企业用户社保列表
export function getSocial(data) {
    return request({
        url: '/social_securitys/list',
        method: 'post',
        data
    })
}

//查询月份数据报表
export function getMounthList(yearMonth,params) {
    return request({
      url: `/social_securitys/historys/${yearMonth}`,
      method: 'get',
      params
    })
  }

//查询企业社保配置信息
export function getReportTime() {
    return request({
      url: '/social_securitys/settings',
      method: 'get',
    })
  }