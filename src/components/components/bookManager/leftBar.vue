<template>
  <el-menu>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">分类</span>
      </template>
      <el-menu-item-group class="booktravel-bookleftbar-item">
        <el-menu-item index="1-0" @click="emitTag('')">全部</el-menu-item>
        <el-menu-item
          v-for="(it, idx) in tagList"
          v-bind:key="it"
          :index="'1-' + (idx + 1)"
          @click="emitTag(it)"
        >{{it}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">我的借阅</span>
    </el-menu-item>-->
  </el-menu>
</template>
<script>
export default {
  name: "bookLeftBar",
  props: ["tagList"],
  data() {
    return {};
  },
  methods: {
    emitTag(tag) {
      this.$emit("tagFilterChange", tag);
    }
  }
};
</script>

<style scoped>
.booktravel-bookleftbar-item .el-menu-item {
  line-height: 25px;
  height: unset;
  padding: 2px 30px !important;
}

.booktravel-bookleftbar-item .el-menu-item-group__title {
  padding: 0;
}
</style>
