<template>
  <el-container>
    <el-aside width="200px">
      <leftBar
        :tagList="tagList"
        :bookInfo="bookInfo"
        @tagFilterChange="handleTagFilter"
        @queryStringChange="handleSearch"
      />
    </el-aside>
    <router-view :bookList="bookListShow" />
  </el-container>
</template>

<script>
import leftBar from "@/components/components/bookManager/leftBar";
import { remoteAddr } from "@/config";

export default {
  name: "bookManager",
  components: { leftBar },
  data() {
    return {
      tagList: [],
      tagBook: [],
      tagFilter: "",
      queryString: "",
      bookList: [],
      bookListShow: [],
      bookInfo: []
    };
  },
  methods: {
    handleTagFilter(t) {
      if (this.$route.path !== "/book") {
        this.$router.push({ name: "bookList" });
      }
      this.tagFilter = t;
      this.filterBook();
    },
    handleSearch(q) {
      if (this.$route.path !== "/book") {
        this.$router.push({ name: "bookList" });
      }
      this.queryString = q;
      this.filterBook();
    },
    /** 通过标签和搜索关键字筛选书籍 */
    filterBook() {
      let arr = [];

      if (this.tagFilter && this.tagBook.hasOwnProperty(this.tagFilter)) {
        const list = this.tagBook[this.tagFilter];
        for (let i of list) arr.push(this.bookList[i]);
      } else {
        arr = this.bookList;
      }

      if (this.queryString && this.queryString.length && arr.length) {
        arr = arr.filter(v => {
          return v.key.toLowerCase().indexOf(this.queryString) >= 0;
        });
      }

      this.bookListShow = arr;
    }
  },
  mounted() {
    /** get info of all books */
    jQuery
      .ajax({
        url: remoteAddr + "library/checkAllBook",
        type: "GET",
        dataType: "json"
      })
      .then(res => {
        // console.log("res", res);
        if (res.data.length) {
          this.bookList = res.data;

          let key = {};
          let bk = [];
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].key = res.data[i].bookName + "\0" + res.data[i].author;

            for (let t of res.data[i].tag) {
              if (key.hasOwnProperty(t)) {
                key[t].push(i);
              } else {
                key[t] = [i];
              }
            }

            bk.push({
              value: res.data[i].bookName,
              author: res.data[i].author,
              key: res.data[i].key
            });
          }
          this.tagBook = key;
          this.tagList = Object.keys(key);
          this.bookInfo = bk;

          this.filterBook();
        } else {
          this.$message.error("获取失败");
        }
      })
      .catch(err => {
        this.$message.error("网络开小差了");
        console.error(err);
      });
  }
};
</script>

<style></style>
