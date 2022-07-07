<template>
  <div class="look-container">
    <el-card class="card">
      <div class="look-left">
      <el-col class="box">
        <div class="top">
          <img src="@/assets/common/img.jpeg" alt="">
          <div class="wz">
            <el-button type="danger" size="small" class="btn">离职</el-button>
            <span>入职时间：NAN-NAN-NAN</span>
            <span>最新工资：579</span>
            <p>当前基本工资/当月岗位工资：123/456</p>
          </div>
        </div>
        <div class="middle">
          <h4>津贴</h4>
          <div class="box">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>津贴类型</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><h4>补偿金额</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>津贴类型</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><h4>补偿金额</h4></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><span>交通补助</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><span>100</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><span>通讯补助</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><span>100</span></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><span>午餐补助</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><span>200</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><span>住房补助</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple-light"><span>100</span></div></el-col>
            </el-row>
          </div>
          <h4>社保公积金</h4><span>企业NAN</span><span>个人NAN</span>
          <div class="box">
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>缴费项目</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>基数</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>企业缴纳</h4></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><h4>个人缴纳</h4></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><span>社保</span></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><span>公积金</span></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple"><span>缴费合计</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><span>NAN</span></div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple"><span>NAN</span></div></el-col>
            </el-row>
          </div>
        </div>
        <div class="footer">
          <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="实际出勤天数(正式)">
              <el-input v-model="form.num" class="input"></el-input>
            </el-form-item>
            <el-form-item label="计薪天数(正式)">
              <el-input v-model="form.num" class="input"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </div>
    <div class="look-right">
          <el-col class="box">
            <h4>招聘日程</h4>
            <el-divider></el-divider>
            <el-row justify="center" type="flex">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :color="activity.color"
                  :timestamp="activity.timestamp">
                  {{activity.content}}
              </el-timeline-item>
              </el-timeline>
            </el-row>
          </el-col>
    </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        leixing: '交通补助',
        money: '100',
        buzhu: '通讯补助'
      }, {
        leixing: '午餐补助',
        money: '90',
        buzhu: '住房补助'
      }],
      form:{
        num:'0'
      },
      reverse: true,
        activities: [ {
          content: '',
          timestamp: '',
        },{
          content: 'HR专员',
          timestamp: '2018-04-13'
        }, {
          content: 'HR专员',
          timestamp: '2018-04-11',
          color: '#0bbd87'
        }]
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  margin: 16px;
}
.look-container{
  .look-left{
    float: left;
    width: 70%;
    .box{
      margin: 10px;
      padding: 0;
      width: 100%;
      .top{
        display: flex;
        align-items: center;
        img{
          width: 100px;
          height: 100px;
        }
        .wz{
          display: inline-block;
          .btn{
            display: block;
            margin-bottom: 10px;
          }
          span{
            margin: 5px;
          }
        }
      }
      .middle{
        // background-color: antiquewhite;
        padding: 5px;
        h4{
          display: inline-block;
        }
        span{
          margin: 0 20px;
        }
        .box{
          background-color: #F9F9F9;
          .el-row{
            margin-bottom: 10px;
            text-align: center;
          }
        }
      }
      .footer{
        margin: 5px 0;
        padding: 0;
        .input{
          width: 300px;
        }
      }
    }
  }
  .look-right{
    float: right;
    width: 30%;
    .box{
      margin: 10px;
      padding: 0;
    }
  }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #F9F9F9;
  }
  .bg-purple {
    background: #F9F9F9;
  }
  .bg-purple-light {
    background: #F9F9F9;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>