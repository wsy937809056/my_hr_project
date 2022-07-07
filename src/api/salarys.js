import request from '@/utils/request'

//获取部门信息
export function getPart() {
    return request({
        url: '/company/department',
        method: 'get',  //get可省略
    })
}

//获取薪资信息
export function getSalarys(data) {
    return request({
        url: '/salarys/list',
        method: 'post',
        data
    })
}

//保存企业计薪及津贴设置
export function getSettings(data) {
    return request({
        url: '/salarys/settings',
        method: 'get',
        data
    })
}