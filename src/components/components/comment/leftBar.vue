<template>
  <el-menu default-active="1">
    <el-menu-item @click="redirect('AllComments')">
      <i class="el-icon-menu"></i>
      <span slot="title" class="name">全部帖子</span>
    </el-menu-item>
    <el-menu-item @click="redirect('MyComments')">
      <i class="el-icon-menu"></i>
      <span slot="title" class="name">我的帖子</span>
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
