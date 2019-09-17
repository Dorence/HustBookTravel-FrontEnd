<template>
  <el-menu mode="horizontal" :default-active="activeIndex">
    <el-menu-item index="1" @click="redirect('HomePage')">
      <img src="../../assets/hust-minilogo.png" />
      {{ title }}
    </el-menu-item>
    <el-menu-item index="2" @click="redirect('bookList')">书单</el-menu-item>
    <el-menu-item index="3" @click="redirect('AllComments')">评论区</el-menu-item>
    <el-submenu index="4">
      <template slot="title">EIC论坛</template>
      <a href="http://47.106.111.48:4567">
        <el-menu-item index="4-1">访问论坛</el-menu-item>
      </a>
      <a
        href="https://raw.githubusercontent.com/568xiaoma/EIC_App_image/master/EIC%E8%AE%BA%E5%9D%9B%20.apk"
      >
        <el-menu-item index="4-2">下载APP</el-menu-item>
      </a>
    </el-submenu>
    <el-menu-item index="5" @click="redirect('IndexRL')">登录/注册</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "TopBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      title: this.$route.path === "/" ? "图书漂流" : "主页"
    };
  },
  methods: {
    redirect(path) {
      this.$router.push({ name: path });
      this.title = this.$route.path === "/" ? "图书漂流" : "主页";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0px;
  height: 1rem;
}
a {
  text-decoration: none;
  color: rgb(156, 156, 156);
}

.my-title {
  white-space: nowrap;
}

.my-logo-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(53, 53, 53);
  margin-right: 8rem;
}
.my-header-img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}

.my-notice {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.my-home-alert-img {
  width: 100%;
}

.el-menu[role="menubar"] > .el-menu-item:first-child {
  font-size: 20px;
  color: #303133;
  line-height: 36px;
  padding: 12px 18px;
}

.el-menu[role="menubar"] > .el-menu-item:first-child:hover {
  color: #909399 !important;
}

.el-menu[role="menubar"] > .el-menu-item:first-child img {
  height: 36px;
}
</style>
