<template>
    <div class="employees">
        <el-card class="containerTop">
            <el-row type="flex" justify="space-between">
                <!-- 导航栏 添加员工 -->
                <el-col :span="3">
                    <el-tag size="small"><i class="el-icon-info"></i> 当前审批中 本月通过审批 本月审批驳回</el-tag>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="mini">流程设置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 数据列表 -->
        <!-- <el-card class="containerMain" v-loading="loading">
            <template>
                <el-table :data="tableDate" border style="width: 100%;">
                    <el-table-column type="index" width="100" label="序号"></el-table-column>
                    <el-table-column prop="username" label="审批类型" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="mobile" label="申请人" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="workNumber" label="当前审批人" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="timeOfEntry" :formatter="times" label="审批发起时间" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="formOfEmployment" label="审批状态" sortable width="140">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="280">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="small" @click="updateBtn('/employees/update','Update',row.id,row.username)">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template> -->

            <!-- 分页 -->
            <!-- <el-row type="flex" justify="center">
                <el-pagination
                    layout="prev, pager, next"
                    :current-page="page.page"
                    :page-sizes="page.size"
                    :total="page.total"  
                    @current-change="chagePage"

                    >
                </el-pagination>
            </el-row>
        </el-card> -->
    </div>
</template>

<script>
import moments from 'moment'
import { getApproval } from '@/api/approvals.js'

export default {
    data(){
        return{
            tableData:[],
            page:{
                page:1,//当前页码
                size:10,//一页显示10条
                total:0,
                loading:false
            },
        }
    },
    methods:{
        //获取审批数据
        async getApprovals(){
            const res = await getApproval()
            // this.parts = res.depts
            console.log(res);
        },
    },
    created(){
        this.getApprovals()
    },
}
</script>

<style scoped>

</style>