<template>
    <div>
        <p>{{$route.params.id}}</p>
        <template class="updates">
            <el-tabs>
                <el-tab-pane label="登录账户设置">
                    <!-- 修改信息表单 -->
                    <el-form :model="updateInfo" :rules="formRules" ref="updateForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="姓名：" prop="username">
                            <el-input v-model="updateInfo.username" :placeholder="$route.params.username" style="width:30%;" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="password2">
                            <el-input v-model="updateInfo.password2" style="width:30%;" type="password" size="small"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="updateBtn">更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </template>
        
    </div>
</template>

<script>
import { saveUserDetailById ,getUserDetailById } from '@/api/employees' 

export default {
    data() {
        return {
            userId:this.$route.params.id,
            updateInfo: {
                //存放基本信息
                username: '',
                password2: '',
            },
            formRules: {
                username:[
                    { required: true, trigger: 'blur', message:'姓名不能为空'},
                    { min: 1, max: 4, message: '请输入1-4个字符', trigger: 'blur'}
                ],
                password2: [
                    { required: true, trigger: 'blur', message:'密码不能为空'},
                    { min: 6, max: 16, message: '请输入6-16个字符', trigger: 'blur'}
                ]
            },
        };
    },
    methods: {
        async getUserDetailById() {
            this.updateInfo = await getUserDetailById(this.userId)//员工基本信息
            console.log("updateInfo",this.updateInfo);
        },
        async updateBtn() {
            try {
                // 校验
                await this.$refs.updateForm.validate()
                await saveUserDetailById({ ...this.updateInfo, password: this.updateInfo.password2 }) // 将新密码的值替换原密码的值
                this.$message.success('保存成功')
            } catch (error) {
                console.log(error)
            }
            
        }
    },
    created() {
        this.getUserDetailById()
    },
}
</script>

<style scoped>
.demo-ruleForm{
    margin-left: 120px;
}
</style>