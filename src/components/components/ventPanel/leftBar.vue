<template>
  <el-menu class="booktravel-ventleftbar">
    <el-menu-item index="1" @click="redirect('VentWall')">
      <i class="el-icon-menu"></i>
      <span slot="title">反馈墙</span>
    </el-menu-item>
    <el-menu-item index="2" @click="redirect('SubmitVent')">
      <i class="el-icon-menu"></i>
      <span slot="title">我要反馈</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "ventLeftBar",
  data() {
    return {};
  },
  methods: {
    redirect(pathname) {
      this.$router.push({ name: pathname });
    }
  }
};
</script>

<style scoped>
.el-menu {
  min-height: 800px;
}

.booktravel-ventleftbar .el-menu-item {
  color: rgb(8, 8, 8);
  font-size: 1rem;
}
</style>
