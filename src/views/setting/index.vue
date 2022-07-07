<template>
    <div class="container">
        <el-tabs>
            <el-tab-pane label="角色管理">
                <el-row class="addBtn">
                    <el-button type="primary" @click="newBtn" size="small">新增角色</el-button>
                </el-row>
                <div class="containerMain" v-loading="loading">
                    <!-- 角色表格 -->
                    <el-table :data="tableDate" border style="width: 100%;" stripe>
                        <el-table-column type="index" width="200" label="序号" align="center"></el-table-column>
                        <el-table-column prop="name" label="角色" sortable width="280" align="center">
                        </el-table-column>
                        <el-table-column prop="description" label="描述" sortable width="400" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="500" align="center">
                            <template slot-scope="{ row }">
                                <el-button size="mini" type="success" >分配权限</el-button>
                                <el-button size="mini" type="primary"  @click="updateBtn(row.id)" >编辑</el-button>
                                <el-button size="mini" type="danger" @click="removeRole(row.id)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 分页 -->
                    <el-row class="block">
                        <el-pagination
                            layout="prev, pager, next"
                            :current-page="page.page"
                            :page-size="page.size"
                            :total="page.total"  
                            @current-change="changePage"
                            >
                        </el-pagination>
                    </el-row>

                    <!-- 新增/编辑角色弹框 -->
                    <el-dialog :title="titles" :visible="dialogFormVisible" @close="cancel('addFrom')">
                        <el-form :model="form" :rules="rules" ref="addFrom">
                            <el-form-item label="角色名称" prop="name" label-width="160px" size="small">
                                <el-input v-model="form.name" style="width:75%;"></el-input>
                            </el-form-item>
                            <el-form-item label="角色描述" prop="description" label-width="160px" size="small">
                                <el-input v-model="form.description" style="width:75%;"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel('addFrom')">取 消</el-button>
                            <el-button type="primary" @click="addRoles('addFrom')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getRole, deleteRole, addRole, getRoleById, updateRole } from '@/api/setting.js'

export default {
    data() {
        return {
            roleId:'',//id值
            tableDate:[],//角色数据
            titles:'',  //弹框标题
            page:{
                page:1,//当前页码
                size:10,//一页显示10条
                total:0,
                loading:false
            },
            dialogFormVisible: false,
            form: {
                name:'',
                description:'',
            },
            rules:{
                name:[{ required: true, trigger: 'blur', message:'角色名称不能为空'}],
                description:[{ required: true, trigger: 'blur', message:'角色描述不能为空'}],
            }
        }
    },
    methods:{
        //新增角色标题
        newBtn(){
            this.dialogFormVisible = true
            this.titles = '新增角色'
           
        },
        
        //弹框点击事件
        async addRoles(addFrom){
            if (this.titles == '新增角色') {
                // console.log('this.titles',this.titles);
                //  console.log(this.form);
                
                //  return
                //添加角色
               
                console.log('111',this.form);
                await addRole(this.form)
                this.dialogFormVisible = false  
                 this.$refs[addFrom].resetFields()
                 this.getRoles()
               
              
               
            }else{
               
                //编辑角色
                try{
                   
                   await this.$refs.addFrom.validate()
                    await updateRole({...this.form})
                    this.dialogFormVisible = false
                    this.$message.success('保存成功')
                    this.getRoles()
                    // this.$refs[addFrom].resetFields()
                    this.$refs.addFrom.resetFields()
                } catch (error) {
                    console.log(error)
                }
            }
        },
        cancel(addFrom){
             console.log('99999');
             this.dialogFormVisible = false
            //  this.$refs.addFrom.resetFields()
             this.$refs[addFrom].resetFields()
        },
        //获取表格数据
        async getRoles(){
            this.loading = true
            const res = await getRole(this.page)
            this.tableDate = res.rows
            this.page.total = res.total
            console.log(res);
            this.loading = false
        },
        //分页
        changePage(val) {
            this.page.page = val
            this.getRoles()
        },
        //编辑角色标题
        async updateBtn(id){
            this.dialogFormVisible = true
            this.titles = '编辑角色'
            this.roleId = id
            this.form = await getRoleById(this.roleId)//角色基本信息
            
        },
        //删除
        async removeRole(id) {
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                await deleteRole(id)
                this.getRoles()
                this.$message.success('删除员工成功')
            }catch(err){
                console.log(err);
            }
        },
    },
    created(){
        this.getRoles()
    },
}
</script>

<style scoped>
.container{
    padding: 10px 30px;
}
.addBtn{
    padding-bottom: 10px;
}
.block{
    float: right;
}
/deep/ .el-dialog{
    width: 40%;
}
/deep/ .el-dialog__header{
  padding: 30px 20px;  
}
/deep/ .el-dialog__body{
  padding: 0 20px;  
}
/deep/ .el-dialog__footer{
  padding: 0 20px;  
}
.dialog-footer{
    padding: 10px 20px;
}
</style>