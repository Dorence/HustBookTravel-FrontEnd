<template>
  <el-header>
    <el-menu mode="horizontal" :default-active="activeIndex">
      <el-menu-item index="1" @click="redirect('homePage')">
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
      <el-menu-item index="5" @click="redirect('VentWall')">意见反馈</el-menu-item>

      <el-menu-item
        v-if="userName && userName.length"
        index="7"
        @click="logout"
        style="float: right"
      >{{userName}}</el-menu-item>
      <el-menu-item v-else index="6" @click="redirect('Auth')" style="float: right">登录/注册</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script>
export default {
  name: "navBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      userName: "",
      title: this.$route.path === "/" ? "图书漂流" : "主页"
    };
  },
  methods: {
    redirect(path) {
      this.$router.push({ name: path });
      this.title = this.$route.path === "/" ? "图书漂流" : "主页";
    },
    logout() {
      this.$cookies.set("BT_username", "", 0).set("BT_userid", "", 0);
      this.userName = "";
    }
  },
  mounted() {
    this.userName = this.$cookies.get("BT_username");
  },
  watch: {
    $route(to, from) {
      this.userName = this.$cookies.get("BT_username");
    }
  }
};
</script>

<style scoped>
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
