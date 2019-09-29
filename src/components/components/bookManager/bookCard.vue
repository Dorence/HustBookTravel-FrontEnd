<template>
  <el-card class="booktravel-bookcard" shadow="hover" :body-style="{ padding: '2px' }">
    <el-link :underline="false" class="booktravel-booklist-info" @click="routerTo">
      <el-image :src="img" fit="scale-down" lazy />
      <div>
        <strong style="font-size: 120%;">{{bookName}}</strong>
        <br />
        <strong>作者：</strong>
        {{author}}
        <br />
        <strong>出版社：</strong>
        {{press}}
      </div>
      <div class="booktravel-booklist-info-wrap">
        <strong>描述：</strong>
        {{desc}}
      </div>
      <div>
        <strong>已借阅：</strong>
        {{process}}
      </div>
    </el-link>
  </el-card>
</template>
<script>
export default {
  name: "bookCard",
  data() {
    return {};
  },
  methods: {
    routerTo() {
      if (this.bookid && this.bookid.length)
        this.$router.push({
          name: "bookDetail",
          query: { bookid: this.bookid }
        });
    }
  },
  props: ["author", "bookName", "img", "press", "desc", "process", "bookid"]
};
</script>

<style>
.booktravel-bookcard {
  margin: 16px 4px;
  padding: 2px;
  min-height: 360px;
}

.booktravel-booklist-info {
  align-items: unset !important;
  margin: 0.5rem;
}

.booktravel-booklist-info .booktravel-booklist-info-wrap {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.booktravel-booklist-info .el-image {
  width: 100%;
  min-height: 160px;
  height: 196px;
}
</style>
