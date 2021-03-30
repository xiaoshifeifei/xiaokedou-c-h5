<template>
  <div class="treatyprivacy-box">
      <div class="text-box" v-html="textdata">

      </div>
  </div>
</template>
<script>
import api from '@/api/user';
export default {
  name: 'yinsixieyi',
  data() {
    return {
        textdata:''
    };
  },
  components:{
  },
  created(){
    api.getXieyiData()
    .then(res=>{
       this.textdata=res.data.content
    })
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
  .treatyprivacy-box {
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: #F8F8F8;
    .text-box{
        padding:40px 35px;
    }
  }
</style>
