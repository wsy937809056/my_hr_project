<template>
   <div>

          <!-- select -->
        <el-row type="flex" justify="end">
              <el-select v-model="currentYear" placeholder="请选择" style="width:120px" size="small">
                <el-option :value="currentYear">{{currentYear}}</el-option>
              </el-select>

               <el-select v-model="currentMonth" placeholder="请选择" style="width:120px;margin-left:10px" size="small" @change="changeMonth">
                 <el-option v-for="val in 12" :key="val" :label="val" :value="val">{{val}}</el-option>
              </el-select>
         </el-row>

         <!-- 日历 -->
          <el-calendar v-model="currentDay">
           <template
                slot="dateCell"
                slot-scope="{date, data}">
                   <div class="date-content">
                        <span class="text">{{data.day | getDay }}</span>
                        <span v-if="isweek(date)" class="rest">休</span>
                   </div>
            </template>
           </el-calendar> 

   </div>
</template>

<script>
export default {
    filters: {
        getDay(value){
            
             const day = value.split('-')[2]
             return day.startsWith('0') ?  day.substr(1) : day
        }
    },
     data(){
          return {
              currentYear:new Date().getFullYear(),
              currentMonth:new Date().getMonth()+1,
              currentDay: new Date()
             
          }
     },
     methods:{
            isweek(value){
                    // console.log('11',value);  0-6
                return  value.getDay() ===6 || value.getDay() ===0

            },
            changeMonth(){
                       const year = this.currentYear
                       const month = this.currentMonth
                       this.currentDay =  new Date(`${year}-${month}-1`)  //以当前月的1号作为起始
            }  
     }
}
</script>

<style scoped>
/deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
   /deep/ .el-calendar__header{
     display: none;
   }
</style>