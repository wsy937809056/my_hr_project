<template>
    <div class="employees">
        <el-card class="containerTop">
            <el-row type="flex" justify="end">
                <el-button type="primary" size="mini">导入</el-button>
                <el-button type="primary" @click="dialogFormVisible = true" size="mini" icon="el-icon-plus">新增员工</el-button>
                <el-dialog title="编辑员工" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="姓名：" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机：" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </el-row>
        </el-card> 

        <div class="containerMain" v-loading="loading">
            <template>
                <el-table :data="tableDate" border style="width: 100%;">
                    <el-table-column type="index" width="100" label="序号"></el-table-column>
                    <el-table-column prop="username" label="姓名" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="workNumber" label="工号" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="formOfEmployment" :formatter="employment" label="聘用形式" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="timeOfEntry" :formatter="times" label="入职时间" sortable width="140">
                    </el-table-column>
                    <el-table-column prop="formOfEmployment" label="状态" sortable width="140">
                        <template slot-scope="scope">
                            <!-- {{scope.row.enableState}} -->
                            <el-switch :value="scope.row.formOfEmployment==1"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="280">
                    <template slot-scope="{ row }">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">转正</el-button>
                        <el-button type="text" size="small">调岗</el-button>
                        <el-button type="text" size="small">离职</el-button>
                        <el-button type="text" size="small">角色</el-button>
                        <el-button  @click="removeUser(row.id)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- 分页 -->
            <template>
                <div class="block">
                    <el-pagination
                    @current-change="changePage"
                    :current-page="page.page"
                    :page-size="page.size"
                    layout="total, prev, pager, next"
                    :total="page.total">
                    </el-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import moments from 'moment'
import { getEmpList, deleteUser, } from '@/api/employees.js'

export default {
    data() {
        return {
            tableDate:[],
            page:{
                page:1,//当前页码
                size:10,//一页显示10条
                total:0,
                loading:false
            },
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        async  getEmpLIsts(){
            this.loading = true
            const res =  await getEmpList(this.page)
            this.tableDate = res.rows
            this.page.total = res.total
            this.loading = false
            console.log('res',res);
        },
        employment(res){
            return res.formOfEmployment==1 ? '正式' : '非正式'
        },
        times(res){
            return moments(res.timeOfEntry).format('YYYY-MM-DD')
        },
        //删除
        async removeUser(id) {
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                await deleteUser(id)
                this.getEmpLIsts()
                this.$message.success('删除员工成功')
            }catch(err){
                console.log(err);
            }
        },
        //分页
        changePage(val) {
            this.page.page = val
            this.getEmpLIsts()
        },
    },
    created(){
        this.getEmpLIsts()
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
    line-height: 75px;
    height: 58px;
    margin-bottom: 10px;
}
.containerMain{
    background: #fff;
    height: 720px;
    padding: 20px;
}
.block{
    float: right;
    margin-top: 10px;
}
</style>