<template>
  <el-container style="min-height: 800px">
    <el-aside width="200px">
      <leftBar />
    </el-aside>
    <router-view class="sub-router-view" />
  </el-container>
</template>

<script>
import leftBar from "@/components/components/bookManager/leftBar";

export default {
  name: "bookManager",
  components: { leftBar },
  data() {
    return {};
  }
};
</script>

<style scoped>
.sub-router-view {
  position: relative;
  width: 100rem;
}

.el-aside {
  padding: 2px 0;
}

.el-aside .el-menu {
  min-height: 800px;
}
</style>
