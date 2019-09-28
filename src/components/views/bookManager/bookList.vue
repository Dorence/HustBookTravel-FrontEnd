<template>
  <el-container class="booktravel-booklist">
    <el-row :gutter="5" style="margin: 0; width: 100%; min-width: 700px;">
      <el-col
        v-for="it in bookListShow"
        v-bind:key="it._id"
        :xs="12"
        :sm="8"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <bookCard
          :author="it.author"
          :bookName="it.bookName"
          :desc="it.desc"
          :img="it.img"
          :press="it.publish"
          :process="it.process ? '是' : '否'"
          :bookid="it.bookID"
        />
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import bookCard from "@/components/components/bookManager/bookCard";
import { remoteAddr } from "@/config";

export default {
  name: "bookList",
  components: { bookCard },
  props: ["tagFilter"],
  data() {
    return { bookList: [], tagList: [], bookListShow: [] };
  },
  methods: {
    hasEle(arr, ele) {
      for (let i of arr) {
        if (i === ele) {
          return true;
        }
      }
      return false;
    },
    filterBook(filter) {
      if (filter && filter.length) {
        let arr = [];
        for (let i = 0; i < this.bookList.length; i++) {
          if (this.hasEle(this.bookList[i].tag, filter)) {
            arr.push(this.bookList[i]);
          }
        }
        this.bookListShow = arr;
      } else {
        this.bookListShow = this.bookList;
      }
    }
  },
  mounted() {
    jQuery.ajax({
      url: remoteAddr + "library/checkAllBook",
      type: "GET",
      dataType: "json",
      success: res => {
        console.log("res", res);
        if (res.data.length) {
          this.bookList = res.data;
          let key = {};
          for (let i of res.data) for (let t of i.tag) key[t] = true;
          this.tagList = Object.keys(key);
          this.$emit("tagListChange", this.tagList);
          this.filterBook(this.tagFilter || "");
        } else {
          this.$message.error("获取失败");
        }
      },
      error: err => {
        this.$message.error("网络开小差了");
      }
    });
  },
  watch: {
    tagFilter(f) {
      this.filterBook(f);
    }
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
