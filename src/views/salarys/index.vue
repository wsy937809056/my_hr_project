<template>
    <div class="salarys">
        <el-card class="containerTop">
            <el-row type="flex" justify="space-between">
                <!-- 导航栏 -->
                <el-col :span="3">
                    <el-tag size="small"><i class="el-icon-info"></i> 本月0 离职0 调薪0 未定薪0</el-tag>
                </el-col>
                <el-col :span="4">
                    <el-button type="danger" size="mini" @click="$router.push('/salarys/setting')">设置</el-button>
                    <el-button type="primary" size="mini">202003报表</el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="getSelect">
            <!-- 多选查询 -->
            <el-row type="flex">
                <el-col :span="2"><h5>聘用形式：</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList" style="line-height: 60px;">
                        <el-checkbox label="正式"></el-checkbox>
                        <el-checkbox label="非正式"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2"><h5>员工状态:</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList" style="line-height: 60px;">
                        <el-checkbox label="在职"></el-checkbox>
                        <el-checkbox label="离职"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2"><h5>部门：</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="checkList" style="line-height: 60px;">
                        <el-checkbox v-for="val in parts" :key="val.id" :label="val.name" :value="val.name"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="containerMain" v-loading="loading">
            <el-table :data="tableDate" style="width: 100%;">
                <el-table-column type="index" width="60" label="序号"></el-table-column>
                <el-table-column prop="username" label="姓名" sortable width="130">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" sortable width="140">
                </el-table-column>
                <el-table-column prop="workNumber" label="工号" sortable width="100">
                </el-table-column>
                <el-table-column prop="formOfEmployment" :formatter="employment" label="聘用形式" sortable width="100">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门" sortable width="120">
                </el-table-column>
                <el-table-column prop="timeOfEntry" :formatter="times" label="入职时间" sortable width="140">
                </el-table-column>
                <el-table-column prop="currentBasicSalary" :formatter="Salarys" label="工资基数" sortable width="100">
                </el-table-column>
                <el-table-column prop="inServiceStatus" :formatter="Status" label="津贴方案" sortable width="120">
                </el-table-column>
                <el-table-column label="操作" width="170">
                    <template slot-scope="{ row }">
                        <el-button type="primary" size="mini" @click="oneBtn" ref="oneBtn" >调薪</el-button>
                        <el-button type="text" size="small" @click="$router.push(`/salarys/look/${row.id}`)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" style="margin-top: 10px;">
                <!-- 分页 -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="page.page"
                    :page-size="page.pageSize"
                    :total="page.total"  
                    @current-change="changePage"
                    >
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { getPart, getSalarys } from '@/api/salarys.js'
import moments from 'moment'

export default {
    data(){
        return{
            parts:[],//部门信息
            checkList: [], //多选默认选中
            tableDate:[],  //表格数据
            page:{
                page:1,//当前页码
                pageSize:10,//一页显示10条
                total:0,
                loading:false
            },
        }
    },
    methods:{
        //获取部门数据
        async getParts(){
            const res = await getPart()
            this.parts = res.depts
        },
        //获取薪资数据
        async getSalary(){
            this.loading = true
            const res = await getSalarys(this.page)
            this.tableDate = res.rows
            this.page.total = res.total
            this.loading = false
            // console.log('res',res);
        },
        employment(res){
            return res.formOfEmployment==1 ? '正式' : '非正式'
        },
        times(res){
            return moments(res.timeOfEntry).format('YYYY-MM-DD')
        },
        Salarys(res){
            return res.currentBasicSalary==null ? 0 : res.currentBasicSalary
        },
        Status(res){
            return res.inServiceStatus==1 ? '通用津贴' : '非通用津贴'
        },
        oneBtn(){
            // console.log(this.$refs.oneBtn);
        },
        changePage(val) {
            this.page.page = val
            this.getSalary()
        },
    },
    created(){
        this.getParts()
        this.getSalary()
    },
}
</script>

<style scoped>
.salarys{
    background: #e9ebee;
    padding: 10px 20px;
}
.containerTop{
    background: #fff;
    height: 58px;
    margin-bottom: 10px;
}
.getSelect{
    background: #fff;
    margin-bottom: 10px;
    height: 300px;
}
.containerMain{
    background: #fff;
    height: 740px;
    padding: 0 20px;
}
.block{
    float: right;
    margin-top: 10px;
}
</style>