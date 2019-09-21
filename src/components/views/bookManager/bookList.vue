<template>
  <el-container class="booktravel-booklist">
    <el-row :gutter="4">
      <el-col
        v-for="item in bookList"
        v-bind:key="item.id"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="6"
        :xl="4"
      >
        <bookCard
          :author="item.author"
          :desc="item.desc"
          :img="item.img"
          :press="item.public"
          :process="item.process"
          :bookid="item.id"
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
  methods: {}
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
