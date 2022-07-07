import request from '@/utils/request'

//查询全部角色列表
export function getRole(params) {
    return request({
        url: '/sys/role',
        params
    })
}

//删除角色信息
export function deleteRole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete',
    })
}

//添加角色
export function addRole(data) {
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}

//获取角色基本信息
export function getRoleById(id) {
    return request({
      url: `/sys/role/${id}`
    })
  }

//编辑角色
export function updateRole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'put',
        data
    })
}