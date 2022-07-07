<template>
    <div class="social">
        <el-card class="containerTop">
            <el-row type="flex" justify="space-between">
                <!-- 导航栏 -->
                <el-col :span="3">
                    <el-tag size="small"><i class="el-icon-info"></i> 本月：社保在缴 公积金在缴 增员 减员 入职 离职</el-tag>
                </el-col>
                <el-col>
              <el-row type="flex" justify="end">
                    <el-button 
                    type="primary" 
                    @click="$router.push({path:`/social/table/${ReportTime.dataMonth}`,
                    query:{'yearMonth':ReportTime.dataMonth,
                    'opType':ReportTime.isSettings}
                    })">{{ReportTime.dataMonth}}</el-button>
              </el-row>
            </el-col>
            </el-row>
        </el-card>

        <el-card class="getSelect">
            <!-- 多选查询 -->
            <el-row type="flex">
                <el-col :span="2"><h5>部门：</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="partCheck" style="line-height: 60px;" @change="partChange">
                        <el-checkbox v-for="val in parts" :key="val.id" :label="val.id" :value="val.id">{{val.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2"><h5>社保城市：</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="socialCheck" style="line-height: 60px;" @change="partChange">
                        <el-checkbox v-for="vals in city" :key="vals.id" :label="vals.id" :value="vals.id">{{vals.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="2"><h5>公积金城市:</h5></el-col>
                <el-col>
                    <el-checkbox-group v-model="FundCheck" style="line-height: 60px;" @change="partChange">
                        <el-checkbox v-for="vals in city" :key="vals.id" :label="vals.id" :value="vals.id">{{vals.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="containerMain">
            <el-table :data="tableDate" style="width: 100%;" v-loading="loading">
                <el-table-column type="index" width="60" label="序号"></el-table-column>
                <el-table-column prop="username" label="姓名" sortable width="130">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" sortable width="140">
                </el-table-column>
                <el-table-column prop="workNumber" label="工号" sortable width="100">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门" sortable width="120">
                </el-table-column>
                <el-table-column prop="timeOfEntry" :formatter="times" label="入职时间" sortable width="140">
                </el-table-column>
                <el-table-column prop="leaveTime" :formatter="times" label="离职时间" sortable width="140">
                </el-table-column>
                <el-table-column prop="participatingInTheCity" label="社保城市" sortable width="120">
                </el-table-column>
                <el-table-column prop="providentFundCity" label="公积金城市" sortable width="120">
                </el-table-column>
                <el-table-column prop="socialSecurityBase" label="社保基数" sortable width="120">
                </el-table-column>
                <el-table-column prop="providentFundBase" label="公积金基数" sortable width="120">
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
import { getPart, getCity, getSocial, getReportTime } from '@/api/social.js'
import moments from 'moment'

export default {
    data(){
        return{
            parts:[],//部门信息
            city:[],
            partCheck: [], //部门选中
            socialCheck: [],//参保城市选中
            FundCheck: [],//公积金城市选中
            tableDate:[],  //表格数据
            ReportTime:[],
            page:{
                page:1,//当前页码
                pageSize:10,//一页显示10条
                total:0,
                departmentChecks:[],//部门列表
                providentFundChecks:[],//公积金城市列表
                socialSecurityChecks:[],//参保城市列表
                loading:false
            },
        }
    },
    methods:{
        //按钮
        async getreporttime(){
            const res = await getReportTime()
            console.log(res);
            this.ReportTime = res
        },
        //获取部门数据
        async getParts(){
            const res = await getPart()
            this.parts = res.depts
        },
        //获取城市数据
        async getCitys(){
            const res = await getCity()
            // console.log(res);
            this.city = res
        },
        //获取企业用户社保列表
        async getSocials(){
            this.loading = true
            const res = await getSocial(this.page)
            this.tableDate = res.rows
            this.page.total = res.total
            this.loading = false
            // console.log(this.page.departmentChecks);
            // console.log('res',res);
        },
        times(res){
            return moments(res.timeOfEntry).format('YYYY-MM-DD')
        },
        //多选查询
        partChange(){
            this.page.departmentChecks = this.partCheck
            this.page.providentFundChecks = this.FundCheck
            this.page.socialSecurityChecks = this.socialCheck
            this.getSocials()
        },
        //分页
        changePage(val) {
            this.page.page = val
            this.getSocials()
        },
    },
    created(){
        this.getParts()
        this.getCitys()
        this.getSocials()
        this.getreporttime()
    },
}
</script>

<style scoped>
.social{
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
    height: 340px;
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