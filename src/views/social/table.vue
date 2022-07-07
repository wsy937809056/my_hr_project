<template>
    <div class="social">
        <el-card class="containerMain">
            <el-tabs>
                <el-tab-pane label="社会报表">
                    <el-row type="flex" justify="space-between" class="table">
                        <div> 
                            <div class="color"><span class="first"></span>已离职</div>
                            <div class="color"><span class="two"></span>在入职</div>
                            <div class="color"><span class="three"></span>公司合计</div>
                            <div class="color"><span class="four"></span>一级部门</div>
                            <div class="color"><span class="five"></span>二级部门</div>
                        </div> 
                            <el-button type="primary" size='small'>导出</el-button>
                </el-row>
                 
                 <el-table
                   :data="tableData"
                   border
                   style="width: 100%"
                   v-loading="loading">
                   <el-table-column
                     type="index"
                     width="50"
                     label="序号">
                   </el-table-column>
                   <el-table-column
                     prop="username"
                     label="姓名"
                     width="180">
                   </el-table-column>
                   <el-table-column
                     prop="timeOfEntry"
                     label="入职时间"
                     width="180"
                     :formatter="formatterTime">
                   </el-table-column>
                   <el-table-column
                     prop="mobile"
                     label="手机号">
                   </el-table-column>
                   <el-table-column
                     prop="idNumber"
                     label="身份证号码">
                   </el-table-column>
                   <el-table-column
                     prop="theHighestDegreeOfEducation"
                     label="学历">
                   </el-table-column>
                   <el-table-column
                     prop="openingBank"
                     label="开户行">
                   </el-table-column>
                   <el-table-column
                     prop="firstLevelDepartment"
                     label="一级部门">
                   </el-table-column>
                   <el-table-column
                     prop="twoLevelDepartment"
                     label="二级部门">
                   </el-table-column>
                   <el-table-column
                     prop="workingCity"
                     label="工作城市">
                   </el-table-column>
                   <el-table-column
                     prop="socialSecurityComputerNumber"
                     label="社保电脑号">
                   </el-table-column>
                   <el-table-column
                     prop="providentFundAccount"
                     label="公积金账号">
                   </el-table-column>
                 </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import { getMounthList } from '@/api/social'
import moment from 'moment'

export default {
    data(){
        return{
            yearMonth:{
                yearMonth: this.$route.query.yearMonth,
                opType:this.$route.query.opType,
            },
            activeName: 'first',
            tableData:[],
            loading:false,
        }
    },
    created(){
        this.getmounthlist()
    },
    methods: {
      async  getmounthlist(){
              this.loading=true
              const res =  await getMounthList(this.yearMonth.yearMonth,this.yearMonth)
            //   console.log(res);
              this.tableData = res
              this.loading=false 
          },
    chagePage(val){
              this.page.page = val
              this.getmounthlist()
          },
    formatterTime(row, column, cellValue, index){
        // console.log('cellValue',cellValue);
                return moment(cellValue).format('YYYY-MM-DD')
              },
    }
}
</script>

<style scoped lang="scss">
.social{
    background: #e9ebee;
    padding: 5px 20px;
}
.containerMain{
    background: #fff;
    height: 740px;
    padding: 0 20px;
}
.table{
        margin:0 25px 10px 20px;
    }
    .color{
        display: inline-block;
        margin-right: 10px;

    }
    .first{
        width: 20px;
        height: 20px;
        background-color: #94d9f9;
        display: inline-block;
        position: relative;
        top: 5px;
        margin-right: 10px;

    }
    .two{
        display: inline-block;
        width:20px;
        height: 20px;
        background-color: #9ffcb4;
        position: relative;
        top: 5px;
        margin-right: 10px;

    }
    .three{
        width: 20px;
        height: 20px;
        display: inline-block;
        background-color: #fcb9b2;
        position: relative;
        top: 5px;
        margin-right: 10px;

    }
    .four{
        width: 20px;
        height: 20px;
        display: inline-block;
        background-color: #fad8ab;
        position: relative;
        top: 5px;
        margin-right: 10px;

    }
    .five{
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: #faf8a5;
        margin-right: 10px;
        position: relative;
        top: 5px;
    }
</style>