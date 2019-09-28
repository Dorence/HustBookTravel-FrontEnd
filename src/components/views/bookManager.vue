<template>
  <el-container style="min-height: 800px">
    <el-aside width="200px">
      <leftBar :tagList="tagList" @tagFilterChange="handleTagFilter" />
    </el-aside>
    <router-view class="sub-router-view" :tagFilter="tagFilter" @tagListChange="handleTagList" />
  </el-container>
</template>

<script>
import leftBar from "@/components/components/bookManager/leftBar";

export default {
  name: "bookManager",
  components: { leftBar },
  data() {
    return { tagList: [], tagFilter: "" };
  },
  methods: {
    handleTagList(t) {
      this.tagList = t;
    },
    handleTagFilter(t) {
      if(this.$route.path !== "/book"){
        this.$router.push({name: "bookList"});
      }
      this.tagFilter = t;
    }
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
