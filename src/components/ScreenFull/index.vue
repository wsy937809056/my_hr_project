<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color: #fff; width: 20px; height: 20px; cursor: poiner;" @click="changeScreen">
    </svg-icon>
  </div>
</template>

<script>
import Screenfull from 'screenfull';
export default {
    methods:{
        //改变全屏
        changeScreen(){
            if (!Screenfull.isEnabled) {
                this.$message.warning('此时全屏组件不可用')
                return
            }
            Screenfull.toggle()
        }
    }
}
</script>

<style>

</style>