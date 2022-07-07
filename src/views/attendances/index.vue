<template>
  <div>
    <el-card class="btn">
      <div>
        <!-- 顶部 -->
       <el-tag style="margin-right: 55%;margin-bottom: 15px"><i class="el-icon-info"></i> 有 0 条考勤审批尚未处理</el-tag>
       <el-row type="flex" justify="end" style="display:inline-block">
         <el-button type="primary" size="small" >导入</el-button>
         <el-button type="primary" size="small" >提醒</el-button>
         <el-button type="primary" size="small" >设置</el-button>
         <el-button type="primary" size="small" >历史归档</el-button>
         <el-button type="primary" size="small" >3月份报表</el-button>
       </el-row>
        <el-row type="flex">
          <el-col :span="1"><p>部门：</p></el-col>
          <el-col style="margin-top:10px">
            <el-checkbox-group v-model="checkList" class="dept">
              <el-checkbox v-for="val in getDep" :key="val.id" :value="val.name" :label="val.name"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <p>考勤状态：</p>
              <el-radio v-model="radio" label="1">正常</el-radio>
              <el-radio v-model="radio" label="2">矿工</el-radio>
              <el-radio v-model="radio" label="3">事假</el-radio>
              <el-radio v-model="radio" label="4">调休</el-radio>
              <el-radio v-model="radio" label="5">迟到</el-radio>
              <el-radio v-model="radio" label="6">早退</el-radio>
        </el-row>
      </div>
    </el-card>
    <el-card class="containerMain">
            <el-table :data="tableDate" style="width: 100%;" v-loading="loading">
                <el-table-column type="index" width="60" label="序号"></el-table-column>
                <el-table-column prop="username" label="姓名" sortable width="100">
                </el-table-column>
                <el-table-column prop="workNumber" label="工号" sortable width="80">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门" sortable width="100">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" sortable width="140">
                </el-table-column>
                <el-table-column :prop="`props${index}`" :label="`3/${val}`" v-for="(val,index) in 30" :key="index" sortable width="80" >
                </el-table-column>
            </el-table>
            <el-row class="block">
                <!-- 分页 -->
                <el-pagination
                    @current-change="changePage"
                    :current-page="page.page"
                    :page-size="page.size"
                    layout="total, prev, pager, next"
                    :total="page.total">
                </el-pagination>
            </el-row>
        </el-card>
  </div>
</template>

<script>
import { getdepartmentData, getAttendances } from "@/api/attendances.js";
export default {
  data(){
    return{
      checkList:[],
      getDep:[],
      radio:'',
      tableDate:'',
      page:{
          page:1,//当前页码
          size:10,//一页显示10条
          total:0,
          loading:false
      },
    }
  },
  methods:{
    //部门
    async getdepartmentData(){
        const res = await getdepartmentData()
        this.getDep = res.depts
    },
    //表格
    async getAttendance(){
        this.loading = true
        const res = await getAttendances()
        this.tableDate = res.data.rows
        this.page.total = res.data.total
        console.log(res);
        res.data.rows.forEach(val => {
            val.attendanceRecord.forEach((ins,index)=>{
              if(ins.adtStatu==2){
                ins.adtStatu='旷工'
              }
              val['props'+index]=ins.adtStatu
            })
        });
        this.loading = false
    },
    //分页
    changePage(val) {
        this.page.page = val
        this.getAttendance()
    },
  },
  created(){
      this.getdepartmentData()
      this.getAttendance()
  }
}
</script>

<style lang="scss" scoped>
.dept{
  display: inline-block;
  line-height: 30px;
}
.btn{
  margin:10px;
}
p{
  display: inline-block;
}
.block{
    float: right;
    margin-top: 10px;
}
</style>