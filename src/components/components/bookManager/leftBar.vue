<template>
  <el-menu :default-openeds="['2']">
    <el-submenu index="1">
      <template slot="title" style="color: #000;">
        <i class="el-icon-menu"></i>
        <span>分类</span>
      </template>
      <el-menu-item-group class="booktravel-bookleftbar-item">
        <el-menu-item @click="emitTag('')">全部</el-menu-item>
        <el-menu-item v-for="it in tagList" v-bind:key="it" @click="emitTag(it)">{{it}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title" style="color: #000;">
        <i class="el-icon-menu"></i>
        <span>搜索</span>
      </template>
      <el-menu-item-group class="booktravel-bookleftbar-item" style="padding: 0 6px;">
        <el-menu-item>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="emitSelect"
            select-when-unmatched
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="author">{{ item.author }}</span>
            </template>
          </el-autocomplete>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    
    <!-- <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">我的借阅</span>
    </el-menu-item>-->
  </el-menu>
</template>
<script>
export default {
  name: "bookLeftBar",
  props: ["tagList", "bookInfo"],
  data() {
    return { state: "" };
  },
  methods: {
    emitTag(tag) {
      this.$emit("tagFilterChange", tag);
    },
    querySearch(queryString, cb) {
      cb(
        queryString
          ? this.bookInfo.filter(this.filter(queryString))
          : this.bookInfo
      );
    },
    filter(str) {
      const s = str.toLowerCase();
      return o => {
        return o.key.toLowerCase().indexOf(s) >= 0;
      };
    },
    emitSelect(item) {
      this.$emit("queryStringChange", item.value.toLowerCase());
    }
  }
};
</script>

<style scoped>
.el-menu {
  min-height: 800px;
}

.booktravel-bookleftbar-item {
  padding: 0 0 0 28px;
}

.booktravel-bookleftbar-item .el-menu-item {
  line-height: 25px;
  height: unset;
  padding: 2px 0 !important;
  min-width: unset;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .author {
  font-size: 12px;
  color: #b4b4b4;
}
</style>
