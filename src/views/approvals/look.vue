<template>
    <div class="approvals-container">
    <h1>申请请假</h1>
    <div class="main-left">
        <div class="top">
            <img src="@/assets/common/img.jpeg" alt="">
            <div class="wz">
                <p>{{leftList.username}}</p>
                <p>部门：{{leftList.departmentName}}</p>
                <p>入职时间：{{times(this.leftList.procApplyTime)}}</p>
            </div>
            <el-divider content-position="right" ></el-divider>
        </div>
        <div class="bottom">
            <ul>
                <li>申请类型： | <span>{{this.procDatas.processName}}</span></li>
                <li>请假类型： | <span>{{this.procDatas.holidayType}}</span></li>
                <li>申请单位： | <span>{{this.procDatas.applyUnit}}</span></li>
                <li>开始时间： | <span>{{times(this.procDatas.startTime)}}</span></li>
                <li>结束时间： | <span>{{times(this.procDatas.endTime)}}</span></li>
                <li>请假时长： | <span>{{this.procDatas.duration}}</span></li>
                <li>申请事由： | <span>{{this.procDatas.reason}}</span></li>
            </ul>
        </div>
    </div>
    <div class="main-right">
        <h4>审批记录</h4>
        <el-divider content-position="right" ></el-divider>
        <ul>
            <li>{{times(rightList[0].handleTime)}}</li>
            <li>{{times(rightList[1].handleTime)}}</li>
            <li>{{times(rightList[2].handleTime)}}</li>
        </ul>
        <div style="height: 200px;" class="steps">
            <el-steps direction="vertical" :active="2">
                <el-step :title="rightList[0].handleUserName + rightList[0].handleOpinion"></el-step>
                <el-step :title="rightList[1].handleUserName + rightList[1].handleOpinion"></el-step>
                <el-step :title="rightList[2].handleUserName + rightList[2].handleOpinion"></el-step>
            </el-steps>
        </div>
    </div>
  </div>
</template>

<script>
import { getApprovalById, getTasksById, } from '@/api/approvals.js'
import moments from 'moment'

export default {
    data(){
        return{
            leftList:[],
            rightList:[],
            procDatas:{},
            id: this.$route.params.id,//接参，获取id
        }
    },
    methods: {
        async getApprovalByIds() {
            this.leftList = await getApprovalById(this.id)
            this.procDatas = JSON.parse(this.leftList.procData)
            console.log(this.leftList);
            console.log('Approval',this.procDatas);
        }, 
        async getTasksByIds() {
            const res = await getTasksById(this.id)
            this.rightList = res
            console.log('Tasks' , res);
        },
        times(res){
            return moments(res).format('YYYY-MM-DD')
        },
    },
    created() {
        this.getApprovalByIds()
        this.getTasksByIds()
    },
}
</script>

<style scoped lang="scss">
.approvals-container{
    padding: 20px;
    .main-left{
        width: 70%;
        display: inline-block;
        .top{
            img{
                width: 100px;
                height: 100px;
            }
            .wz{
                display: inline-block;
            }
        }
        .bottom{
            ul li{
                list-style: none;
                font-size: 18px;
                color: #999;
                margin: 20px 0;
            }
        }
    }
    .el-divider{
        width: 100%;
    }
    .main-right{
        width: 25%;
        float: right;
        margin-right: 50px;
        ul{
            float: left;
            li{
                list-style: none;
                margin-bottom: 70px;
            }
        }
        .steps{
            float: right;
        }
    }
}

</style>