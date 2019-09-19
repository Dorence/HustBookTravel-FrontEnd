<template>
  <el-footer class="booktravel-footer" height="unset">
    <p class="booktravel-footer-info">
      <span>&copy; Copyright 2019, HUST Wuhan, China.</span>
      <span>All Right Reserved. 鄂ICP备19023214号</span>
    </p>
  </el-footer>
</template>
<script>
export default {
  name: "bottomBar",
  data() {
    return {};
  }
};
</script>

<style scoped>
.booktravel-footer {
  color: #525252;
  font-size: 0.75rem;
  padding-top: 1.5rem!important;
  width: 100%;
}

.booktravel-footer .booktravel-footer-info {
 text-align: center;
  padding: 3px 14px;
}
</style>
