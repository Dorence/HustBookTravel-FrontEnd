<template>
  <el-container>
    <el-aside width="150px">
      <leftBar :tagList="tagList" @tagFilterChange="handleTagFilter" />
    </el-aside>
    <router-view :tagFilter="tagFilter" @tagListChange="handleTagList" />
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
      if (this.$route.path !== "/book") {
        this.$router.push({ name: "bookList" });
      }
      this.tagFilter = t;
    }
  }
};
</script>

<style></style>
