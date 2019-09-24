<template>
  <el-menu default-active="1">
    <el-menu-item index="1" @click="redirect('AllComments')">
      <i class="el-icon-menu"></i>
      <span slot="title">全部帖子</span>
    </el-menu-item>
    <el-menu-item index="2" @click="redirect('MyComments')">
      <i class="el-icon-menu"></i>
      <span slot="title">我的帖子</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "leftBar",
  data() {
    return {};
  },
  methods:{
    redirect(pathname) {
      this.$router.push({ name: pathname });
    }
  }
};
</script>

<style>
</style>
