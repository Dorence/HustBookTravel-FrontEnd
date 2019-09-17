<template>
  <el-menu default-active="1">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">我的借阅</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">全部分类</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-0">全部</el-menu-item>
        <el-menu-item index="2-1">人文类</el-menu-item>
        <el-menu-item index="2-2">艺术类</el-menu-item>
        <el-menu-item index="2-3">自然科学类</el-menu-item>
        <el-menu-item index="2-4">管理类</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "leftBar",
  data() {
    return {};
  }
};
</script>

<style>
</style>
