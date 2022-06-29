import request from '@/utils/request'

//获取审批信息
export function getApproval() {
    return request({
        url: '/user/process/instance/{page}/{size}',
        method: 'get',
        params
    })
}