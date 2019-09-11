<template>
  <div>
    <TopBar />
    <router-view class="main-router-view" />
    <BottomBar />
    <FastMenu />
  </div>
</template>

<script>
import BottomBar from "@/components/components/BottomBar";
import TopBar from "@/components/components/TopBar";
import FastMenu from "@/components/components/FastMenu";

export default {
  name: "App",
  components: {
    TopBar: TopBar,
    BottomBar: BottomBar,
    FastMenu: FastMenu
  },
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

.main-router-view {
  position: relative;
  width: 100vw;
}
</style>
