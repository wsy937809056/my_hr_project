<template>
    <div class="employees">
        <el-card class="containerTop">
            <el-row type="flex" justify="space-between">
                <!-- 导航栏 添加员工 -->
                <el-col :span="3">
                    <el-tag size="small"><i class="el-icon-info"></i> 共{{page.total}}条记录</el-tag>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" size="mini">导入</el-button>
                    <el-button type="primary" @click="dialogFormVisible = true" size="mini" icon="el-icon-plus">新增员工</el-button>
                </el-col>
                
                <!-- 添加新员工弹框 -->
                <el-dialog title="编辑员工" :visible.sync="dialogFormVisible" @close="cancel('addFrom')">
                    <el-form :model="form" :rules="rules" ref="addFrom">
                        <el-form-item label="姓名：" prop="username" label-width="100px" size="small">
                            <el-input v-model="form.username" placeholder="1-4个字符" style="width:75%;"></el-input>
                        </el-form-item>
                        <el-form-item label="手机：" prop="mobile" label-width="100px">
                            <el-input v-model="form.mobile" placeholder="请输入手机号" size="small" style="width:75%;"></el-input>
                        </el-form-item>
                        <el-form-item label="入职时间：" label-width="100px" prop="timeOfEntry" size="small">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.timeOfEntry" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="聘用形式：" label-width="100px" prop="formOfEmployment">
                            <el-radio-group v-model="form.formOfEmployment">
                            <el-radio label="正式" value="1"></el-radio>
                            <el-radio label="非正式" value="2"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="工号：" prop="workNumber" label-width="100px" size="small">
                            <el-input v-model="form.workNumber" autocomplete="off" placeholder="1-20个字符" style="width:75%;"></el-input>
                        </el-form-item>
                        <el-form-item label="部门：" label-width="100px" prop="departmentName" size="small">
                            <el-select v-model="form.departmentName" placeholder="请选择">
                            <el-option v-for="val in parts" :key="val.id" :label="val.name" :value="val.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="转正时间：" label-width="100px" prop="correctionTime" size="small">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.correctionTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel('addFrom')">取 消</el-button>
                        <el-button type="primary" @click="addUsers('addFrom')">确 定</el-button>
                    </div>
                </el-dialog>
            </el-row>
        </el-card> 

        <!-- 数据列表 -->
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
                        <el-button type="text" size="small" @click="updateBtn('/employees/update','Update',row.id,row.username)">查看</el-button>
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
import { getEmpList, deleteUser, getPart, addUser } from '@/api/employees.js'
import { validPhone } from '@/utils/validate'

export default {
    data() {
        const validPhones = (rule, value, callback) => {
            validPhone(value) ? callback() : callback(new Error('请输入正确手机号'))
        }
        return {
            tableDate:[],//员工信息
            parts:[],//部门信息
            page:{
                page:1,//当前页码
                size:10,//一页显示10条
                total:0,
                loading:false
            },
            dialogFormVisible: false,
            form: {
                username: '',
                mobile:'',
                timeOfEntry: '',
                formOfEmployment:'非正式',
                workNumber:'',
                departmentName:'',
                correctionTime: '',
            },
            rules:{
                username:[
                    { required: true, trigger: 'blur', message:'姓名不能为空'},
                    { min: 1, max: 4, message: '请输入1-4个字符', trigger: 'blur'}
                ],
                mobile:[
                    { required: true, trigger: 'blur', message:'手机号不能为空'},
                    { trigger: 'blur', validator: validPhones, }
                ],
                timeOfEntry:{ required: true, trigger: 'blur', message:'入职时间不能为空'},
                workNumber:[
                    { required: true, trigger: 'blur', message:'工号不能为空'},
                    { min: 1, max: 20, message: '请输入1-20个字符', trigger: 'blur'}
                ],
                departmentName:{ required: true, trigger: 'blur', message:'部门不能为空'},
                correctionTime:{ required: true, trigger: 'blur', message:'转正时间不能为空'},

            }
        }
    },
    methods: {
        //获取部门数据
        async getParts(){
            const res = await getPart()
            this.parts = res.depts
            // console.log(this.parts);
        },
        //获取员工数据
        async  getEmpLIsts(){
            this.loading = true
            const res =  await getEmpList(this.page)
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
        //添加新员工
        async addUsers(addFrom){
            await addUser(this.form)
            //console.log(this.$refs[addFrom]);
            this.dialogFormVisible = false
            this.$refs[addFrom].resetFields()//重置表单数据
            this.getEmpLIsts()
        },
        cancel(addFrom){
             this.dialogFormVisible = false
            this.$refs[addFrom].resetFields()
        },
        //查看 修改用户密码
        updateBtn(path,name,id,username){
            this.$router.push({
                path:path,
                name:name,
                params:{
                    username,
                    id
                }
            })
        },
        //删除
        async removeUser(id) {
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
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
        this.getParts()
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
.block{
    float: right;
    margin-top: 10px;
}
/deep/ .el-dialog{
    width: 40%;
}
/deep/ .el-dialog__header{
  padding: 20px 20px;  
}
/deep/ .el-dialog__body{
  padding: 0 20px;  
}
/deep/ .el-dialog__footer{
  padding: 0 20px;  
}
.dialog-footer{
    padding: 0 20px;
}
</style>