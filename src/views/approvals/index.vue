<template>
    <div class="employees">
        <el-card class="containerTop">
            <el-row type="flex" justify="space-between">
                <!-- 导航栏 添加员工 -->
                <el-col :span="3">
                    <el-tag size="small"><i class="el-icon-info"></i> 当前审批中{{this.ing}} 本月通过审批{{this.isOk}} 本月审批驳回{{this.isNo}}</el-tag>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="mini">流程设置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 数据列表 -->
        <el-card class="containerMain" v-loading="loading">
            <template>
                <el-table :data="tableData" style="width: 100%;">
                    <el-table-column type="index" width="100" label="序号"></el-table-column>
                    <el-table-column prop="processName" label="审批类型" sortable width="160">
                    </el-table-column>
                    <el-table-column prop="username" label="申请人" sortable width="160">
                    </el-table-column>
                    <el-table-column prop="procCurrNodeUserName" label="当前审批人" sortable width="230">
                    </el-table-column>
                    <el-table-column prop="procApplyTime" :formatter="times" label="审批发起时间" sortable width="230">
                    </el-table-column>
                    <el-table-column prop="processState" :formatter="state" label="审批状态" sortable width="180">
                    </el-table-column>
                    <el-table-column label="操作" width="210">
                    <template slot-scope="{ row }">
                        <el-button type="text" @click="$router.push(`/approvals/look/${row.processId}`)" >查看</el-button>
                    </template>
                    </el-table-column> 
                </el-table>
            </template>

            <!-- 分页 -->
            <el-row type="flex" justify="center">
                <el-pagination
                    layout="prev, pager, next"
                    :current-page="page.page"
                    :page-size="page.size"
                    :total="page.total"  
                    @current-change="changePage"
                    >
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { getApproval } from '@/api/approvals.js'
import moments from 'moment'

export default {
    data(){
        return{
            tableData:[],
            ing: 3, //审批中数量
            isOk: 3, //审批通过数量
            isNo: 1, //审批驳回数量
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
            this.loading = true
            const res = await getApproval(this.page)
            this.tableData = res.rows
            this.page.total = res.total
            this.loading = false
            // console.log(this.tableData);
        },
        state(res){
            return res.processState==1 ? '审批中' : res.processState==2 ? '审批通过' : res.processState==3 ? '审批不通过' : '撤销'
        },
        times(res){
            return moments(res.procApplyTime).format('YYYY-MM-DD')
        },
        //分页
        changePage(val) {
            this.page.page = val
            this.getApprovals()
        },
    },
    created(){
        this.getApprovals()
    },
}
</script>

<style scoped>
.employees{
    background: #e9ebee;
    padding: 10px 20px;
}
.containerTop{
    background: #fff;
    height: 58px;
    margin-bottom: 10px;
}
.containerMain{
    background: #fff;
    height: 720px;
    padding: 20px;
}
</style>