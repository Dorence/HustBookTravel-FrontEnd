<template>
  <el-card class="booktravel-bookcard" shadow="hover" :body-style="{ padding: '2px' }">
    <el-link :underline="false" class="booktravel-booklist-info" @click="routerTo">
      <el-image fit="scale-down" :src="img" />
      <div>
        <strong>作者：</strong>
        {{author}}
      </div>
      <div>
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
      /* console.log("routerTo", this.bookid); */
      if (this.bookid || this.bookid === 0)
        this.$router.push({
          name: "bookDetail",
          query: {
            bookid: this.bookid
          }
        });
    }
  },
  props: ["author", "img", "press", "desc", "process", "bookid"]
};
</script>

<style>
.booktravel-bookcard {
  margin: 16px 4px;
  padding: 2px;
}

.booktravel-booklist-info {
  margin: 0.5rem;
  font-size: 0.72rem;
}

.booktravel-booklist-info .booktravel-booklist-info-wrap {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
