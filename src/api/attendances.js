import request from '@/utils/request'

//部门
export function getdepartmentData() {
    return request({
      url: '/company/department',
      method: 'get',
    })
  }

export function getAttendances(params) {
  return request({
    url: '/attendances',
    method: 'get',
    params
  })
}