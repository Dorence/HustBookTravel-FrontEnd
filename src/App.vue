<template>
  <el-container class="booktravel-main" direction="vertical">
    <navBar style="min-width: 610px;" />
    <el-main>
      <router-view class="main-router-view" />
      <fastMenu />
    </el-main>
    <bottomBar />
  </el-container>
</template>

<script>
import bottomBar from "@/components/components/bottomBar";
import fastMenu from "@/components/components/fastMenu";
import navBar from "@/components/components/navBar";

export default {
  name: "App",
  components: { bottomBar, fastMenu, navBar },
  data() {
    return { direction: "" };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path === "/") {
        this.direction = "el-fade-in";
      } else if (from.path === "/") {
        this.direction = "el-zoom-in-center";
      } else {
        this.direction =
          toDepth < fromDepth ? "el-fade-in" : "el-zoom-in-center";
      }
    }
  }
};
</script>

<style>
#app {
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}

body {
  margin: 0;
  min-height: 100vh;
  overflow-y: scroll;
}

.booktravel-main > .el-header,
.booktravel-main > .el-main,
.booktravel-main > .el-footer {
  padding: 0;
  margin: 0;
  overflow: unset;
}

.main-router-view {
  position: relative;
  width: 100%;
}
</style>
