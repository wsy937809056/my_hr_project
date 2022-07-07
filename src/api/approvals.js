import request from '@/utils/request'

//获取审批信息
export function getApproval(page) {
    return request({
        url: `/user/process/instance/${page.page}/${page.size}`,
        method: 'put',
    })
}

//查看左侧申请数据
export function getApprovalById(id) {
    return request({
      url: `/user/process/instance/${id}`
    })
  }

  //查看右侧审批记录
  export function getTasksById(id) {
    return request({
      url: `/user/process/instance/tasks/${id}`
    })
  }