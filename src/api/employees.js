import request from '@/utils/request'

export function getEmpList(params) {
    return request({
        url: '/sys/user',
        method: 'get',
        params
    })
}

export function deleteUser(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete',
    })
}