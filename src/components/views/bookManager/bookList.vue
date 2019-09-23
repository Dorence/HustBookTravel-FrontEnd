<template>
  <el-container class="booktravel-booklist">
    <el-row :gutter="4" style="margin: 0;">
      <el-col v-for="it in bookList" v-bind:key="it.id" :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
        <bookCard
          :author="it.author"
          :desc="it.desc"
          :img="it.img"
          :press="it.public"
          :process="it.process"
          :bookid="it.id"
        />
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import bookCard from "@/components/components/bookManager/bookCard";

export default {
  name: "bookList",
  components: { bookCard },
  data() {
    return {
      bookList: [
        {
          id: 0,
          img: "../../../static/book-cover.jpg",
          author: "刘羿",
          public: "人民出版社",
          desc:
            "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
          process: "4/8"
        },
        {
          id: 1,
          img: "../../../static/book-cover.jpg",
          author: "刘羿1",
          public: "人民出版社",
          desc:
            "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
          process: "6/8"
        },
        {
          id: 2,
          img: "../../../static/book-cover.jpg",
          author: "刘羿2",
          public: "人民出版社",
          desc:
            "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
          process: "7/8"
        },
        {
          id: 3,
          img: "../../../static/book-cover.jpg",
          author: "刘羿3",
          public: "人民出版社",
          desc:
            "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
          process: "7/7"
        }
      ]
    };
  },
  mounted() {
    jQuery.ajax({
      url: "http://www.husteic.cn:3000/library/checkAllBook",
      type: "GET",
      dataType: "json",
      success: function(res) {
        console.log("res", res);
        if (res.code === 1) {
          this.tableData = res.data;
        } else {
          this.$message.error("获取失败");
        }
      },
      error: function(err) {
        this.$message.error("网络开小差了");
      }
    });
  }
};
</script>

<style scoped>
.booktravel-booklist {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
