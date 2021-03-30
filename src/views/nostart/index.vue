<template>
  <div class="wrap" style="position: relative;">
    <div class="img">
      <img src="../../assets/img/nostart.png" alt="" />
      <p>店铺活动还未开始哦！</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/user';
import validate from '../../utils/validate';
export default {
  data() {
    return {};
  },

  mounted() {},
  methods: {},
};
</script>
<style scoped>
body,
div,
button,
span,
p,
a {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.img {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.img img {
  width: 411px;
  height: 325px;
}
.img p {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  /* line-height: 90px; */
  color: #333333;
  opacity: 1;
  width: 750px;
  text-align: center;
}
</style>
