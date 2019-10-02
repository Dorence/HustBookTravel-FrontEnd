<template>
  <el-container class="booktravel-booklist">
    <el-row :gutter="5" style="margin: 0; width: 100%; min-width: 700px;">
      <el-col v-for="it in bookList" v-bind:key="it._id" :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
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

export default {
  name: "bookList",
  components: { bookCard },
  props: ["bookList"],
  data() {
    return {};
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
