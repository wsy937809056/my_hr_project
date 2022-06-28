<template>
    <div>
        <div ref="main" class="container"></div> 
       
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
       mounted(){
            var myChart = echarts.init(this.$refs.main);
            myChart.setOption({
                /* title: {
                   text: '基础雷达图'
                },
                legend: {
                    data: ['欧豪', '肖战']
                }, */
                radar: {
                    // shape: 'circle',
                    indicator: [
                    { name: '能力', max: 100 },
                    { name: '管理', max: 100 },
                    { name: '周边', max: 100 },
                    { name: '贡献', max: 100 },
                    { name: '态度', max: 100 }
                    ]
                },
                series: [
                    {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                        value: [80, 80, 90, 100, 95],
                        name: '欧豪'
                        },
                        {
                        value: [50, 60, 90, 20, 30],
                        name: '肖战'
                        }
                    ]
                    }
                ]
                });
       }
}
</script>

<style scoped>
   .container{
       width: 500px;
       height: 300px;
   }
</style>