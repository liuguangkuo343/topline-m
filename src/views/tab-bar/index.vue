<template>
  <div class="tabbar-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 子路由出口 -->

    <van-tabbar>
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
</style>
