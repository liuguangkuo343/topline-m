<template>
  <div id="app">
      <router-view>
        <!-- 路由出口 -->
      </router-view>
  </div>
</template>

<script>
export default {
  // 最好给每个组件都起一个名字
  name: 'App'
}
</script>

<style scoped lang="less">
        @import url('./styles/variables.less');
        .title {
          color:@color-primary
        }
</style>
