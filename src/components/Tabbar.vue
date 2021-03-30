<template>
  <div class="tabbar">
    <van-tabbar @change="onChange" v-model="active" active-color="#146EEB" inactive-color="#333">
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.workbench_active : icon.workbench" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/workbench">
        <span>工作台</span>
        <template #icon="props">
          <img :src="props.active ? icon.workbench_active : icon.workbench" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/schedule">
        <span>待办事项</span>
        <template #icon="props">
          <img :src="props.active ? icon.statistics_active : icon.statistics" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      // icon: {
      //   workbench: require('@/assets/images/tabbar/workbench.png'),
      //   // eslint-disable-next-line camelcase
      //   workbench_active: require('@/assets/images/tabbar/workbench_active.png'),
      //   statistics: require('@/assets/images/tabbar/statistics.png'),
      //   // eslint-disable-next-line camelcase
      //   statistics_active: require('@/assets/images/tabbar/statistics_active.png')
      // },
      // active: 0
    }
  },
  mounted() {
    switch (this.$route.fullPath) {
    case '/schedule':
      this.active = 1
      break
    default:
      this.active = 0
      break
    }
  },
  methods: {
    onChange() {
      this.active
    }
  }
}
</script>

<style></style>
