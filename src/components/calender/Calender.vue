<template>
  <div class="home">
    <Calend
      :date="new Date()"
      style="width:400px;height:260px"
    >
      <!-- 可使用动态插槽名设置，v-slot:[slotName] -->
      <template v-slot:2021-5-21>
        <div style="position:absolute;bottom:-20px">今天</div>
      </template>
    </Calend>
  </div>

</template>

<script>
import Calend from '@/components/calender/Calend.vue'
export default {
    name:'C-alender',
    methods: {
        
    },
    components:{
        Calend
    }
       
}
</script>

<style lang="less" scoped>

</style>