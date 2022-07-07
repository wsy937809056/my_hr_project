<template>
    <div>
        <el-tabs v-model="activeName" class="topTitle">
            <el-tab-pane label="计薪设置" name="first">
                <el-form ref="form" :model="form" label-width="120px" label-position="left">
                    <el-form-item label="对应社保自然月">
                        <el-select v-model="form.socialSecurityType"  style="width:280px;">
                            <el-option label="当月" value="1"></el-option>
                            <el-option label="次月" value="2"></el-option>
                        </el-select>
                        <i class="el-icon-bell"></i>
                    </el-form-item>
                    <el-form-item label="社保数据来源" label-width="120px">
                        <el-input v-model="form.oneCome" style="width:280px;" disabled></el-input>
                        <i class="el-icon-bell"></i>
                    </el-form-item>
                    <el-form-item label="考勤数据来源" label-width="120px">
                        <el-input v-model="form.twoCome" style="width:280px;" disabled></el-input>
                        <i class="el-icon-bell"></i>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="津贴设置" name="second">
                <el-form ref="ruleForm2" :model="form2" label-width="120px">
                    <el-form-item label="通用方案" label-width="120px">
                        <el-input v-model="form2.subsidyName" style="width:340px;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="120px">
                        <el-input v-model="form2.subsidyRemark" style="width:340px;" placeholder="福利薪资发放规则"></el-input>
                    </el-form-item>
                    <el-form-item label="津贴名称" label-width="120px">
                        <el-input v-model="form2.name" style="width:260px;margin-bottom:10px;" placeholder="交通补贴" disabled></el-input>
                        <el-select v-model="form2.transportationSubsidyScheme"  style="width:260px;">
                            <el-option label="每出勤日" value="1"></el-option>
                            <el-option label="每月固定" value="2"></el-option>
                        </el-select>
                        <i class="el-icon-bell"></i>
                        <el-input v-model="form2.transportationSubsidyAmount" style="width:260px;" placeholder="100"></el-input><br/>
                        <el-input v-model="form2.name" style="width:260px;margin-bottom:10px;" placeholder="通讯补贴" disabled></el-input>
                        <el-select v-model="form2.communicationSubsidyScheme"  style="width:260px;">
                            <el-option label="每出勤日" value="1"></el-option>
                            <el-option label="每月固定" value="2"></el-option>
                        </el-select>
                        <i class="el-icon-bell"></i>
                        <el-input v-model="form2.communicationSubsidyAmount" style="width:260px;" placeholder="100"></el-input><br/>
                        <el-input v-model="form2.name" style="width:260px;margin-bottom:10px;" placeholder="午餐补贴" disabled></el-input>
                        <el-select v-model="form2.lunchAllowanceScheme"  style="width:260px;">
                            <el-option label="每出勤日" value="1"></el-option>
                            <el-option label="每月固定" value="2"></el-option>
                        </el-select>
                        <i class="el-icon-bell"></i>
                        <el-input v-model="form2.lunchAllowanceAmount" style="width:260px;" placeholder="100"></el-input><br/>
                        <el-input v-model="form2.name" style="width:260px;margin-bottom:10px;" placeholder="住房补助" disabled></el-input>
                        <el-select v-model="form2.housingSubsidyScheme"  style="width:260px;">
                            <el-option label="每出勤日" value="1"></el-option>
                            <el-option label="每月固定" value="2"></el-option>
                        </el-select>
                        <i class="el-icon-bell"></i>
                        <el-input v-model="form2.housingSubsidyAmount" style="width:260px;" placeholder="100"></el-input>
                    </el-form-item>
                    <el-form-item label="适用计税方式">
                        <el-radio-group v-model="form2.taxCalculationType">
                            <el-radio label="税前" value="1"></el-radio>
                            <el-radio label="税后" value="2"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2()">提交</el-button>
                        <el-button @click="resetForm2()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getSettings, } from '@/api/salarys.js'

export default {
    data() {
        return {
            activeName: 'first',
            form: {
                socialSecurityType: '2',
                oneCome: '社保模块',
                twoCome: '考勤模块',

            },
            form2: {
                subsidyName: '通用方案',//方案
                subsidyRemark: '',//备注
                transportationSubsidyScheme: '2',//交通
                transportationSubsidyAmount: '',
                communicationSubsidyScheme : '2',//通讯
                communicationSubsidyAmount: '',
                lunchAllowanceScheme: '2',//午餐
                lunchAllowanceAmount: '',
                housingSubsidyScheme: '2',//住房
                housingSubsidyAmount: '',
                taxCalculationType: '',//计税方式
            },
        };
    },
    methods: {
        //提交
        async submitForm(){
            try{
                const res = await getSettings({...this.form})
                this.$message.success('保存成功')
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        },
        async submitForm2(){
            try{
                const res = await getSettings({...this.form2})
                this.$message.success('保存成功')
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        },
        //重置
        resetForm(){
            this.form.socialSecurityType = '2'
        },
        resetForm2() {
            this.form2 = {
                subsidyName: '通用方案',//方案
                subsidyRemark: '',//备注
                transportationSubsidyScheme: '2',//交通
                transportationSubsidyAmount: '',
                communicationSubsidyScheme : '2',//通讯
                communicationSubsidyAmount: '',
                lunchAllowanceScheme: '2',//午餐
                lunchAllowanceAmount: '',
                housingSubsidyScheme: '2',//住房
                housingSubsidyAmount: '',
                taxCalculationType: '',//计税方式
            }
        }
    }
}
</script>

<style scoped>
.topTitle{
    padding: 20px 40px;
}

</style>