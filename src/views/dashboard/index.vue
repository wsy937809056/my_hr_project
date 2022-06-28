<template>
    <div class="container">
      <!-- 头部内容 -->
        <div class="head">
            <div class="headleft">
                <div class="headImg">
                    <img src="@/assets/common/head.jpg">
                </div>
                <div class="txts">
                    <p class="firstChild">早安，{{userinfo.username}}，祝你开心每一天！</p>
                    <p class="lastChild">{{userinfo.username}} | 传智播客-总裁办</p>
                </div>
            </div>
            <div class="headright">
                <div style="background:#8b98f8;"><p>56</p><span>今日面试</span></div>
                <div style="background:#ffc200;"><p>6/24</p><span>今日在职</span></div>
                <div style="background:#fa8664;"><p>880</p><span>在职人数</span></div>
            </div>
        </div>

        <el-row type="flex" class="row-bg" :gutter="20">
            <el-col :span="14">
              <!-- 日历部分 -->
                <el-card class="box-card">
                    <div slot="header" class="header">
                      <span>工作日历</span>
                    </div>
                <Calendar />
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="header notice">
                      <span>公告</span>
                    </div>
                    <div class="issue-photo">
                        <img :src="userinfo.staffPhoto" class="user-avatar">
                        <div class="txt">
                          <h4><span>朱继柳</span>发布了第二十期“传智大讲堂”互动讨论获奖名单</h4>
                          <span>2018-07-21 15:12:38</span>
                        </div>
                    </div>
                    <div class="issue-photo">
                        <img :src="userinfo.staffPhoto" class="user-avatar">
                        <div class="txt">
                          <h4><span>朱继柳</span>发布了第二十期“传智大讲堂”互动讨论获奖名单</h4>
                          <span>2018-07-21 15:12:38</span>
                        </div>
                    </div>
                    <div class="issue-photo">
                        <img :src="userinfo.staffPhoto" class="user-avatar">
                        <div class="txt">
                          <h4><span>朱继柳</span>发布了第二十期“传智大讲堂”互动讨论获奖名单</h4>
                          <span>2018-07-21 15:12:38</span>
                        </div>
                    </div>
                    <div class="issue-photo">
                        <img :src="userinfo.staffPhoto" class="user-avatar">
                        <div class="txt">
                          <h4><span>朱继柳</span>发布了第二十期“传智大讲堂”互动讨论获奖名单</h4>
                          <span>2018-07-21 15:12:38</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="box-card">
                    <div class="header headTit">
                        <span>快速开始/便捷导航</span>
                    </div>
                    <div class="sideNav">
                        <el-button size="medium"  style="margin:30px 10px 10px 0" class="sideBtn">添加员工</el-button>
                        <el-button size="medium"  style="margin:0 10px 10px 0" class="sideBtn">人事月报</el-button>
                        <el-button size="medium"  style="margin:0 10px 10px 0" class="sideBtn">考勤查询</el-button>
                        <el-button size="medium"  style="margin:0 10px 10px 0" class="sideBtn">考勤统计</el-button>
                        <el-button size="medium"  style="margin:0 10px 10px 0" class="sideBtn">员工审核</el-button>
                        <el-button size="medium"  style="margin:0 10px 10px 0" class="sideBtn">组织架构</el-button>
                        <el-button size="medium" type="primary" plain> + 添加</el-button>
                    </div>
                </el-card>
                <!-- 绩效指数 -->
                <el-card class="box-card">
                    <div slot="header" class="header">
                        <span>绩效指数</span>
                    </div>
                <!-- 放置雷达图 -->
                <Radar />
                <div class="bottom-txt">
                    <ul>
                        <li><div><p>53</p ><span><div style="background-color: #5975C8;margin-right:5px;"></div>个人</span></div></li>
                        <li><div><p>28</p ><span><div style="background-color: #FAC858;margin-right:5px;"></div>部门</span></div></li>
                        <li><div><p>33</p ><span><div style="background-color: #93CF76;margin-right:5px;"></div>公司</span></div></li>
                    </ul>
                </div>
                </el-card>
                <!-- 帮助连接 -->
                <el-card class="box-card">
                  <div class="header headTit">
                    <span>帮助链接</span>
                  </div>
                  <div class="sideLink">
                    <el-row>
                      <el-col :span="8">
                        <a href="#">
                          <span class="icon iconGuide" />
                          <p>入门指南</p>
                        </a>
                      </el-col>
                      <el-col :span="8">
                        <a href="#">
                          <span class="icon iconHelp" />
                          <p>在线帮助手册</p>
                        </a>
                      </el-col>
                      <el-col :span="8">
                        <a href="#">
                          <span class="icon iconTechnology" />
                          <p>联系技术支持</p>
                        </a>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getuserinfo } from '@/utils/session'
import { mapGetters } from 'vuex'
import Radar from '@/components/Radar'
import Calendar from '@/components/Calendar'

export default {
  name: 'Dashboard',
  components:{
         Radar,
         Calendar
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      userinfo:getuserinfo()
    }
  },
}
</script>

<style lang="scss" scoped>
.container{
  padding: 10px 15px;
  background: #eff3f9;
}
//头部
.head{
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  height: 140px;
  .headleft{
    float: left;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
          img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .txts {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
  .headright{
    float: right;
    div{
      display: inline-block;
      color: #fff;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      text-align: center;
      margin-left: 30px;
      p{
        font-size: 22px;
        font-weight: 700;
        margin: 20px 0 10px 0 ;
      }
      span{
        font-size: 15px;
      }
    }
  }
}
//--------
.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}
//公告
.issue-photo{
  display: inline-block;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding: 5px 0;
  img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 10px;
  }
  .txt{
  display: inline-block;
    span{
     font-weight: 200;
     color: rgb(122, 120, 120);
     font-size: 15px;
    }
    h4{
      margin: 3px 0;
      font-size: 15px;
      font-weight: normal;
      span{
        color: #8B98F8;
        margin-right: 5px;
        font-size: 15px;
      }
    }
  }
}
//雷达图
.bottom-txt{
  height: 100px;
  ul{
    width: 430px;
    height: 80px;
    border: 1px solid #eee;
    padding: 0;
    margin-left: 35px;
  }
  ul li{
    list-style: none;
    display: inline-block;
    width: 140px;
    height: 79px;
    div{
      margin-left: 50px;
      p{
        font-size: 20px;
        margin: 20px 5px 5px 0;
        font-weight: 800;
        color: rgb(112, 111, 111);
      }
      span{
        font-size: 13px;
        div{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-left: 0;
          margin-right: 2px;
        }
      }
    }
  }
  ul li:nth-child(2){
    border-left:1px solid #eee ;
    border-right:1px solid #eee ;
  }
}
//帮助
.sideLink {
  text-align: center;
  padding: 30px 0 12px;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url('../../assets/common/icon.png') no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
</style>