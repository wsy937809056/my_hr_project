import request from '@/utils/request'

//获取员工信息
export function getEmpList(params) {
    return request({
        url: '/sys/user',
        method: 'get',
        params
    })
}

//删除员工信息
export function deleteUser(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete',
    })
}

//获取部门信息
export function getPart() {
  return request({
      url: '/company/department',
      method: 'get',
  })
}

//添加新员工
export function addUser(data) {
  return request({
      url: '/sys/user',
      method: 'post',
      data
  })
}

//获取某个用户的基本信息
export function getUserDetailById(id) {
    return request({
      url: `/sys/user/${id}`
    })
  }
  
  //保存员工的基本信息
  
  export function saveUserDetailById(data) {
   return request({
     url: `/sys/user/${data.id}`,
     method: 'put',
     data
   })
  }