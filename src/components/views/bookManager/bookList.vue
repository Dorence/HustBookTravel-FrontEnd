<template>
  <el-container class="booktravel-booklist">
    <el-row :gutter="5" style="margin: 0; width: 100%; min-width: 700px;">
      <el-col v-for="it in bookList" v-bind:key="it._id" :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
        <bookCard
          :author="it.author"
          :bookName="it.bookName"
          :desc="it.desc"
          :img="it.img"
          :press="it.public"
          :process="it.process"
          :bookid="it._id"
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
  data() {
    return { bookList: [] };
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
        } else {
          this.$message.error("获取失败");
        }
      },
      error: err => {
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
